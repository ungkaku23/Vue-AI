<template>
  <b-modal
    ref="EditMemberModal"
    id="EditMemberModal"
    hide-footer
    hide-header
    size="lg"
  >
    <b-form @submit.stop.prevent="editMember">
      <div class="modal-form-content-body">
        <h3 class="mb-4">
        Edit Member
        <a @click="$bvModal.hide('EditMemberModal')" class="closepop">
          <img src="~@/assets/images/icons/close-edit.png">
        </a>
        </h3>
        <b-form-group label="Name" >
          <b-form-input
            type="text"
            readonly
            v-model="form.name"
            placeholder="Name of team member"
            :state="validateState('name')"
          >
          </b-form-input>
          <b-form-invalid-feedback 
            class="mt-2"
            :state="validateState('name')"
          >
            Name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Email" >
          <b-form-input
            type="email"
            readonly
            v-model="form.email"
            placeholder="e.g example@gmail.com"
            :state="validateState('email')"
          >
          </b-form-input>
          <b-form-invalid-feedback
            class="mt-2"
            :state="validateState('email')"
          >
            Email is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Role">
          <b-form-select 
            v-model="form.role" 
            :options="roles"
            :state="validateState('role')"
          >
          </b-form-select>
          <b-form-invalid-feedback 
            class="mt-2"
            :state="validateState('role')"
          >
            Role is required
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="d-flex justify-content-between my-4 float-right aligncenttr">
          <b-button
            pill
            type="submit"
            variant="primary"
            class="min-w-150px"
            :disabled="editingMember"
          >
            <b-spinner small class="mr-2" v-if="editingMember" />
            Continue
          </b-button>
        </div>
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import * as teamService from '../../../services/TeamService';
import { mapGetters } from "vuex";

export default {
  name: 'EditMemberModal',
  mixins: [validationMixin],
  data() {
    return {
      // new team member info
      form: {
        name: "",
        email: "",
        role: "",
        userId: ""
      },
      editingMember: false,
      roles: [
        { value: "owner", text: 'Owner' },
        { value: "user", text: 'User' }
      ]
    };
  },
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      role: {
        required
      }
    }
  },
  mounted() {
  },
  methods: {
    setFormValue(memberInfo) {
      this.form = {
        name: memberInfo.name,
        email: memberInfo.email,
        role: memberInfo.role,
        userId: memberInfo.userId
      };
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    editMember() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("this.form: ", this.form);
      this.editingMember = true;

      const user = {
        name: this.form.name,
        email: this.form.email,
        role: this.form.role,
      };

      teamService.updateMember(this.form.userId, user)
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
            this.editingMember = false;
            this.$emit('updateMembers');
            this.$bvModal.hide('EditMemberModal');
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
            this.editingMember = false;
            this.$bvModal.hide('EditMemberModal');
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
