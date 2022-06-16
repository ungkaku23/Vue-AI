<template>
    <div class="container-fluid">
        <writing-toolbar
            :baseData="baseData"
            :answers="socialMedias"
            :past_answers="past_socialMedias"
            :tool_type="tool_type"
            @download_results="download_results"
            ref="writing_toolbar"
        />
        <div class="pad-eq30">
            <div class="row">
                <div class="centertoolsbox mb-4">
                    <social-media-form
                        @generated="generateSocialMedias"
                        :base_data="baseData"
                    />
                </div>
            </div>
            <div class="row">
                <div class="socialMedias-container">
                    <div
                        class="mb-4 newboxed-notes card"
                        v-for="(item, key) in past_socialMedias"
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
                        v-for="(item, key) in socialMedias"
                        :key="key"
                    >
                        <div class="socialMedia-item">
                            <div class="item-title mb-3">
                                <resizable-editor v-model="item.text" />
                            </div>
                            <generator-tools
                                @add="addToNotes(item)"
                                :adding="item.adding"
                                :copied="item.copied"
                                :added="item.added"
                                @save="saveSocialMedia(item)"
                                :saving="item.saving"
                                @copy="copySocialMedia(item)"
                                @remove="removeItem(key)"
                                @generate_similar="generate_similar(item)"
                                :loading="item.loading"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="fluidbtns mt-3" v-if="socialMedias.length > 0">
                    <b-button
                        pill
                        variant="outline-danger"
                        :disabled="loading"
                        @click="refreshSocialMedia()"
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
import GeneratorTools from "../../components/common/GeneratorTools.vue";
import ResizableEditor from "../../components/common/ResizableEditor.vue";
import SocialMediaForm from "../../components/writing/SocialMediaForm/SocialMediaForm.vue";
import { http } from "../../services/HttpService";
import NoteService from "../../services/NoteService";
import {
    copyTextToClipboard,
    downloadDoc,
    downloadResultsAsCSV,
} from "../../utils/common";
import WritingToolbar from "../../components/toolbar/WritingToolbar.vue";
import { TOOl_TYPE } from "../../constants/ToolType";

export default {
    name: "SocialMedia",
    data() {
        return {
            socialMedias: [],
            baseData: null,
            selectedSocialMediaIdx: 0,
            loading: false,
            project_id: null,
            selected_folder: "",
            file: null,
            past_socialMedias: [],
            tool_type: TOOl_TYPE.SOCIALMEDIA,
        };
    },
    components: {
        ResizableEditor,
        GeneratorTools,
        SocialMediaForm,
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
            this.past_socialMedias = this.file.contents;
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
                    category: "SocialMedia",
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
        async refreshSocialMedia(item = undefined) {
            if (this.loading) return;
            this.loading = true;
            try {
                const {
                    data: { results },
                } = await http().post(
                    "/doc/generate-social-media",
                    {
						...this.baseData,
						new_model: item?item.answer:undefined,
                    }
                );
                if (item) item.loading = false;
                this.socialMedias = [
                    ...this.socialMedias,
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
        generateSocialMedias({ results, baseData }) {
            this.socialMedias = results.map((item) => ({
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
            this.socialMedias.splice(idx, 1);
        },
        removeItem_past(idx) {
            this.past_socialMedias.splice(idx, 1);
        },
        generate_similar(item) {
			item.loading = true;
            this.refreshSocialMedia(item);
        },
        downloadSocialMedia(item) {
            downloadDoc(item, "Generated Social Media");
        },
        async saveSocialMedia(item) {
            item.saving = true;
            try {
                await http().post("/socialMedia", {
                    text: item.text,
                    baseData: this.baseData,
                });
                item.saved = true;
                // eslint-disable-next-line no-empty
            } catch (err) {}
            item.saving = false;
        },
        copySocialMedia(item) {
            copyTextToClipboard(item.text);
            item.copied = true;
        },
        download_results() {
            let results = [...this.past_socialMedias, ...this.socialMedias];
            results = results.map((rlt) => {
                if (rlt["text"]) return '"' + rlt["text"] + '"\n';
                return "";
            });console.log(results)
            let title =
                this.tool_type + "_" + this.$refs.writing_toolbar.file_name;
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
.socialMedia-container {
    max-height: 600px;
    overflow: auto;
}
.socialMedias-container {
    overflow: auto;
    .socialMedia-item {
        width: 100%;
        .copy-icon {
            color: var(--primary);
        }
    }
}
.card {
    border: 0;
}
.socialMedia-item .item-title textarea:hover {
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
