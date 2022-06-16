<template>
    <div class="container-fluid">
        <writing-toolbar
            :baseData="baseData"
            :answers="answers"
            :past_answers="past_answers"
            :tool_type="tool_type"
            @download_results="download_results"
            ref="writing_toolbar"
        />
        <div class="pad-eq30">
            <div class="row">
                <div class="centertoolsbox mb-4">
                    <media-pitch-form @generated="generatedMessage" :base_data="baseData"/>
                </div>
            </div>
            <div class="row">
                <div class="w-100">
                    <div class="message-container">
                        <b-card v-for="(item, key) in past_answers" :key="'past'+key">
                            <div class="media-item mb-3">
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
                                @remove="removeItem_past(key)"
                                @generate_similar="generate_similar(item)"
                                :loading="item.loading"
                            />
                        </b-card>
                        <b-card v-for="(item, key) in answers" :key="key">
                            <div class="media-item mb-3">
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
                        </b-card>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="fluidbtns mt-3" v-if="answers.length > 0">
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

                    <!-- <b-button pill variant="outline-warning" @click="answers = []"
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
import MediaPitchForm from "../../components/writing/MediaPitch/MediaPitchForm.vue";
import { http } from "../../services/HttpService";
import NoteService from "../../services/NoteService";
import { copyTextToClipboard, downloadDoc, downloadResultsAsCSV } from "../../utils/common";
import WritingToolbar from "../../components/toolbar/WritingToolbar.vue";
import { TOOl_TYPE } from "../../constants/ToolType";

export default {
    name: "MediaPitch",
    data() {
        return {
            answers: [],
            baseData: null,
            selectedMessageIdx: 0,
            loading: false,
            project_id: null,
            selected_folder: "",
            file: null,
            past_answers: [],
            tool_type: TOOl_TYPE.MEDIAPITCH,
        };
    },
    components: {
        MediaPitchForm,
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
            this.past_answers = this.file.contents;
            this.baseData = this.file.base_data;
            this.save_flag = 'update';
        }
    },
    methods: {
        async addToNotes(item) {
            item.adding = true;
            item.added = true;
            try {
                const {
                    data: { note },
                } = await NoteService.addNote({
                    slug: this.baseData.journalistName,
                    baseData: this.baseData,
                    category: "Media Pitch",
                    text: item.text,
                    authors: this.baseData.name,
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
                    data: { messages },
                } = await http().post(
                    "/doc/generate-media-pitch",
                    {
                        ...this.baseData,
                        new_model: item?item.answer:undefined,
                    }
                );
                if (item) item.loading = false;
                this.answers = [
                    ...this.answers,
                    ...messages.map((item) => ({
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

        generatedMessage({ messages, baseData }) {
            this.answers = messages.map((item) => ({
                ...item,
                saved: false,
                copied: false,
                added: false,
                saving: false,
                adding: false,
            }));
            this.baseData = baseData;
        },

        downloadMessage(item) {
            downloadDoc(item, "Generated Pitch");
        },
        async saveMessage(item) {
            item.saving = true;
            try {
                await http().post("/media-pitch", {
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
        removeItem(idx) {
            this.answers.splice(idx, 1);
        },
        removeItem_past(idx) {
            this.past_answers.splice(idx, 1);
        },
        generate_similar(item) {
			item.loading = true;
            this.refreshMessage(item);
        },
        download_results() {
            let results = [...this.past_answers, ...this.answers];
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
.message-container {
    .answer-item {
        width: 100%;
        .copy-icon {
            color: var(--primary);
        }
    }
}
.description {
    color: black;
    font-size: 12px;
    border-bottom: solid 1px black;
    margin-bottom: 32px;
}
.card {
    border: 0;
}
.media-item textarea:hover {
    background: #e6e6e6;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #574b8a;
    // -webkit-box-shadow: 0 0 0 0.2rem #574b8a57;
    // box-shadow: 0 0 0 0.2rem #574b8a57;
}
</style>
