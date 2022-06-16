<template>
  <b-modal
    ref="DeleteMemberModal"
    id="DeleteMemberModal"
    hide-footer
    hide-header
    size="lg"
  >
    <div class="modal-form-content-body">
      <h3 class="mb-4">
      Remove Member 
      <a @click="$bvModal.hide('DeleteMemberModal')" class="closepop">
        <img src="~@/assets/images/icons/close-edit.png">
      </a>
      </h3>
      <div>
        <p>Are you sure you want to delete ?</p>
      </div>
      <div class="d-flex justify-content-between my-4 float-right aligncenttr">
        <b-button
          pill
          variant="primary"
          class="min-w-150px"
          :disabled="deletingMember"
          @click="deleteMember"
        >
          <b-spinner small class="mr-2" v-if="deletingMember" />
          Confirm
        </b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex';
import * as teamService from '../../../services/TeamService';
import { mapGetters } from "vuex";

export default {
  name: 'DeleteMemberModal',
  props: ["memberInfo"],
  data() {
    return {
      deletingMember: false
    };
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    deleteMember() {
      teamService.deleteMember(this.memberInfo.id)
        .then(response => {
          if (response) {
            this.$swal.fire({
              position: 'top-end',
              title: response.data.message,
              showConfirmButton: false,
              customClass: {
                  popup: 'toast-popup',
                  header: 'toast-header',
                  title: 'toast-title'
              },
              timer: 1500
            });
            this.deletingMember = false;
            this.$emit('deleteMember');
            this.$bvModal.hide('DeleteMemberModal');
          }
        })
        .catch(error => {
          if (error.response) {
            this.$swal.fire({
              position: 'top-end',
              title: error.response.data.message,
              showConfirmButton: false,
              customClass: {
                  popup: 'toast-popup',
                  header: 'toast-header',
                  title: 'toast-title'
              },
              timer: 1500
            });
            this.deletingMember = false;
            this.$bvModal.hide('DeleteMemberModal');
          }
        });
    }
  },
  computed: {
    ...mapGetters({
        userInfo: "getCurrentUser",
    }),
  }
};
</script>
<style lang="scss" scoped>
.modal-form-content-body {
  margin-left: auto;
  margin-right: auto;
  // max-width: 600px;
  padding: 20px;
}
a {
  cursor: pointer;
}
</style>
