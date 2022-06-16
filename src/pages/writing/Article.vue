<template>
    <div class="container-fluid">
        <writing-toolbar 
            :baseData="baseData"
            :answers="articles"
            :past_answers="[]"
            :tool_type="tool_type"
            ref="writing_toolbar"/>
        <div class="article-container artical-wrappre">
            <div class="article-editor">
                <div class="search-container">
                    <b-tabs
                        content-class="compose-tab-body bg-white p-3 hideoutline"
                        fill
                        v-model="selectedTab"
                        class="mwidth_50"
                    >
                        <b-tab title="COMPOSE" :active="selectedTab === 0" class="smalltabs-article-compose">
                            <b-tabs content-class="mt-3">
                                <b-tab title="First Draft" >
                                    <generate-form @generated="generatedArticle" />
                                </b-tab>
                                <!-- <b-tab title="Outline">
                                    <generate-outline-form @generated="generatedArticle"/>
                                </b-tab> -->
                                <b-tab title="Free Style" active >
                                    <generate-free-from @generated="generatedArticle"/>
                                </b-tab>
                            </b-tabs>
                            
                        </b-tab>

                        <b-tab
                            title="RESEARCH HUB"
                            :active="selectedTab === 1"
                            class="smalltabs-article"
                        >
                            <!-- <b-form-group>
                <b-input-group>
                  <b-form-input
                    v-model="searchString"
                    @keyup="searchTimeOut()"
                    placeholder="Search and Cite Verified Sources"
                  />
                  <b-input-group-append>
                    <span class="material-icons-outlined"> search </span>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group> -->
                            <b-tabs content-class="mt-3">
                                <b-tab title="News" active>
                                    <news-tab :query="articleTitle" />
                                </b-tab>
                                <!-- <b-tab title="Academic Research">
                  <academia-tab :query="articleTitle" />
                </b-tab> -->
                                <b-tab title="Research">
                                    <semantic-scholar-info-tab
                                        :query="articleTitle"
                                    />
                                </b-tab>
                                <b-tab title="Facts">
                                    <fact-search-tab :query="articleTitle" />
                                </b-tab>
                                <!-- <b-tab title="Saved Notes">
                  <notes-tab :query="articleTitle" />
                </b-tab> -->
                            </b-tabs>
                        </b-tab>
                    </b-tabs>
                </div>
                <div class="edit-container">
                    <article-editor ref="articleEditor" :articles="articles"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import AcademiaTab from '../../components/writing/Article/AcademiaTab.vue';
// import WebTab from "../../components/writing/Article/WebTab.vue";
import NewsTab from "../../components/writing/Article/NewsTab.vue";
import ArticleEditor from "../../components/writing/Article/ArticleEditor.vue";
// import NotesTab from '../../components/writing/Article/NotesTab.vue';
import FactSearchTab from "../../components/writing/Article/FactSearchTab.vue";
import { localStorageVisitItem } from "../../services/AuthService";
import GenerateForm from "../../components/writing/Article/GenerateForm.vue";
import SemanticScholarInfoTab from "../../components/writing/Article/SemanticScholarInfoTab.vue";
import WritingToolbar from "../../components/toolbar/WritingToolbar.vue";
// import GenerateOutlineForm from "../../components/writing/Article/GenerateOutlineForm.vue";
import GenerateFreeFrom from "../../components/writing/Article/GenerateFreeFrom.vue";
import { mapActions, mapGetters } from 'vuex';
import { TOOl_TYPE } from "../../constants/ToolType";

export default {
    name: "Article",
    data() {
        return {
            articleTitle: "",
            selectedTab: 0,
            searchString: "",
            baseData: 'null',
            timer: null,
            tool_type: TOOl_TYPE.FIRSTDRAFT,
            project_id: null,
            selected_folder: "",
            file: null,
        };
    },
    components: {
        // AcademiaTab,
        // WebTab,
        NewsTab,
        ArticleEditor,
        // NotesTab,
        FactSearchTab,
        GenerateForm,
        SemanticScholarInfoTab,
        WritingToolbar,
        // GenerateOutlineForm,
        GenerateFreeFrom
    },
    methods: {
        ...mapActions({
            setArticles: 'articleStore/setArticles',
            addNewEmptyArticle: 'articleStore/addNewEmptyArticle',
        }),
        searchTimeOut() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.searchData();
            }, 800);
        },
        searchData() {
            this.articleTitle = this.searchString;
        },
        generatedArticle(article) {
            this.$root.$emit('add_text_to_editor', article.text);
        },
    },
    mounted() {
        const isFirstTime = localStorage.getItem(localStorageVisitItem);
        if (!isFirstTime) {
            localStorage.setItem(localStorageVisitItem, "visited");
            this.$swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Heads Up",
                text: "Please verify dates, names, statistics, and events before publishing.",
                showConfirmButton: true,
                timer: 10000,
            });
        }
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
            this.baseData = this.file.base_data;
            this.save_flag = "update";
            this.setArticles(this.file.contents);
        } else this.addNewEmptyArticle();
    },
    computed: {
    ...mapGetters({
      articles: 'articleStore/getArticles',
    }),
  },
};
</script>
<style lang="scss" scoped>
.new-document {
    font-size: 32px;
}
.article-container {
    /* margin: -2.75rem -1.5rem 0; */

    .article-generate {
        display: flex;
        min-height: calc(100vh - 200px);
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .article-editor {
        display: flex;
        @media (max-width: 768px) {
            display: block;
        }
        .edit-container {
            flex-grow: 1;
            max-width: calc(100% - 410px);
            @media (max-width: 768px) {
                margin-bottom: 20px;
                max-width: unset;
            }
        }
        .search-container {
            width: 390px;
            min-width: 390px;
            margin-left: 20px;
            border: 1px solid #e3e5ef;
            border-radius: 6px;
            /* padding: 1rem; */
            @media (max-width: 768px) {
                width: 100%;
                min-width: unset;
                margin-left: 0;
            }
        }
    }
}
</style>
