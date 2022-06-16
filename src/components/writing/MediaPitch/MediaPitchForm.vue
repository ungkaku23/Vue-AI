<template>
  <b-form>
    <div class="row">
      <div class="col-1 text-center pl-0"><span class="formcount-no">1</span></div>
      <div class="col-11">
      <b-form-group label="Choose a Writing Style">
          <vue-typeahead-bootstrap
            v-model="form.publication"
            :data="domains"
            placeholder="Enter a web address (e.g. forbes.com)"
          />
        </b-form-group>
      </div>
        <div class="col-1 text-center pl-0"><span class="formcount-no">2</span></div>
        <div class="col-5">
        <b-form-group label="Media Contact">
          <b-form-input
            v-model="form.journalistName"
            class="form-control"
            placeholder="e.g. Alice Smith"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group label="Your Name">
          <b-form-input
            placeholder="e.g. Anna Lee"
            class="form-control"
            v-model="form.name"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-1 text-center pl-0"></div>
      <div class="col-5">
        <b-form-group label="Your Role">
          <b-form-input
            placeholder="e.g. CEO"
            class="form-control"
            v-model="form.role"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group label="Your Company">
          <b-form-input
            placeholder="Example: Antler Inc."
            class="form-control"
            v-model="form.company"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-1 text-center pl-0"><span class="formcount-no">3</span></div>
      <div class="col-11">
        <b-form-group label="What's your story?">
          <b-form-textarea
            v-model="form.story"
            :placeholder="'Provide an overview of your story. Include as many relevant details as needed'"
            rows="6"
          ></b-form-textarea>
          <div class="text-right">
            <small :class="{ 'text-danger': form.story.length >= limit }"
              >{{ form.story.length }}/{{ limit }} characters</small
            >
          </div>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11">
        <b-button
        class="mt-3 btn-fluids"
        pill
        size="lg"
        variant="danger"
        @click="onSubmit"
        :disabled="
          loading || !form.journalistName || !form.name || !form.publication
        "
      >
        <b-spinner
          small
          class="mr-2"
          label="Spinning"
          v-if="loading"
        ></b-spinner>
        GENERATE</b-button
      >
      <div class="text-small mt-2 text-helper text-center" v-if="loading">
        Making Magic✨
      </div>
      </div>
    </div>
    <div class="d-flex align-items-center flex-column">
      
    </div>
  </b-form>
</template>
<script>
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import domains from '../../../constants/domains';
import {
  outreachTypes,
  OUTREACH_TYPES,
} from '../../../constants/outreachTypes';
import { http } from '../../../services/HttpService';
export default {
  name: 'MediaPitchModal',
  components: {
    VueTypeaheadBootstrap,
  },
  props: ["base_data"],
  data() {
    return {
      form: {
        outreachType: OUTREACH_TYPES.MEDIA_PITCH,
        journalistName: '',
        company: '',
        name: '',
        role: '',
        publication: '',
        story: '',
      },
      OUTREACH_TYPES: OUTREACH_TYPES,
      outreachTypes: outreachTypes,
      domains: domains,
      loading: false,
      limit: 1000,
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      this.form['source_lang'] = this.$store.state.input_language;
      this.form['target_lang'] = this.$store.state.output_language;
      try {
        const {
          data: { messages },
        } = await http().post('/doc/generate-media-pitch', this.form);
        this.$emit('generated', { messages, baseData: { ...this.form } });
        // this.onReset();
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    onReset() {
      // Reset our form values
      this.form.journalistName = '';
      this.form.name = '';
      this.form.role = '';
      this.form.company = '';
      this.form.publication = '';
      this.form.storyHook = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  watch: {
    'form.story'(newValue, oldValue) {
      if (newValue.length > this.limit) {
        this.$nextTick(() => {
          this.form.story = oldValue;
        });
      }
    },
  },
  beforeMount () {
    if(this.base_data) this.form = this.base_data;
  }
};
</script>
<style lang="scss" scoped>
.generate-form {
  max-width: 500px;
  padding: 30px;
}
</style>
