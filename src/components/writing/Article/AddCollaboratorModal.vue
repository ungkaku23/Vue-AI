<template>
  <b-modal id="collaborator-modal" hide-footer title="Add Collaborator">
    <b-form>
      <div class="row">
        <div class="col-12">
          <b-form-group label="Collaborator Name" class="required">
            <b-form-input
              v-model="form.fullName"
              placeholder="Enter Collaborator Name"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12">
          <b-form-group label="Collaborator Email" class="required">
            <b-form-input
              type="email"
              v-model="form.email"
              placeholder="Enter Collaborator Email"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <b-alert variant="danger" :show="!!errMsg">
        {{ errMsg }}
      </b-alert>
      <div class="d-flex justify-content-center">
        <b-button
          pill
          class="mt-3"
          size="lg"
          variant="danger"
          @click="inviteCollaborator"
          :disabled="loading || !form.fullName || !form.email"
        >
          <b-spinner
            small
            class="mr-2"
            label="Spinning"
            v-if="loading"
          ></b-spinner>
          SEND INVITATION</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { http } from '../../../services/HttpService';
import { DOCUMENT_TYPES } from '../../../constants/documentTypes';
export default {
  name: 'AddCollaboratorModal',
  components: {},
  data() {
    return {
      form: {
        fullName: '',
        email: '',
      },
      errMsg: '',
      loading: false,
      show: true,
      articleId: '',
    };
  },
  methods: {
    async inviteCollaborator() {
      this.loading = true;
      this.errMsg = '';
      try {
        await http().post('/doc/invite-collaborator', {
          ...this.form,
          articleId: this.articleId,
        });
        this.onReset();
        this.$bvModal.hide('collaborator-modal');
      } catch (err) {
        this.errMsg = new Error(err).message;
      }
      this.loading = false;
    },
    onReset() {
      // Reset our form values
      this.form.fullName = '';
      this.form.email = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    selectArticle(articleId) {
      this.articleId = articleId;
    },
  },
  computed: {
    isLetterOrMemo: function() {
      if (
        this.form.documentType === DOCUMENT_TYPES.LETTER ||
        this.form.documentType === DOCUMENT_TYPES.MEMO
      ) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.$root.$on('selectArticle', this.selectArticle);
  },
  beforeDestroy() {
    this.$root.$off('selectArticle', this.selectArticle);
  },
};
</script>
<style lang="scss" scoped>
.generate-form {
  max-width: 500px;
  padding: 30px;
}
</style>
