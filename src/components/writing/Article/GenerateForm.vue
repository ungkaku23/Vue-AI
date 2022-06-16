<template>
  <b-form>
    <div class="row pt-4">
      <div class="col-2 text-center pl-0 pr-0"><span class="formcount-no">1</span></div>
      <div class="col-10">
        <b-form-group label="Select Article Type">
          <b-form-select
            class="form-control"
            v-model="form.documentType"
            :options="documentTypes"
            required
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="col-2 text-center pl-0 pr-0"><span class="formcount-no">2</span></div>
      <div class="col-10">
        <b-form-group label="What is your article about?">
          <b-form-input
            v-model="form.title"
            placeholder="Give me an article about..."
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-2 text-center pl-0 pr-0"><span class="formcount-no">3</span></div>
      <div class="col-10">
        <b-form-group label="Add Relevant Keywords">
          <b-form-tags
            placeholder="space, travel, mars, etc."
            input-id="tags-basic"
            v-model="form.keywords"
            remove-on-delete
            tag-pills
            tag-variant="primary"
          ></b-form-tags>
        </b-form-group>
      </div>
      <div class="col-2 text-center pl-0 pr-0"><span class="formcount-no">4</span></div>
      <div class="col-10">
        <b-form-group label="Choose a Writing Style">
          <vue-typeahead-bootstrap
            v-model="form.domain"
            :data="domains"
            placeholder="Web address (e.g. forbes.com)"
          />
        </b-form-group>
      </div>
      <div class="col-2 text-center pl-0 pr-0"></div>
      <div class="col-10">
        <div class="gred-artile-btn">
          <b-button
            v-b-toggle.advanced-option
            class="d-flex align-items-center text-decoration-none mb-0"
            variant="link"
          >
            Advanced Option
            <span class="material-icons-outlined ml-3"> expand_more </span>
          </b-button>
          <b-collapse id="advanced-option" class="mt-3">
              <b-form-group class="pl-0 mb-0" label="Write in the style of...">
                <b-form-input
                  v-model="form.authors"
                  placeholder="e.g. David Ogilvy"
                ></b-form-input>
              </b-form-group>
          </b-collapse>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="fluiddbtn col-10">
      <b-button
        class="mt-3"
        variant="danger"
        pill
        @click="onSubmit"
        :disabled="loading || !form.documentType || !form.title || !form.domain"
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
  </b-form>
</template>
<script>
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import domains from '../../../constants/domains';
import letterTypes from '../../../constants/letterTypes';
import {
  documentTypes,
  DOCUMENT_TYPES,
} from '../../../constants/documentTypes';
import { mapActions, mapGetters } from 'vuex';
import { http } from '../../../services/HttpService';

export default {
  name: 'GenerateForm',
  components: {
    VueTypeaheadBootstrap,
  },
  data() {
    return {
      form: {
        date: '',
        documentType: DOCUMENT_TYPES.BUSINESS,
        title: '',
        authors: '',
        domain: '',
        keywords: [],
      },
      isNew: true,
      domains: domains,
      loading: false,
      documentTypes: [
        { value: '', text: 'Select story type', disabled: true },
        ...documentTypes,
      ],
      letterTypes: letterTypes,
    };
  },
  mounted() {
    this.loadCurrentArticleInfo();
  },
  methods: {
    ...mapActions({
      generateArticle: 'articleStore/generateArticle',
    }),
    async onSubmit() {
      this.loading = true;
      this.form['source_lang'] = this.$store.state.input_language;
      this.form['target_lang'] = this.$store.state.output_language;
      try {
        const {
          data: { article: text}
        } = await http().post('/doc/generate-article-draft', this.form);
        this.$emit('generated', { text, baseData: { ...this.form } });
      } catch (err) {
        console.log(err);
      }
      this.loading = false;

//       let text = `<p>Posted on February 22 by |
// MTV announce Taylor Swift has another hit song.</p><p>The new promo focuses on the singer’s “ROMANESS.”
// After breaking out, Taylor has been trying it out a few different songs.</p><p>Aside from, “Split It Up,” her latest song, the first rap track she’s released since dating Calvin Harris, her music video for “Blank Space” brought in 13.5 million views.</p><p>In support of this release, Taylor released a new remix to “Recovery.” Fans even voted her favorite lyric in the 2012 verse of “No Sleep Till Brooklyn” (it was near the top of the charts).</p><p>The song is well received and on March 1, she’ll kick off a sold-out world tour.
// Taylor’s new single is out on March 3 (today), it’s up!
// Taylor’s new singles air on AOL Music every Wednesday at 6:30 PM EST.</p><p>The Youtube videos will feature an exclusive the “first look” at each record and videos from the tour will air on AOL and MTV Action.</p><p>Fans can check out Taylor’s 2012 summer tour on AOL Music.</p><p>The tour begins August 9th in Gary, IN at the First Niagara Pavilion.</p><p>This marks her eighth tour of North America and 16th overall tour overall.
// The tour includes 20 new dates in Tennessee and will include shows in my native Nashville and Cincinnati.</p><p>In all, 14 dates will debut their new songs; seven are on her “CD Confessions” , all in English.</p><p>Taylor is working on a new record and hope to have a new new single out by the end of June.</p><p>Stay tuned!
// .</p>`;
//       this.$emit('generated', { text, baseData: { ...this.form } });
    },
    onReset() {
      // Reset our form values
      this.form.date = '';
      this.form.documentType = '';
      this.form.title = null;
      this.form.authors = '';
      this.form.domain = '';
      this.isNew = true;
    },
    loadCurrentArticleInfo() {
      if (!this.currentArticle) {
        this.onReset();
        return;
      }
      this.isNew = !!this.currentArticle.isEmpty;
      this.form.documentType = this.currentArticle.baseData.documentType;
      this.form.title = this.currentArticle.isEmpty
        ? ''
        : this.currentArticle.baseData.title;
      this.form.authors = this.currentArticle.baseData.authors;
      this.form.domain = this.currentArticle.baseData.domain;
      this.form.keywords = this.currentArticle.baseData.keywords;
    },
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articleStore/currentArticleInfo',
      currentArticleIdx: 'articleStore/getCurrentArticleIdx',
    }),
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
  watch: {
    currentArticleIdx() {
      this.loadCurrentArticleInfo();
    },
  },
};
</script>
<style lang="scss" scoped>
.generate-form {
  max-width: 500px;
  padding: 30px;
}
.slider-input {
  width: 70px;
  height: 32px;
}
</style>
