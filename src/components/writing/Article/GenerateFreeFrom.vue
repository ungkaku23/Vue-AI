<template>
    <b-form>
        <div class="pt-3 smalltabs-article-compose genratetabs">
            <b-tabs content-class="mt-3">
                <b-tab title="Generate" :active="tab_active == 0">
                    <div class="col-12 mb-4" style="position: relative">
                        <a href="" class="addmore-notes"
                            ><img
                                src="~@/assets/images/icons/pencil-edit.png"
                            />
                            {{ form.available_tools[form.type] }}</a
                        >
                        <select class="custom-selectview" v-model="form.type">
                            <option
                                v-for="(tool, id) in Object.keys(
                                    form.available_tools
                                )"
                                :key="id"
                                :value="tool"
                            >
                                {{ form.available_tools[tool] }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12">
                        <b-form-group label="Choose a Tool. Describe what you want:">
                            <b-form-textarea
                                v-model="form.description"
                                rows="6"
                                :placeholder="placeholders[form.type]"
                            ></b-form-textarea>
                            <div class="text-right">
                                <small
                                    :class="{
                                        'text-danger':
                                            form.description.length >= limit,
                                    }"
                                    >{{ form.description.length }}/{{
                                        limit
                                    }}
                                    characters</small
                                >
                            </div>
                        </b-form-group>
                    </div>
                    <div class="col-12">
                        <div class="txtlenght">
                            <p v-if="form.description.length >= 60">
                                Great Length
                            </p>
                            <p v-else-if="form.description.length >= 35">
                                Fair Length
                            </p>
                            <ul>
                                <li v-if="form.description.length > 0"></li>
                                <li v-if="form.description.length >= 35"></li>
                                <li v-if="form.description.length >= 60"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="text-right flex-column fluiddbtn col-12">
                        <b-button
                            class="mt-3"
                            variant="danger"
                            pill
                            @click="onSubmit"
                            :disabled="loading || !form.description"
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
                </b-tab>
                <b-tab title="See Results" :active="tab_active != 0">
                    <div class="lastgen-wrap">
                        <div class="lastgen-data">
                            <h5>
                                New paragraph
                                <img
                                    src="~@/assets/images/icons/copylastgen.png"
                                    style="cursor: pointer"
                                    @click="copy_result"
                                />
                            </h5>
                            <p>
                                {{
                                    generated_results[result_index]
                                        ? generated_results[result_index].text
                                        : ""
                                }}
                            </p>
                        </div>
                        <div class="pagination-lastgen">
                            <img
                                src="~@/assets/images/icons/backlastgen.png"
                                @click="result_index_changed(-1)"
                                style="cursor: pointer"
                            />
                            <ul>
                                <li
                                    v-for="(item, id) in generated_results"
                                    :key="id"
                                    v-bind:class="{
                                        active: id == result_index,
                                    }"
                                ></li>
                            </ul>
                            <img
                                src="~@/assets/images/icons/nextlastgen.png"
                                @click="result_index_changed(1)"
                                style="cursor: pointer"
                            />
                        </div>
                        <div
                            class="
                                d-flex
                                align-items-center
                                flex-column
                                fluuidd-btn
                            "
                        >
                            <b-button
                                class="mt-3"
                                pill
                                size="lg"
                                variant="danger"
                                @click="add_to_editor"
                                :disabled="
                                    generated_results.length == 0
                                "
                            >
                                Add to Document</b-button
                            >
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
            <!-- <div class="col-12 mb-3">
                <ul class="leadmod">
                    <li class="active">
                        <a href=""
                            ><img src="~@/assets/images/icons/dot.png" />
                            Generate more</a
                        >
                    </li>
                    <li><a href="">See Results</a></li>
                </ul>
            </div> -->
        </div>
    </b-form>
</template>
<script>
import domains from "../../../constants/domains";
import letterTypes from "../../../constants/letterTypes";
import { http } from "../../../services/HttpService";
import { mapActions, mapGetters } from "vuex";
import { copyTextToClipboard } from "../../../utils/common";

import {
    SUMMARY_TYPES,
    SUMMARY_TYPE_LABELS,
    SUMMARY_TYPE_PLACEHOLDERS,
} from "../../../constants/summaryTypes";
export default {
    name: "GenerateOutlineForm",
    data() {
        return {
            form: {
                date: "",
                type: SUMMARY_TYPES.BLOG_OUTLINE,
                available_tools: {
                    ...SUMMARY_TYPE_LABELS,
                },
                description: "",
            },

            isNew: true,
            domains: domains,
            loading: false,

            letterTypes: letterTypes,
            limit: 1000,

            generated_results: [],
            result_index: 0,
            tab_active: 0,
            placeholders: SUMMARY_TYPE_PLACEHOLDERS,
        };
    },
    methods: {
        async onSubmit() {
            this.loading = true;
            this.form["source_lang"] = this.$store.state.input_language;
            this.form["target_lang"] = this.$store.state.output_language;
            try {
                const {
                    data: { results },
                } = await this.get_data();
                if (results.length) this.generated_results = results;
                this.result_index = 0;
                this.tab_active = 1;
            } catch (err) {}
            this.loading = false;
        },
        async get_data() {
            return await http().post("/doc/generate-summary", this.form);
        },
        result_index_changed(dir) {
            if (dir === -1) {
                this.result_index = Math.max(0, this.result_index - 1);
            } else if (dir === 1) {
                this.result_index = Math.min(
                    this.generated_results.length,
                    this.result_index + 1
                );
            }
        },
        copy_result() {
            copyTextToClipboard(this.generated_results[this.result_index].text);
        },
        add_to_editor() {
            this.$root.$emit('add_text_to_editor', this.generated_results[this.result_index].text);
        }
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
