<template>
  <div class="position-relative">
    <span
      class="material-icons-outlined text-primary clickable ml-1"
      @click="copy"
      v-b-tooltip.hover
      :title="description"
      >content_copy</span
    >
  </div>
</template>
<script>
export default {
  name: 'CopyButton',
  data() {
    return {
      description: 'Copy To Clipboard',
    };
  },
  methods: {
    copy() {
      this.$emit('copy');
      this.description = 'Copied!';
      setTimeout(() => {
        this.description = 'Copy To Clipboard';
      }, 3000);
    },
  },
};
</script>
<style lang="scss" scoped>
.material-icons-outlined {
  color: #4a4a4a !important;
}
</style>
