<template>
  <div
    class="d-flex flex-column align-items-center"
    @click="save"
    :class="{ 'text-primary clickable': active, 'text-muted': !active }"
  >
    <div class="muted text-xs mb-1">Save Draft</div>
    <span class="material-icons-outlined">save</span>
  </div>
</template>
<script>
export default {
  name: "SaveDraftButton",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    save() {
      if (this.active) {
        this.$emit("save");
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