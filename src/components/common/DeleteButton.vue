<template>
  <div class="position-relative">
    <span
      class="material-icons-outlined ml-1"
      :class="removing ? 'text-muted' : 'text-primary clickable'"
      @click="remove"
      v-b-tooltip.hover
      :title="removing ? 'Deleting ...' : 'Delete'"
      >delete_outline</span
    >
  </div>
</template>
<script>
export default {
  name: 'DeleteButton',
  props: {
    removing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    remove() {
      if (!this.downloading) {
        this.$emit('remove');
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
