<template>
  <div class="draft-tools">
    <b-button-group>
      <b-button
        v-if="!hideView"
        size="xxs"
        variant="outline-dark"
        @click="viewItem"
        v-b-tooltip.hover
        title="View Item"
        ><span class="material-icons-outlined"> visibility </span></b-button
      >
      <b-button
        size="xxs"
        variant="outline-dark"
        @click="copyToClipboard"
        v-b-tooltip.hover
        :title="copyText"
      >
        <span class="material-icons"> content_copy </span></b-button
      >
    </b-button-group>

    <b-button
      size="xxs"
      class="ml-2"
      variant="outline-dark"
      @click="deleteItem"
      v-b-tooltip.hover
      title="Delete Item"
    >
      <span class="material-icons-outlined"> delete </span></b-button
    >
  </div>
</template>
<script>
export default {
  name: "DraftTools",
  props: {
    hideView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      copyText: "Copy To Clipboard",
    };
  },
  methods: {
    viewItem() {
      this.$emit("viewItem");
    },
    copyToClipboard() {
      this.$emit("copyToClipboard");
      this.copyText = "Copied!";
      setTimeout(() => {
        this.copyText = "Copy To Clipboard";
      }, 2000);
    },
    deleteItem() {
      this.$bvModal
        .msgBoxConfirm("Do you want to delete this item?", {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          cancelVariant: "primary",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$emit("deleteItem");
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
