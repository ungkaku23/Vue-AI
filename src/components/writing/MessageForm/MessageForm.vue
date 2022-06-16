<template>
  <b-form>
    <div class="row quote-form">
      <div class="col-1 text-center pl-0">
        <span class="formcount-no">1</span>
      </div>
      <div class="col-11">
        <b-form-group label="Select a Tool"><span class="toolavail">Available tools: 16</span>
          <b-form-select
            v-model="form.type"
            class="form-control"
            :options="messageTypes"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="col-1 text-center pl-0">
        <span class="formcount-no">2</span>
      </div>
      <div class="col-11">
        <b-form-group
          label="Describe what you want:"
        >
          <b-form-textarea
            v-model="form.description"
            :placeholder="placeholders[form.type]"
            rows="6"
          ></b-form-textarea>
          <div class="text-right">
            <small :class="{ 'text-danger': form.description.length >= limit }"
              >{{ form.description.length }}/{{ limit }} characters</small
            >
          </div>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11">
        <div class="d-flex align-items-center flex-column fluuidd-btn">
      <b-button
        class="mt-3"
        pill
        size="lg"
        variant="danger"
        @click="onSubmit"
        :disabled="loading || !form.type || !form.description"
      >
        <b-spinner
          small
          class="mr-2"
          label="Spinning"
          v-if="loading"
        ></b-spinner>
        GENERATE</b-button
      >
      <div class="text-small mt-2 text-helper" v-if="loading">
        Making Magic✨
      </div>
    </div>
      </div>
    </div>
  </b-form>
</template>
<script>
import {
  MESSAGE_TYPES,
  MESSAGE_TYPE_LABELS,
  MESSAGE_TYPE_PLACEHOLDERS,
} from '../../../constants/messageTypes';
import { http } from '../../../services/HttpService';

export default {
  name: 'MessageForm',
  props: ["base_data"],
  data() {
    return {
      form: {
        type: MESSAGE_TYPES.BRAND_STORY,
        description: '',
      },
      MESSAGE_TYPES: MESSAGE_TYPE_LABELS,
      messageTypes: Object.keys(MESSAGE_TYPE_LABELS).map((key) => ({
        text: MESSAGE_TYPE_LABELS[key],
        value: key,
      })),
      placeholders: MESSAGE_TYPE_PLACEHOLDERS,
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
          data: { results },
        } = await http().post('/doc/generate-message', this.form);
        this.$emit('generated', { results, baseData: { ...this.form } });
      } catch (err) {}
      this.loading = false;
    },
    onReset() {
      // Reset our form values
      this.form.companyName = '';
      this.form.type = MESSAGE_TYPES.CONFIDENT;
      this.form.description = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  watch: {
    'form.description'(newValue, oldValue) {
      if (newValue.length > this.limit) {
        this.$nextTick(() => {
          this.form.description = oldValue;
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
// .quote-form {
//   margin-top: 120px;
//   @media (max-width: 768px) {
//     margin-top: 0;
//   }
// }
</style>
