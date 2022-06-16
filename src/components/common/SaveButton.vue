<template>
  <div class="position-relative">
    <span
      class="material-icons-outlined ml-1"
      :class="saving ? 'text-muted' : 'text-primary clickable'"
      @click="save"
      v-b-tooltip.hover
      :title="saving ? 'Saving ...' : 'Save To Database'"
      >save</span
    >
  </div>
</template>
<script>
export default {
  name: 'SaveButton',
  props: {
    saving: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    save() {
      if (!this.saving) {
        this.$emit('save');
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
