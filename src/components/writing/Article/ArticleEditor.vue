<template>
  <div>
    <div class="editor-area">
      <b-tabs content-class="bg-white" v-model="selectedTab">
        <template #tabs-end>
          <b-nav-item
            role="presentation"
            @click.prevent="addNewArticle"
            href="#"
            ><b>+</b></b-nav-item
          >
        </template>
        <b-tab
          v-for="(item, idx) in articles"
          :key="idx"
          :active="idx === articles.length - 1"
        >
          <template #title>
            <div class="draft-header">
              {{ item.baseData.title }}
              <span
                class="material-icons-outlined close-btn"
                @click="removeArticleFromList(idx)"
              >
                close
              </span>
            </div>
          </template>
          <div ref="articleContainer">
            <tiptap-rich-editor
              v-model="item.text"
              :docId="item._id"
              :title="item.baseData.title"
              :cites="item.cites"
              :baseData="item.baseData"
              :ownerId="item.ownerId"
            />
          </div>
        </b-tab>
      </b-tabs>
    </div>

    <add-collaborator-modal />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import articleApiUrl from '../../../constants/articleApiUrl';
import { http } from '../../../services/HttpService';
import TiptapRichEditor from '../../common/TiptapRichEditor/TiptapRichEditor.vue';
import AddCollaboratorModal from './AddCollaboratorModal.vue';

export default {
  name: 'ArticleEditor',
  data() {
    return {
      editings: [],
      loadings: [],
      selectedText: '',
      position: {
        left: 0,
        top: 0,
      },
      show: false,
      timer: null,
      selectedTab: 0,
    };
  },
  components: {
    TiptapRichEditor,
    AddCollaboratorModal,
  },
  methods: {
    ...mapActions({
      addArticle: 'articleStore/addArticle',
      updateArticle: 'articleStore/updateArticle',
      removeArticle: 'articleStore/removeArticle',
      changeCurrentArticleIdx: 'articleStore/changeCurrentArticleIdx',
      addNewEmptyArticle: 'articleStore/addNewEmptyArticle',
    }),
    addGeneratedArticle(article) {
      this.addArticle({
        text: article.text,
        baseData: article.baseData,
        _id: this.articles.length.toString(),
        cites: [],
        ownerId: null,
      });
    },
    addNewArticle() {
      this.addNewEmptyArticle();
    },
    removeArticleFromList(idx) {
      this.$bvModal
        .msgBoxConfirm(
          'Do you want to delete this item?',
          {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            cancelVariant: 'primary',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.removeArticle(idx);
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          // An error occurred
        });
    },
    isLoading(idx) {
      return this.loadings.includes(idx);
    },
    toggleLoading(idx) {
      const id = this.loadings.indexOf(idx);
      if (id >= 0) {
        this.loadings.splice(id, 1);
      } else {
        this.loadings.push(idx);
      }
    },
    changedEventHandler() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.saveArticle();
      }, 1500);
    },
    isEditing(idx) {
      return this.editings.includes(idx);
    },
    toggleEditing(idx) {
      const id = this.editings.indexOf(idx);
      if (id >= 0) {
        this.editings.splice(id, 1);
      } else {
        this.editings.push(idx);
      }
    },
    async refreshArticle(idx) {
      if (this.isLoading(idx)) return;
      this.toggleLoading(idx);
      try {
        const {
          data: { article },
        } = await http().post(articleApiUrl, this.articles[idx].baseData);
        this.updateArticle({ id: idx, article: { article, cites: [] } });
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.toggleLoading(idx);
    },
    saveArticle() {
      this.updateArticle({
        id: this.currentArticleIdx,
        article: this.articles[this.currentArticleIdx],
      });
    },
    saveArticleToDatabase() {
      if (!this.isChanged(this.currentArticleIdx)) return;
      this.updateArticle({
        id: this.currentArticleIdx,
        article: this.articles[this.currentArticleIdx],
        toDatabase: true,
      });
    },
    downloadArticle(idx) {
      const header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:v='urn:schemas-microsoft-com:vml' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>";
      const title = this.articles[idx].baseData.title.trim();
      const body = `
        <head><meta charset='utf-8'><title>${title}</title></head>
        <body>
          <h1>${title}</h1>
          ${this.articles[idx].text}
        </body></html>
      `;
      const sourceHTML = header + body;
      const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword',
      });
      const source =
        'data:application/vnd.ms-word;charset=utf-8,' +
        encodeURIComponent(sourceHTML);
      this.download(source, blob, title);
    },

    download(source, blob, title) {
      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, title + '.doc');
      } else {
        var fileDownload = document.createElement('a');
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = title + '.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
      }
    },

    toggleEditArticle(idx) {
      if (this.isEditing(idx)) {
        this.saveArticle(idx);
      }
      this.toggleEditing(idx);
    },
    addArticleToDocument(article) {
      if (this.articles.length <= 0) return;
      let text = '';
      if (article.url) {
        const citeNo = this.articles[this.currentArticleIdx].cites.length + 1;
        const addedArticle = `<p>${article.text}<sup><a href="${article.url}" target="_blank">[${citeNo}]</a></sup></p>`;
        text = addedArticle;
        this.articles[this.currentArticleIdx].cites.push(article);
      } else {
        text = `<p>${article.text}</p>`;
      }

      this.$root.$emit('addTextToEditor', {
        text: text,
        docId: this.articles[this.currentArticleIdx]._id,
      });
    },
    add_text_to_editor(text) {
      this.$root.$emit('addTextToEditor', {
        text: text,
        docId: this.articles[this.currentArticleIdx]._id,
      });
    },
  },
  
  computed: {
    ...mapGetters({
      articles: 'articleStore/getArticles',
      currentArticleIdx: 'articleStore/getCurrentArticleIdx',
    }),
    selectedArticleId() {
      if (this.articles.length > 0 && this.articles[this.currentArticleIdx]) {
        return this.articles[this.currentArticleIdx]._id;
      }
      return '';
    },
  },
  created() {
    this.$root.$on('addToDocument', this.addArticleToDocument);
    this.$root.$on('add_text_to_editor', this.add_text_to_editor);
  },
  beforeDestroy() {
    this.$root.$off('addToDocument', this.addArticleToDocument);
    this.$root.$off('add_text_to_editor', this.add_text_to_editor);
  },
  watch: {
    selectedTab() {
      this.changeCurrentArticleIdx(this.selectedTab);
    },
  },
};
</script>
<style lang="scss" scoped>
.start-here {
  width: 60px;
  height: 60px;
  background-color: var(--pink);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  }
  span {
    font-size: 30px;
    font-weight: bold;
    color: white;
  }
}
.start-here-text {
  font-size: 16px;
  color: #b0a7a7;
  margin-top: 20px;
}
.draft-header {
  display: flex;
  .editing,
  .refresh,
  .download,
  .close-btn {
    margin-left: 10px;
    font-size: 14px;
    color: var(--gray-light);
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
  .download {
    color: var(--cyan);
  }
  .refresh {
    color: var(--danger);

    width: 12px;
    height: 12px;
    border-width: 1px;
  }
  .editing {
    color: var(--primary);
  }
}
.add-to-notes-menu-container {
  z-index: 1023;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: none;
  &.show {
    display: block;
  }
  .add-to-notes-menu {
    z-index: 1024;
    position: fixed;
    left: 400px;
    top: 400px;
    border-radius: 9px;
    padding: 0;
    background: white;
    transform: translate(-50%, -50%);
  }
}
.editor-area {
  background: white;
  padding: 16px 8px;
  border-radius: 8px;
  position: relative;
  height: 100%;
  min-height: calc(100vh - 152px);
}

.custom-tools {
  // position: absolute;
  // top: 8px;
  // right: 8px;
  // z-index: 1;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
</style>
