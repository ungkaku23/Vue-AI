<template>
    <b-modal
        id="LanguageSettingModal"
        ref="LanguageSettingModal"
        hide-footer
        hide-header
        title="Language Settings"
        size="lg"
    >
        <b-form @submit.stop.prevent="set_language">
            <div class="tab-content-body">
                <h3 class="mb-5">Language Settings</h3>
                <b-form-group label="Input language (Description)">
                    <b-form-select v-model="input_language" :options="language_options"></b-form-select>
                </b-form-group>
                <b-form-group label="Output language (Results)">
                    <b-form-select v-model="output_language" :options="language_options"></b-form-select>
                </b-form-group>
                <div class="d-flex justify-content-between my-2 float-right">
                    <b-button
                        pill
                        type="submit"
                        variant="primary"
                        class="min-w-150px"
                    >
                        Save
                    </b-button>
                </div>
            </div>
        </b-form>
    </b-modal>
</template>
<script>

import { http } from '../../../services/HttpService';
import { LANGUAGE_LIST, LANGUAGE_LABEL_LIST } from '../../../constants/Language';
import { mapActions } from 'vuex';

export default {
    name: "LanguageSettingModal",
    props: {
        project: Object,
    },
    data() {
        return {
            input_language: this.$store.state.input_language? this.$store.state.input_language:  LANGUAGE_LIST.EN_US,
            output_language: this.$store.state.output_language? this.$store.state.output_language:  LANGUAGE_LIST.EN_US,
            language_options: Object.values(LANGUAGE_LIST).map(type => { 
                return {value:type, text:LANGUAGE_LABEL_LIST[type]};
            }),
        };
    },
    methods: {
        set_language() {
            localStorage.setItem('input_language', this.input_language);
            localStorage.setItem('output_language', this.output_language);
            this.$store.commit('updateLanguage');
            this.$bvModal.hide('LanguageSettingModal');
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
.tab-content-body {
  margin-left: auto;
  margin-right: auto;
  // max-width: 600px;
  padding: 20px;
}
</style>