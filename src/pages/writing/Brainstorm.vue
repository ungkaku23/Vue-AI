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
                    <brainstorm-form @generated="generatedAnswer" :base_data="baseData"/>
                </div>
            </div>
            <div class="row">
                <div class="answers-container">
                    <div
                        class="mb-4 newboxed-notes card"
                        v-for="(item, key) in past_answers"
                        :key="'past'+key"
                    >
                        <div class="answer-item">
                            <div class="item-title mb-3">
                                <resizable-editor v-model="item.answer" />
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
                        v-for="(item, key) in answers"
                        :key="key"
                    >
                        <div class="answer-item">
                            <div class="item-title mb-3">
                                <resizable-editor v-model="item.answer" />
                            </div>
                            <generator-tools
                                @add="addToNotes(item)"
                                :adding="item.adding"
                                :copied="item.copied"
                                :added="item.added"
                                @save="saveAnswer(item)"
                                :saving="item.saving"
                                @copy="copyAnswer(item)"
                                @remove="removeItem(key)"
                                @generate_similar="generate_similar(item)"
                                :loading="item.loading" 
                                
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="fluidbtns mt-3" v-if="answers.length > 0">
                    <b-button
                        pill
                        variant="outline-danger"
                        :disabled="loading"
                        @click="generateAnswer()"
                        @generate_similar="generate_similar()"
                    >
                        <b-spinner
                            small
                            class="mr-2"
                            label="Spinning"
                            v-if="loading"
                        ></b-spinner>
                        GIVE ME MORE
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { http } from "../../services/HttpService";
import { copyTextToClipboard, downloadDoc, downloadResultsAsCSV } from "../../utils/common";
import BrainstormForm from "../../components/writing/Brainstorm/BrainstormForm.vue";
import NoteService from "../../services/NoteService";
import ResizableEditor from "../../components/common/ResizableEditor.vue";
import GeneratorTools from "../../components/common/GeneratorTools.vue";
import WritingToolbar from "../../components/toolbar/WritingToolbar.vue";
import { TOOl_TYPE } from "../../constants/ToolType";

export default {
    name: "Brainstorm",
    components: {
        BrainstormForm,
        ResizableEditor,
        GeneratorTools,
        WritingToolbar,
    },
    data() {
        return {
            baseData: null,
            answers: [],
            loading: false,
            project_id: null,
            selected_folder: "",
            file: null,
            past_answers: [],
            tool_type: TOOl_TYPE.BRAINSTORM,
        };
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
            item.added = false;
            try {
                const {
                    data: { note },
                } = await NoteService.addNote({
                    slug: this.baseData.question,
                    baseData: this.baseData,
                    category: "Brainstorm",
                    text: item.answer,
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
        removeItem(idx) {
            this.answers.splice(idx, 1);
        },
        removeItem_past(idx) {
            this.past_answers.splice(idx, 1);
        },
        generate_similar(item) {
            item.loading = true;
            this.generateAnswer(item);
        },
        async generateAnswer(item = undefined) {
            this.loading = true;
            try {
                const {
                    data: { results },
                } = await http().post(
                    "/doc/generate-answer/" + this.baseData.type,
                    {
                        ...this.baseData,
                        new_model: item?item.answer:undefined,
                    }
                );
                if (item) item.loading = false;
                const answers = results
                    .map((answer) => ({
                        answer: answer.text,
                        baseData: this.baseData,
                        saved: false,
                        copied: false,
                        added: false,
                        saving: false,
                        adding: false,
                    }))
                    .filter((item) => item.answer.trim());
                this.answers = [...this.answers, ...answers];
                // eslint-disable-next-line no-empty
            } catch (err) {}
            this.loading = false;
        },
        generatedAnswer({ results, baseData }) {
            this.answers = results.map((answer) => ({
                ...answer,
                baseData,
                saved: false,
                copied: false,
                added: false,
                saving: false,
                adding: false,
            }));
            this.baseData = baseData;
        },
        copyAnswer(item) {
            copyTextToClipboard(item.answer);
            item.copied = true;
        },
        downloadAnswer(item) {
            downloadDoc(item, "Generated Answer");
        },
        async saveAnswer(item) {
            item.saving = true;
            try {
                await http().post("/answer", item);
                item.saved = true;
                // eslint-disable-next-line no-empty
            } catch (err) {}
            item.saving = false;
        },
        download_results() {
            let results = [...this.past_answers, ...this.answers];
            results = results.map(rlt => {
                if(rlt['answer'])
                    return "\""+rlt['answer']+"\"\n";
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
.answers-container {
    // max-height: calc(100vh - 310px);
    overflow: auto;
    padding-right: 17px;
    margin-right: -17px;
    .answer-item {
        width: 100%;
        .copy-icon {
            color: var(--primary);
        }
    }
}
.card {
    border: 0;
}
.answer-item .item-title textarea:hover {
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