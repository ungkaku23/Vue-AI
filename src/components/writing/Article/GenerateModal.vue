<template>
  <b-modal
    ref="AddNewDocumentModal"
    id="AddNewDocumentModal"
    hide-footer
    title="New Document"
  >
    <generate-form @generated="generatedArticle" />
  </b-modal>
</template>
<script>
import GenerateForm from './GenerateForm.vue';
export default {
  name: 'GenerateModal',
  components: {
    GenerateForm,
  },
  methods: {
    generatedArticle(data) {
      this.$refs['AddNewDocumentModal'].hide();
      this.$emit('generated', data);
    },
  },
};
</script>
