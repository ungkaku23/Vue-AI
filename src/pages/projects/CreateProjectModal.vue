<template>
  <b-modal
    ref="CreateProjectModal"
    id="CreateProjectModal"
    hide-footer
    size="lg"
    title="New Project"
  >
    <b-form @submit.stop.prevent="createProject">
      <div class="tab-content-body">
        <h3 class="mb-4">My Project <a @click="$bvModal.hide('CreateProjectModal')" class="closepop"><img src="~@/assets/images/icons/close-edit.png"></a></h3>
        <b-form-group label="Project Name" >
          <b-form-input
            v-model="form.name"
            placeholder="Your campaign, product, client etc."
            :state="validateState('name')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateState('name')">
            Title is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Related Website (optional)" >
          <b-form-input
            v-model="form.website"
            placeholder="www.website.com"
          ></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-between my-4 float-right aligncenttr">
          <b-link v-on:click="skipInputStep">Skip this step?</b-link>
          <b-button
            pill
            type="submit"
            variant="primary"
            class="min-w-150px"
            :disabled="creating"
          >
            <b-spinner small class="mr-2" v-if="creating" />
            Continue
          </b-button>
        </div>
      </div>
    </b-form>
  </b-modal>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { http } from '../../services/HttpService';
export default {
  name: 'CreateProjectModal',
  mixins: [validationMixin],
  data() {
    return {
      currentStep: 0,
      selectedTab: 0,

      // new project settings
      form: {
        projectType: 'personal', // personal | team
        name: '',
        website: ''
      },
      creating: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({
      updateCurrentProject: 'updateCurrentProject',
    }),
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    gotoNextStep(step) {
      if (this.currentStep < step) {
        this.currentStep = step;
      }
      this.selectedTab = step;
    },
    async createProject() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.creating = true;
      try {
        const { data } = await http().post('project', this.form);
        // this.$emit('createdProject', data);
        this.$root.$emit('createdProject', data);
        this.$router.push('/project-overview/' + data.project._id);
        this.$bvModal.hide('CreateProjectModal');
      } catch (err) {
        console.log(err);
      }
      this.creating = false;
    },
    skipInputStep() {
      this.form.name = 'Untitled Project';
      this.form.website = '';
      this.createProject();
    }
  },
};
</script>
<style lang="scss" scoped>
.tab-content-body {
  margin-left: auto;
  margin-right: auto;
  // max-width: 600px;
  padding: 20px;
}
a {
  cursor: pointer;
}
</style>
