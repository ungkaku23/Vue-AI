<template>
  <div class="resizable-editor">
    <editor-content :editor="editor" />
  </div>
</template>
<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import { formattedContentString } from '../../utils/common';
export default {
  name: 'ResizableEditor',
  components: {
    EditorContent,
  },
  props: {
    value: {
      required: true,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(formattedContentString(value), false);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],

      content: formattedContentString(this.value),
      onUpdate: () => {
        // HTML
        const value = this.editor.getHTML();
        this.$emit('input', value);
        this.$emit('changed', value);

        this.isChanged = true;
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style lang="scss" scoped></style>
