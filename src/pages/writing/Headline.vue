<template>
    <div class="container-fluid">
        <writing-toolbar
            :baseData="baseData"
            :answers="headlines"
            :past_answers="past_headlines"
            :tool_type="tool_type"
            @download_results="download_results"
            ref="writing_toolbar"
        />
        <div class="pad-eq30">
            <div class="row">
                <div class="centertoolsbox mb-4">
                    <headline-form @generated="generateHeadline" :base_data="baseData"/>
                </div>
            </div>
            <div class="row">
                <div class="messages-container">
                    <div
                        class="mb-4 newboxed-notes card"
                        v-for="(item, key) in past_headlines"
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
                        v-for="(item, key) in headlines"
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
                                @save="saveHeadline(item)"
                                :saving="item.saving"
                                @copy="copyHeadline(item)"
                                @remove="removeItem(key)"
                                @generate_similar="generate_similar(item)"
                                :loading="item.loading"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="headlines.length > 0">
                <div class="fluidbtns mt-3">
                    <!-- <div></div> -->
                    <b-button
                        pill
                        variant="outline-danger"
                        :disabled="loading"
                        @click="refreshHeadline()"
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
import HeadlineForm from "../../components/writing/HeadlineForm/HeadlineForm.vue";
import { http } from "../../services/HttpService";
import NoteService from "../../services/NoteService";
import { copyTextToClipboard, downloadDoc, downloadResultsAsCSV } from "../../utils/common";
import WritingToolbar from "../../components/toolbar/WritingToolbar.vue";
import { TOOl_TYPE } from "../../constants/ToolType";

export default {
    name: "Headline",
    data() {
        return {
            headlines: [],
            baseData: null,
            selectedHeadlineIdx: 0,
            loading: false,
            project_id: null,
            selected_folder: "",
            file: null,
            past_headlines: [],
            tool_type: TOOl_TYPE.HEADLINES,
        };
    },
    components: {
        HeadlineForm,
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
            this.past_headlines = this.file.contents;
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
                    category: "Headlines",
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
        async refreshHeadline(item = undefined) {
            if (this.loading) return;
            this.loading = true;
            try {
                const {
                    data: { results },
                } = await http().post("/doc/generate-headline",
                    {
                        ...this.baseData,
                        new_model: item?item.answer:undefined,
                    });
                if (item) item.loading = false;
                this.headlines = [
                    ...this.headlines,
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
        generateHeadline({ results, baseData }) {
            this.headlines = results.map((item) => ({
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
            this.headlines.splice(idx, 1);
        },
        removeItem_past(idx) {
            this.past_headlines.splice(idx, 1);
        },
        generate_similar(item) {
            item.loading = true;
            this.refreshHeadline(item);
        },
        downloadHeadline(item) {
            downloadDoc(item, "Generated Headline");
        },
        async saveHeadline(item) {
            item.saving = true;
            try {
                await http().post("/headline", {
                    text: item.text,
                    baseData: this.baseData,
                });
                item.saved = true;
                // eslint-disable-next-line no-empty
            } catch (err) {}
            item.saving = false;
        },
        copyHeadline(item) {
            copyTextToClipboard(item.text);
            item.copied = true;
        },
        download_results() {
            let results = [...this.past_headlines, ...this.headlines];
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
