<template>
  <div>
    <span
      class="material-icons-outlined ml-1"
      :class="downloading ? 'text-muted' : 'text-primary clickable'"
      @click="download"
      v-b-tooltip.hover
      :title="downloading ? 'Downloading ...' : 'Download'"
      >file_download</span
    >
  </div>
</template>
<script>
export default {
  name: "DownloadButton",
  props: {
    downloading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    download() {
      if (!this.downloading) {
        this.$emit("download");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.material-icons-outlined {
    color: #4a4a4a !important;
}
</style>