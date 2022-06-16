<template>
  <b-button-group class="article-tool">
    <b-button
      v-if="!hideNotes"
      size="xs"
      variant="outline-dark"
      @click="addToNotes"
      v-b-tooltip.hover
      :title="notesText"
      ><span class="material-icons-outlined"> note_add </span></b-button
    >
    <b-button
      v-if="!hideDocument"
      variant="outline-dark"
      size="xs"
      v-b-tooltip.hover
      :title="documentText"
      @click="addToDocument"
    >
      <span class="material-icons-outlined"> post_add </span>
    </b-button>
    <b-button
      size="xs"
      v-if="!hideClipboard"
      variant="outline-dark"
      @click="copyToClipboard"
      v-b-tooltip.hover
      :title="copyText"
    >
      <span class="material-icons"> content_copy </span></b-button
    >
    <b-button
      size="xs"
      v-if="!hideEdit"
      variant="outline-dark"
      @click="editContent"
      v-b-tooltip.hover
      title="Edit Content"
    >
      <span class="material-icons-outlined"> edit </span></b-button
    >
    <b-button
      size="xs"
      v-if="!hideSave"
      variant="outline-dark"
      @click="saveContent"
      v-b-tooltip.hover
      title="Save Content"
    >
      <span class="material-icons-outlined"> save </span></b-button
    >
    <b-button
      size="xs"
      v-if="!hideDelete"
      variant="outline-dark"
      @click="deleteContent"
      v-b-tooltip.hover
      title="Delete Content"
    >
      <span class="material-icons-outlined"> delete </span></b-button
    >
  </b-button-group>
</template>
<script>
export default {
  name: 'ArticleActions',
  data() {
    return {
      copyText: 'Copy To Clipboard',
      notesText: 'Save To Notes',
      documentText: 'Add To Document',
    };
  },
  props: {
    hideNotes: {
      type: Boolean,
      default: false,
    },
    hideDocument: {
      type: Boolean,
      default: false,
    },
    hideClipboard: {
      type: Boolean,
      default: false,
    },
    hideEdit: {
      type: Boolean,
      default: true,
    },
    hideSave: {
      type: Boolean,
      default: true,
    },
    hideDelete: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    addToNotes() {
      this.$emit('addToNotes');
      this.notesText = 'Added!';
      setTimeout(() => {
        this.notesText = 'Save To Notes';
      }, 2000);
    },
    addToDocument() {
      this.$emit('addToDocument');
      this.documentText = 'Added!';
      setTimeout(() => {
        this.documentText = 'Add To Document';
      }, 2000);
    },
    copyToClipboard() {
      this.$emit('copyToClipboard');
      this.copyText = 'Copied!';
      setTimeout(() => {
        this.copyText = 'Copy To Clipboard';
      }, 2000);
    },
    editContent() {
      this.$emit('editContent');
    },
    saveContent() {
      this.$emit('saveContent');
    },
    deleteContent() {
      this.$bvModal
        .msgBoxConfirm('Do you want to delete this item?', {
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
        })
        .then((value) => {
          if (value) {
            this.$emit('deleteContent');
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          // An error occurred
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.article-tool {
  background: white;
}
</style>
