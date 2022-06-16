<template>
  <div ref="editor">
    <div class="d-flex p-5 justify-content-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <editor
      :api-key="tinyMCEApiKey"
      :init="{
        max_height: 600,
        menubar: false,
        external_plugins: {
          wave: 'https://cdn2.codox.io/waveTinymce/plugin.min.js',
        },
        wave: {
          docId: docId, // unique document id,
          user: {
            name: currentUser.username,
            email: currentUser.email,
            avatar: currentUser.avatar,
            id: currentUser.userId,
          }, // unique username or email address
          apiKey: codoxApiKey, // this is the demo API Key
        },
        plugins: [
          'advlist autolink autoresize emoticons lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen fullpage',
          'insertdatetime media table paste code help wordcount',
        ],
        setup: function (editor) {
          editor.on('mouseup', mouseUpEvent);
          editor.on('init', function () {
            loading = false;
            tinyEditor = editor;
          });
          editor.ui.registry.addButton('downloadMenu', {
            text: 'Export Doc',
            onAction: function () {
              downloadDoc();
            },
          });
        },
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | downloadMenu | help',
      }"
      v-model="valueCopy"
    />
  </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
import config from "../../constants/config";
import { mapGetters } from "vuex";

export default {
  name: "RichEditor",
  props: {
    value: {
      required: true,
    },
    docId: String,
    title: String,
    cites: Array,
  },
  data() {
    return {
      tinyMCEApiKey: config.tinyMCEApiKey,
      codoxApiKey: config.codoxTinyMCEApiKey,
      loading: true,
      tinyEditor: null,
    };
  },
  computed: {
    valueCopy: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.$emit("changed", value);
      },
    },
    ...mapGetters({
      currentUser: "getCurrentUser",
    }),
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
  },
  components: {
    editor: Editor,
  },
  methods: {
    mouseUpEvent(event) {
      event.cancelBubble = true;
      const text = event.view.getSelection().toString();
      if (text) {
        this.$emit("textSelectedEvent", {
          text,
          position: {
            left:
              event.clientX + this.$refs.editor.getBoundingClientRect().left,
            top:
              event.clientY +
              this.$refs.editor.getBoundingClientRect().top +
              40,
          },
        });
      }
    },
    addTextToEditor({ text, docId }) {
      if (docId === this.docId && this.tinyEditor) {
        this.tinyEditor.execCommand("mceInsertContent", false, text);
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
    downloadPdf() {},
    download(source) {
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = this.title.trim() + ".doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },
  },
  created() {
    this.$root.$on("addTextToEditor", this.addTextToEditor);
  },
  beforeDestroy() {
    this.$root.$off("addTextToEditor", this.addTextToEditor);
  },
};
</script>
