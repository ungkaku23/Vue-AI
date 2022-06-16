<template>
    <b-form>
        <div class="row pt-4">
            <div class="col-2 text-center pl-0 pr-0">
                <span class="formcount-no">1</span>
            </div>
            <div class="col-10">
                <b-form-group label="Select Tool">
                    <b-form-select
                        class="form-control"
                        v-model="form.documentType"
                        :options="documentTypes"
                        required
                    ></b-form-select>
                </b-form-group>
            </div>
            <div class="col-2 text-center pl-0 pr-0">
                <span class="formcount-no">2</span>
            </div>
            <div class="col-10">
                <b-form-group label="Describe what you want:">
                    <b-form-textarea
                        v-model="form.description"
                        rows="6"
                    ></b-form-textarea>
                    <div class="text-right">
                        <small
                            :class="{
                                'text-danger': form.description.length >= limit,
                            }"
                            >{{ form.description.length }}/{{
                                limit
                            }}
                            characters</small
                        >
                    </div>
                </b-form-group>
            </div>
        </div>
        <div class="text-right flex-column fluiddbtn col-12">
            <b-button
                class="mt-3"
                variant="danger"
                pill
                @click="onSubmit"
                :disabled="loading || !form.documentType || !form.description"
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
    </b-form>
</template>
<script>
import domains from "../../../constants/domains";
import letterTypes from "../../../constants/letterTypes";
import {
  SUMMARY_TYPES,
  SUMMARY_TYPE_LABELS,
  SUMMARY_TYPE_PLACEHOLDERS,
} from '../../../constants/summaryTypes';
import { http } from '../../../services/HttpService';
import { mapActions, mapGetters } from "vuex";

export default {
    name: "GenerateOutlineForm",
    data() {
        return {
            form: {
                date: "",
                documentType: SUMMARY_TYPES.SIMPLIFY,
                description: "",
            },
            isNew: true,
            domains: domains,
            loading: false,
            documentTypes: Object.keys(SUMMARY_TYPE_LABELS).map((key) => ({
                text: SUMMARY_TYPE_LABELS[key],
                    value: key,
            })),
            letterTypes: letterTypes,
            limit:600,
        };
    },
    mounted() {
        this.loadCurrentArticleInfo();
    },
    methods: {
        async onSubmit() {
            this.loading = true;
            this.form['source_lang'] = this.$store.state.input_language;
            this.form['target_lang'] = this.$store.state.output_language;
            try {
                const {
                    data: { article: text}
                } = await http().post('/doc/generate-article-outline', this.form);
                this.$emit('generated', { text, baseData: { 
                    ...this.form,
                    title: 'untitled'
                } });
            } catch (err) {}
            this.loading = false;
        },
        onReset() {
            // Reset our form values
            this.form.date = "";
            this.form.documentType = SUMMARY_TYPES.SIMPLIFY;
            this.form.title = null;
            this.form.authors = "";
            this.form.domain = "";
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
                ? ""
                : this.currentArticle.baseData.title;
            this.form.authors = this.currentArticle.baseData.authors;
            this.form.domain = this.currentArticle.baseData.domain;
            this.form.keywords = this.currentArticle.baseData.keywords;
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
