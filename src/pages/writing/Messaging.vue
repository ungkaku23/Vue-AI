<template>
    <div class="container-fluid">
        <writing-toolbar
            :baseData="baseData"
            :answers="messages"
            :past_answers="past_messages"
            :tool_type="tool_type"
            @download_results="download_results"
            ref="writing_toolbar"
        />
        <div class="pad-eq30">
            <div class="row">
                <div class="centertoolsbox mb-4">
                    <message-form
                        @generated="generateMessage"
                        :base_data="baseData"
                    />
                </div>
            </div>
            <div class="row">
                <div class="messages-container">
                    <div
                        class="mb-4 newboxed-notes card"
                        v-for="(item, key) in past_messages"
                        :key="'past' + key"
                    >
                        <div class="answer-item">
                            <div class="item-title mb-3">
                                <resizable-editor v-model="item.text" />
                            </div>
                            <generator-tools
                                @add="addToNotes(item)"
                                :adding="item.adding"
                                :copied="item.copied"
                                :added="item.added"
                                @save="saveAnswer(item)"
                                :saving="item.saving"
                                @copy="copyAnswer(item)"
                                @remove="removeItem_past(key)"
                                @generate_similar="generate_similar(item)"
                                :loading="item.loading"
                            />
                        </div>
                    </div>
                    <div
                        class="mb-4 newboxed-notes card"
                        v-for="(item, key) in messages"
                        :key="key"
                    >
                        <div class="message-item">
                            <div class="item-title mb-3">
                                <resizable-editor v-model="item.text" />
                            </div>
                            <generator-tools
                                @add="addToNotes(item)"
                                :adding="item.adding"
                                :copied="item.copied"
                                :added="item.added"
                                @save="saveMessage(item)"
                                :saving="item.saving"
                                @copy="copyMessage(item)"
                                @remove="removeItem(key)"
                                @generate_similar="generate_similar(item)"
                                :loading="item.loading"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="messages.length > 0">
                <div class="fluidbtns mt-3">
                    <!-- <div></div> -->
                    <b-button
                        pill
                        variant="outline-danger"
                        :disabled="loading"
                        @click="refreshMessage()"
                    >
                        <b-spinner
                            small
                            class="mr-2"
                            label="Spinning"
                            v-if="loading"
                        ></b-spinner>
                    GIVE ME MORE
                    </b-button>

                    <!-- <b-button pill variant="outline-warning" @click="messages = []"
            >Clear</b-button
          > -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GeneratorTools from "../../components/common/GeneratorTools.vue";
import ResizableEditor from "../../components/common/ResizableEditor.vue";
import MessageForm from "../../components/writing/MessageForm/MessageForm.vue";
import { http } from "../../services/HttpService";
import NoteService from "../../services/NoteService";
import { copyTextToClipboard, downloadDoc, downloadResultsAsCSV } from "../../utils/common";
import WritingToolbar from "../../components/toolbar/WritingToolbar.vue";
import { TOOl_TYPE } from "../../constants/ToolType";

export default {
    name: "Quote",
    data() {
        return {
            messages: [],
            baseData: null,
            selectedMessageIdx: 0,
            loading: false,
            project_id: null,
            selected_folder: "",
            file: null,
            past_messages: [],
            tool_type: TOOl_TYPE.MESSAGING,
        };
    },
    components: {
        MessageForm,
        ResizableEditor,
        GeneratorTools,
        WritingToolbar,
    },
    beforeMount() {
        if (this.$route.params) {
            this.project_id = this.$route.params.project_id
                ? this.$route.params.project_id
                : null;
            this.selected_folder = this.$route.params.selected_folder
                ? this.$route.params.selected_folder
                : "";
            this.file = this.$route.params.file
                ? this.$route.params.file
                : null;
        }
        if (this.file) {
            this.project_id = this.file.project_id;
            this.past_messages = this.file.contents;
            this.baseData = this.file.base_data;
            this.save_flag = "update";
        }
    },
    methods: {
        async addToNotes(item) {
            item.adding = true;
            item.added = false;
            try {
                const {
                    data: { note },
                } = await NoteService.addNote({
                    slug: this.baseData.description,
                    baseData: this.baseData,
                    category: "Messaging",
                    text: item.text,
                    authors: "",
                    url: "",
                    year: "",
                    publishedAt: new Date().toLocaleDateString(),
                });
                this.$root.$emit("generatedNote", note);
                item.added = true;
            } catch {}
            item.adding = false;
        },
        async refreshMessage(item = undefined) {
            if (this.loading) return;
            this.loading = true;
            try {
                const {
                    data: { results },
                } = await http().post("/doc/generate-message",
                    {
						...this.baseData,
						new_model: item?item.answer:undefined,
                    }
                );
                if (item) item.loading = false;
                this.messages = [
                    ...this.messages,
                    ...results.map((item) => ({
                        ...item,
                        saved: false,
                        copied: false,
                        added: false,
                        saving: false,
                        adding: false,
                    })),
                ];
                // eslint-disable-next-line no-empty
            } catch (err) {}
            this.loading = false;
        },
        generateMessage({ results, baseData }) {
            this.messages = results.map((item) => ({
                ...item,
                saved: false,
                copied: false,
                added: false,
                saving: false,
                adding: false,
            }));
            this.baseData = baseData;
        },
        removeItem(idx) {
            this.messages.splice(idx, 1);
        },
        removeItem_past(idx) {
            this.past_messages.splice(idx, 1);
        },
        generate_similar(item) {
			item.loading = true;
            this.refreshMessage(item);
        },
        downloadMessage(item) {
            downloadDoc(item, "Generated Message");
        },
        async saveMessage(item) {
            item.saving = true;
            try {
                await http().post("/message", {
                    text: item.text,
                    baseData: this.baseData,
                });
                item.saved = true;
                // eslint-disable-next-line no-empty
            } catch (err) {}
            item.saving = false;
        },
        copyMessage(item) {
            copyTextToClipboard(item.text);
            item.copied = true;
        },
        download_results() {
            let results = [...this.past_messages, ...this.messages];
            results = results.map(rlt => {
                if(rlt['text'])
                    return "\""+rlt['text']+"\"\n";
                return '';
            });
            let title = this.tool_type + '_' + this.$refs.writing_toolbar.file_name;
            downloadResultsAsCSV(results, title);
        },
    },
};
</script>
<style lang="scss" scoped>
.description {
    color: black;
    font-size: 12px;
    border-bottom: solid 1px black;
    margin-bottom: 32px;
}
.messages-container {
    .message-item {
        width: 100%;
        .copy-icon {
            color: var(--primary);
        }
    }
}
.card {
    border: 0;
}
.message-item .item-title textarea:hover {
    background: #e6e6e6;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #574b8a;
    // -webkit-box-shadow: 0px 0px 7px 0.1px #574b8a0a;
    // box-shadow: 0px 0px 7px 0.1px #574b8a0a;
}
</style>
