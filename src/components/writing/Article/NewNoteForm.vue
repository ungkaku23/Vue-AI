<template>
  <b-modal
    ref="AddNewNoteModal"
    id="AddNewNoteModal"
    hide-footer
    title="New Note"
  >
    <b-form>
      <div class="row">
        <div class="col-12 mb-4">
          <b-form-input
            v-model="form.slug"
            placeholder="Add Title"
          ></b-form-input>
        </div>
        <div class="col-12">
          <b-form-input
            v-model="form.text"
            placeholder="Add Note"
          ></b-form-input>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <b-button
          pill
          class="mt-3"
          size="lg"
          variant="danger"
          @click="onSubmit"
          :disabled="!form.slug || !form.text || loading"
        >
          <b-spinner small v-if="loading" />
          Add Note</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  name: 'NewNoteForm',
  data() {
    return {
      loading: false,
      form: {
        slug: '',
        text: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$root.$emit('addToNotes', this.form);
      this.onReset();
      this.$refs['AddNewNoteModal'].hide();
    },
    onReset() {
      // Reset our form values
      this.form.slug = '';
      this.form.text = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.generate-form {
  max-width: 500px;
  padding: 30px;
}
</style>
