<template>
  <div>
    <h3 class="mb-3">Project Settings</h3>
    <div class="container project-settings-form">
      <b-alert variant="success" dismissible :show="updated"
        >The project has been updated successfully.</b-alert
      >
      <b-form @submit.stop.prevent="updateProject" v-if="!loading">
        <b-card title="Project Type" class="mb-4">
          <b-card
            :border-variant="form.projectType === 'personal' ? 'primary' : ''"
            class="mb-3 clickable"
            @click="form.projectType = 'personal'"
          >
            <h4>Personal Project</h4>
            <div class="text-muted">
              If you need more info, please check it out
            </div>
          </b-card>
          <b-card
            :border-variant="form.projectType === 'team' ? 'primary' : ''"
            class="mb-3 clickable"
            @click="form.projectType = 'team'"
          >
            <h4>Team Project</h4>
            <div class="text-muted">
              Create corporate account to manage users
            </div>
          </b-card>
        </b-card>

        <b-form-group label="Audience" class="required">
          <b-form-input
            v-model="form.audience"
            placeholder="e.g. Jane"
            :state="validateState('audience')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateState('audience')">
            Audience is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Project Name" class="required">
          <b-form-input
            v-model="form.name"
            placeholder="e.g. Mobile App ..."
            :state="validateState('name')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateState('audience')">
            Project Name is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Project Description" class="required">
          <b-form-input
            v-model="form.description"
            placeholder="e.g. Experience share market ..."
            :state="validateState('description')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateState('audience')">
            Project Description is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Project Keywords (Optional)">
          <b-form-tags
            placeholder="Example: space, travel, mars, etc."
            input-id="tags-basic"
            v-model="form.keywords"
            remove-on-delete
            tag-pills
            tag-variant="primary"
          ></b-form-tags>
        </b-form-group>

        <div class="d-flex justify-content-end my-5">
          <b-button
            pill
            type="submit"
            variant="primary"
            class="min-w-150px"
            :disabled="updating"
          >
            <b-spinner small class="mr-2" v-if="updating" />
            Update
          </b-button>
        </div>
      </b-form>
      <div class="p-5 text-center" v-if="loading">
        <b-spinner />
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { http } from '../../services/HttpService';
export default {
  name: 'ProjectSettings',
  mixins: [validationMixin],
  data() {
    return {
      // new project settings
      form: {
        projectType: 'personal', // personal | team
        audience: '',
        name: '',
        description: '',
        keywords: [],
      },
      loading: false,
      updating: false,
      updated: false,
    };
  },
  validations: {
    form: {
      audience: {
        required,
      },
      name: {
        required,
      },
      description: {
        required,
      },
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const { data } = await http().get('project/' + this.$route.params.id);
        this.form = data.project;
      } catch (err) {}
      this.loading = false;
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async updateProject() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.updated = false;
      this.updating = true;
      try {
        await http().put('project/' + this.$route.params.id, this.form);
        this.updated = true;
      } catch (err) {
        console.log(err);
      }
      this.updating = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.project-settings-form {
  max-width: 600px;
}
</style>
