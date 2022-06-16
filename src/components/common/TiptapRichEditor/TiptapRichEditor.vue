<template>
  <div class="tiptap-editor-wrapper">
    <bubble-menu :editor="editor" v-if="editor">
      <div class="article-tool">
        <b-button-group>
          <button type="button" class="btn" @click="addTextToNotes">
            <img src="~@/assets/images/smart-menu/save-to-notes.png" />
            <span>Save To Notes</span>
          </button>
          <button type="button" class="btn" @click="copyToClipboard">
            <img src="~@/assets/images/smart-menu/copy.png" />
            <span>Copy</span>
          </button>
          <button type="button" class="btn"  @click="show = !show" id="smart_menu_more">
            <img src="~@/assets/images/smart-menu/more.png"/>
          </button>
        </b-button-group>
      </div>
    </bubble-menu>
    <tiptap-toolbar
      :editor="editor"
      :editing="editing"
      v-if="editor"
      @downloadDoc="downloadDoc"
      @downloadPdf="downloadPdf"
      @downloadDocx="downloadDocx"
    />
    <div class="tiptap-editor">
      <editor-content :editor="editor" />
      <div class="editor-placeholder" v-if="value === '<p></p>'">
        Start typing or use Compose Tab.
      </div>
      <div class="cites" v-if="cites.length > 0">
        <div>------------------------------------</div>
        <div class="cite-item" v-for="(cite, id) in cites" :key="id">
          <div>
            <sup class="font-weight-bold mr-2">{{ id + 1 }}</sup>
            <span v-if="cite.authors">{{ cite.authors }}.</span>
            <span v-if="cite.year">({{ cite.year }}).</span>
            <i v-if="cite.slug">"{{ cite.slug }}"</i>.
            <a :href="cite.url" class="d-inline" v-if="cite.url">{{
              cite.url
            }}</a>
            {{ cite.publishedAt }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-between mt-3">
      <div>
        <collaborators :collaborators="users" />
      </div>
      <div>
        <!-- <b-button
          size="sm"
          class="mr-2"
          variant="success"
          pill
          @click="expandArticle"
          :disabled="!isSelected || expanding"
        >
          <b-spinner small v-if="expanding"></b-spinner>
          {{ expanding ? 'Expanding' : 'Expand' }}
        </b-button> -->

        <b-button
          size="sm"
          variant="secondary"
          class="icon-bttn"
          @click="saveArticle()"
          v-b-tooltip.hover
          title="Save"
          :disabled="!isChanged"
        >
          <img src="~@/assets/images/icons/floppydisk.png" />
        </b-button>

        <b-button
          size="sm"
          variant="secondary"
          class="mr-2 icon-bttn"
          @click="refreshArticle()"
          :disabled="
            loading ||
            !baseData.documentType ||
            !baseData.title ||
            !baseData.domain
          "
          v-b-tooltip.hover
          title="New Draft"
        >
          <img src="~@/assets/images/icons/arrowsclockwise.png" />
          <b-spinner class="refresh" v-if="loading"></b-spinner>
        </b-button>

        <!-- <b-button
          size="sm"
          variant="secondary"
          class="btn-icon mr-1"
          :disabled="!isOwnArticle"
          v-b-tooltip.hover
          title="Add Collaborator"
          @click="addNewCollaborator()"
        >
          <span class="material-icons-outlined refresh">
            person_add
          </span>
        </b-button> -->
      </div>
    </div>
    <b-popover :show.sync="show" ref="popover" target="smart_menu_more" placement="top">
      <b-button-group style="display:flex; flex-direction: column">
        <button type="button" class="btn" @click="rewriteArticle" :disabled="rewriting">
          <img src="~@/assets/images/smart-menu/rewrite.png" />
          <span>{{rewriting ? 'Rewriting' : 'Rewrite'}}</span>
        </button>
        <button type="button" class="btn" @click="expandArticle" :disabled="expanding">
          <img src="~@/assets/images/smart-menu/expand.png" />
          <span>{{expanding ? 'Expanding' : 'Expand'}}</span>
        </button>
        <button type="button" class="btn" @click="shortenArticle" :disabled="shortening">
          <img src="~@/assets/images/smart-menu/shorten.png" />
          <span>{{shortening ? 'Shortening' : 'Shorten'}}</span>
        </button>
        <button type="button" class="btn" @click="free_write" :disabled="writing">
          <img src="~@/assets/images/smart-menu/free-writing.png" />
          <span>{{writing ? 'Writing' : 'Free write'}}</span>
        </button>
      </b-button-group>
    </b-popover>
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-2";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
// import BubbleMenu from "@tiptap/extension-bubble-menu";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import Strike from "@tiptap/extension-strike";
import HardBreak from "@tiptap/extension-hard-break";
import FloatingMenu from "@tiptap/extension-floating-menu";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Mention from "@tiptap/extension-mention";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import TaskList from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import FontFamily from "@tiptap/extension-font-family";
import CharacterCount from "@tiptap/extension-character-count";
import Focus from "@tiptap/extension-focus";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Color from "@tiptap/extension-color";
import { mapActions, mapGetters } from "vuex";
import TiptapToolbar from "./TiptapToolbar.vue";
import { copyTextToClipboard } from "../../../utils/common";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import Collaborators from "../../writing/Article/Collaborators.vue";
import { http } from "../../../services/HttpService";
import articleApiUrl from "../../../constants/articleApiUrl";
import { TOOl_TYPE } from "../../../constants/ToolType";

export default {
  name: "TiptapRichEditor",
  components: {
    EditorContent,
    TiptapToolbar,
    BubbleMenu,
    Collaborators,
  },
  props: {
    value: {
      required: true,
      default: "",
    },
    docId: String,
    title: String,
    cites: Array,
    ownerId: String,
    baseData: Object,
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
    }),
    isOwnArticle() {
      return this.ownerId === this.currentUser.userId;
    },
    fullContent() {
      let body = `
        <head><meta charset='utf-8'><title>${this.title}</title></head>
        <body>
          <h1>${this.title}</h1>
          ${this.value}
        </body></html>
      `;
      return body;
    },
    isEditable() {
      return this.editor.options.editable;
    },
    selectedText() {
      try {
        const { from, to } = this.editor.view.state.selection;
        const text = this.editor.view.state.doc.textBetween(from, to, " ");
        return text || "";
      } catch (err) {
        return "";
      }
    },
  },
  data() {
    return {
      loading: false,
      saving: false,
      editor: null,
      users: [],
      editing: true,
      status: "connecting",
      socketProvider: null,
      isChanged: false,

      isSelected: false,

      expanding: false,
      rewriting: false,
      shortening: false,
      writing: false,

      show: false,
    };
  },
  methods: {
    ...mapActions({
      updateArticle: "articleStore/updateArticle",
    }),
    selectEvent(e) {
      if (!this.editor) {
        this.isSelected = false;
      } else {
        this.isSelected = !this.editor.view.state.selection.empty;
      }
    },
    async refreshArticle() {
      this.$root.$emit("bv::hide::tooltip");
      if (this.loading) return;
      this.loading = true;
      try {
        const {
          data: { article },
        } = await http().post(articleApiUrl, this.baseData);
        this.editor.commands.setContent(article, false);
        this.isChanged = true;
      } catch (err) {}
      this.loading = false;
    },

    async saveArticle() {
      this.$root.$emit("bv::hide::tooltip");
      if (this.saving) return;
      this.saving = true;
      try {
        await this.updateArticle({
          _id: this.docId,
          article: { article: this.value, cites: this.cites },
          toDatabase: true,
        });
        this.isChanged = false;
      } catch (err) {}
      this.loading = false;
    },
    async expandArticle() {
      try {
        this.expanding = true;
        const {
          data: { text },
        } = await http().post("/doc/rewrite-article", {
          type: "expand",
          text: this.selectedText,
        });
        const generatedText =
          this.selectedText + "<p><strong>" + text + "</strong></p>";
        this.editor.commands.insertContent(generatedText).run();
        this.isChanged = true;
      } catch (err) {}
      this.expanding = false;
    },
    async rewriteArticle() {
      try {
        this.rewriting = true;
        const {
          data: { text },
        } = await http().post("/doc/rewrite-article", {
          type: "rewrite",
          text: this.selectedText,
        });
        const generatedText = text;
        this.editor.commands.insertContent(generatedText).run();
        this.isChanged = true;
      } catch (err) {}
      this.rewriting = false;
    },
    async shortenArticle() {
      try {
        this.shortening = true;
        const {
          data: { text },
        } = await http().post("/doc/rewrite-article", {
          type: "shorten",
          text: this.selectedText,
        });
        const generatedText = text;
        this.editor.commands.insertContent(generatedText).run();
        this.isChanged = true;
      } catch (err) {}
      this.shortening = false;
    },
    async free_write() {
      try {
        this.writing = true;
        const {
          data: { results },
        } = await http().post("/doc/generate-article-free", {
          description: this.selectedText,
          type: "free-writing",
          source_lang: this.$store.state.input_language,
          target_lang: this.$store.state.output_language,
        });
        const generatedText = results.length != 0 ? results[0].text : "";
        this.editor.commands.insertContent(this.selectedText+'\n'+generatedText).run();
        this.isChanged = true;
      } catch (err) {}
      this.writing = false;
    },
    addNewCollaborator() {
      this.$root.$emit("bv::hide::tooltip");
      this.$root.$emit("selectArticle", this.docId);
      this.$bvModal.show("collaborator-modal");
    },

    toggleEditArticle() {
      this.editing = !this.editing;
      this.editor.setEditable(this.editing);
    },

    addTextToEditor({ text, docId }) {
      if (docId === this.docId && this.editor) {
        this.editor.commands.insertContent(text).run();
      }
    },

    downloadDoc() {
      let header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>";
      let sourceHTML = header + this.fullContent;
      let source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(sourceHTML);
      this.download(source);
    },

    downloadDocx() {
      http()
        .post(
          "/doc/download-docx",
          {
            title: this.title,
            content: this.fullContent,
          },
          {
            responseType: "arraybuffer",
            headers: {
              Accept: "application/docx",
            },
          }
        )
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/docx" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = this.title + `.docx`;
          link.click();
        });
    },

    downloadPdf() {
      http()
        .post(
          "/doc/download-pdf",
          {
            title: this.title,
            content: this.fullContent,
          },
          {
            responseType: "arraybuffer",
            headers: {
              Accept: "application/pdf",
            },
          }
        )
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = this.title + `.pdf`;
          link.click();
        });
    },

    download(source) {
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = this.title.trim() + ".doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },

    copyToClipboard() {
      copyTextToClipboard(this.selectedText);
    },

    addTextToNotes() {
      this.$root.$emit("addToNotes", {
        slug: "",
        text: this.selectedText,
        category: TOOl_TYPE.FIRSTDRAFT,
        authors: "",
        url: "",
        year: "",
        baseData: { type: TOOl_TYPE.FIRSTDRAFT },
        publishedAt: new Date().toLocaleDateString(),
      });
      // this.hideMenu();
    },
    toggle_popover() {
      this.$refs.popover.$emit('open');
    }
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },
  created() {
    this.$root.$on("addTextToEditor", this.addTextToEditor);

    document.addEventListener("mouseup", this.selectEvent);
    document.addEventListener("touchend", this.selectEvent);
  },
  mounted() {
    // A new Y document
    const ydoc = new Y.Doc();
    // Registered with a WebSocket provider
    this.socketProvider = new WebsocketProvider(
      process.env.VUE_APP_TIPTAP_SOCKET,
      this.docId,
      ydoc
    );
    this.socketProvider.on("status", (status) => {
      this.status = status.status;
    });
    this.editor = new Editor({
      extensions: [
        Link,
        Paragraph,
        Document,
        Text,
        Bold,
        Dropcursor,
        Image,
        Heading.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        OrderedList,
        // BubbleMenu,
        Code,
        Italic,
        History,
        ListItem,
        BulletList,
        CodeBlock,
        Blockquote,
        Strike,
        HardBreak,
        FloatingMenu,
        HorizontalRule,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        CodeBlockLowlight,
        Placeholder.configure({
          placeholder: "My Custom Placeholder",
          emptyEditorClass: "is-editor-empty",
        }),
        Underline,
        TaskItem,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Mention,
        Highlight,
        Typography,
        TaskList,
        TextStyle,
        Superscript,
        Subscript,
        FontFamily,
        CharacterCount,
        Focus,
        // Register the document with tiptap
        Collaboration.configure({
          document: ydoc,
        }),
        // Register the collaboration cursor extension
        CollaborationCursor.configure({
          provider: this.socketProvider,
          user: {
            name: this.currentUser.username,
            color: "#f783ac",
          },
          onUpdate: (users) => {
            this.users = users || [];
          },
        }),
        Color,
      ],
      editable: this.editable,
      content: this.value,
      onUpdate: () => {
        // HTML
        const value = this.editor.getHTML();
        this.$emit("input", value);
        this.$emit("changed", value);

        this.isChanged = true;
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
    if (this.socketProvider) {
      this.socketProvider.destroy();
    }
    this.$root.$off("addTextToEditor", this.addTextToEditor);
    document.removeEventListener("mouseup", this.selectEvent);
    document.removeEventListener("touchend", this.selectEvent);
  },
};
</script>
<style lang="scss" scoped>
.cites {
  margin: 20px 0;
  .cite-item {
    font-size: 12px;
    margin-bottom: 10px;
  }
}
.article-tool {
  background: white;
}

.rotate-90 {
  transform: rotate(90deg);
}
.material-icons-outlined {
  color: #4a4a4a !important;
}
.popover-body {
  display: flex;
  flex-direction: column;
}
</style>
