<template>
  <b-form>
    <div class="row answer-form">
      <div class="col-1 text-center pl-0">
        <span class="formcount-no">1</span>
      </div>
      <div class="col-11">
        <b-form-group label="Select a Tool"><span class="toolavail">Available tools: 12</span>
          <b-form-select
            v-model="form.type"
            class="form-control"
            :options="types"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="col-1 text-center pl-0">
        <span class="formcount-no">2</span>
      </div>
      <div class="col-11">
        <b-form-group label="Describe what you want:">
          <b-form-textarea
            v-model="form.question"
            :placeholder="placeholders[form.type]"
            rows="6"
          ></b-form-textarea>
          <div class="text-right">
            <small :class="{ 'text-danger': form.question.length >= limit }"
              >{{ form.question.length }}/{{ limit }} characters</small
            >
          </div>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11">
        <div class="d-flex align-items-center flex-column">
          <b-button
            class="mt-3 promote-generator-btn"
            size="lg"
            pill
            variant="danger"
            @click="generateAnswer()"
            :disabled="loading || !form.question"
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
import { http } from '../../../services/HttpService';
import {
  BRAINSTORM_TYPES,
  BRAINSTORM_TYPE_LABELS,
  BRAINSTORM_TYPE_PLACEHOLDERS,
} from '../../../constants/brainstormTypes';
export default {
  name: 'BrainstormForm',
  props: ["base_data"],
  data() {
    return {
      form: {
        type: BRAINSTORM_TYPES.BIG_IDEAS,
        companyName: '',
        question: '',
      },
      types: Object.keys(BRAINSTORM_TYPE_LABELS).map((key) => ({
        text: BRAINSTORM_TYPE_LABELS[key],
        value: key,
      })),
      placeholders: BRAINSTORM_TYPE_PLACEHOLDERS,
      limit: 1000,
      answers: [],
      loading: false,
    };
  },
  methods: {
    async generateAnswer(loadMore = false) {
      this.loading = true;
      this.form['source_lang'] = this.$store.state.input_language;
      this.form['target_lang'] = this.$store.state.output_language;
      try {
        const {
          data: { results },
        } = await http().post(
          '/doc/generate-answer/' + this.form.type,
          this.form
        );

        const answers = results
          .map((answer) => ({
            answer: answer.text,
            saved: false,
            saving: false,
          }))
          .filter((item) => item.answer.trim());
        this.$emit('generated', {
          results: answers,
          baseData: { ...this.form },
        });
      } catch (err) {}
      this.loading = false;
    },
  },
  watch: {
    'form.question'(newValue, oldValue) {
      if (newValue.length > this.limit) {
        this.$nextTick(() => {
          this.form.question = oldValue;
        });
      }
    },
  },
  beforeMount () {
    if(this.base_data) this.form = this.base_data;
  }
};
</script>
