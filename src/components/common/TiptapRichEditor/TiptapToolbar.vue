<template>
  <div class="tiptap-toolbar">
    <div class="tiptap-tool-group">
      <b-dropdown
        size="sm"
        variant="outline-secondary"
        text="Heading"
        class="ml-2"
      >
        <b-dropdown-item
          :active="isActive({ command: 'paragraph' })"
          @click="clickTool({ command: 'paragraph' })"
        >
          Normal
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item
          @click="clickHeading(item)"
          v-for="(item, index) in headings"
          :key="index"
          :active="isActiveHeading(item)"
        >
          Heading {{ item }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div
      class="tiptap-tool-group"
      v-for="(tools, toolGroupIdx) in toolGroups"
      :key="toolGroupIdx"
    >
      <button
        class="tiptap-tool"
        :disabled="!editing"
        v-for="(tool, toolId) in tools.tools"
        :key="toolId"
        :title="tool.tooltip"
        :class="{ active: isActive(tool) }"
        @click="clickTool(tool)"
      >
        <span class="material-icons"> {{ tool.icon }} </span>
      </button>
    </div>

    <div class="tiptap-tool-group">
      <b-dropdown size="sm" variant="outline-secondary" text="Download">
        <b-dropdown-item @click="downloadPdf">Download PDF</b-dropdown-item>
        <b-dropdown-item @click="downloadDoc">Download DOC</b-dropdown-item>
        <!-- <b-dropdown-item @click="downloadDocx">Download Docx</b-dropdown-item> -->
      </b-dropdown>
    </div>
  </div>
</template>
<script>
import tiptapCommands from './tiptapCommands';
import tiptapTools from './tiptapTools';
export default {
  name: 'TiptapToolbar',
  props: {
    editor: {
      require: true,
      default: null,
    },
    editing: {
      require: true,
      default: true,
    },
  },
  data() {
    return {
      toolGroups: tiptapTools,
      headings: [1, 2, 3, 4, 5, 6],
    };
  },
  methods: {
    downloadDoc() {
      this.$emit('downloadDoc');
    },
    downloadDocx() {
      this.$emit('downloadDocx');
    },
    downloadPdf() {
      this.$emit('downloadPdf');
    },
    clickHeading(level) {
      const focused = this.editor.chain().focus();
      focused.toggleHeading({ level: level }).run();
    },
    clickTool(tool) {
      const focused = this.editor.chain().focus();
      switch (tool.command) {
        case tiptapCommands.PARAGRAPH:
          focused.setParagraph().run();
          return;

        case tiptapCommands.BOLD:
          focused.toggleBold().run();
          return;
        case tiptapCommands.UNDERLINE:
          focused.toggleUnderline().run();
          return;
        case tiptapCommands.ITALIC:
          focused.toggleItalic().run();
          return;
        case tiptapCommands.STRIKE:
          focused.toggleStrike().run();
          return;
        case tiptapCommands.BLOCKQUOTE:
          focused.toggleBlockquote().run();
          return;

        case tiptapCommands.TEXT_ALIGN_LEFT:
        case tiptapCommands.TEXT_ALIGN_RIGHT:
        case tiptapCommands.TEXT_ALIGN_CENTER:
        case tiptapCommands.TEXT_ALIGN_JUSTIFY:
          focused.setTextAlign(tool.command).run();
          return;
        case tiptapCommands.UNDO:
          focused.undo().run();
          return;
        case tiptapCommands.REDO:
          focused.redo().run();
          return;

        case tiptapCommands.BULLET_LIST:
          focused.toggleBulletList().run();
          return;
        case tiptapCommands.ORDERED_LIST:
          focused.toggleOrderedList().run();
          return;

        case tiptapCommands.HORIZONTAL_RULE:
          focused.setHorizontalRule().run();
          return;

        case tiptapCommands.LINK: {
          if (this.editor.isActive(tool.command)) {
            focused.unsetLink().run();
          } else {
            const url = window.prompt('URL');
            focused
              .extendMarkRange('link')
              .setLink({ href: url })
              .run();
          }
          return;
        }
        default:
          return;
      }
    },
    isActive(tool) {
      switch (tool.command) {
        case tiptapCommands.UNDO:
          return this.editor.can().undo();
        case tiptapCommands.REDO:
          return this.editor.can().redo();

        case tiptapCommands.TEXT_ALIGN_LEFT:
        case tiptapCommands.TEXT_ALIGN_RIGHT:
        case tiptapCommands.TEXT_ALIGN_CENTER:
        case tiptapCommands.TEXT_ALIGN_JUSTIFY:
          return this.editor.isActive({
            textAlign: tool.command,
          });

        default:
          return this.editor.isActive(tool.command);
      }
    },
    isActiveHeading(heading) {
      return this.editor.isActive('heading', { level: heading });
    },
  },
};
</script>
