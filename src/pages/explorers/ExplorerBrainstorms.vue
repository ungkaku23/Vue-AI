<template>
  <div class="explorer-container">
    <h3>Saved Copywriting</h3>
    <b-form-group>
      <b-input-group>
        <b-form-input v-model="query" placeholder="Search Saved Drafts" />
        <b-input-group-append>
          <span class="material-icons-outlined"> search </span>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <div class="d-flex p-5 justify-content-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="!loading">
      <div class="item-info" v-for="(item, idx) in filteredData" :key="idx">
        <div class="item-title" v-if="item.baseData.type">
          <strong>Category:</strong> {{ messageTypes[item.baseData.type] }}
        </div>
        <div class="position-relative">
          <div
            class="item-content"
            :class="{ truncated: item.truncated }"
            @click="item.truncated = !item.truncated"
            v-html="$func.formattedContentString(item.answer)"
          ></div>
          <span
            class="material-icons expand"
            :class="{ expanded: !item.truncated }"
          >
            expand_more
          </span>
        </div>
        <div class="item-property">
          <span class="label">Base Data: </span>
          {{ item.baseData.description }}
        </div>
        <div class="item-property">
          <span class="label">Created At: </span
          >{{ $func.formattedDateTime(item.updatedAt) }}
        </div>
        <generator-tools
          class="mt-2"
          hideNote
          hideSave
          @copy="copyToClipboard(item)"
          @remove="removeItem(item)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import GeneratorTools from '../../components/common/GeneratorTools.vue';
import { BRAINSTORM_TYPE_LABELS } from '../../constants/brainstormTypes';
import { http } from '../../services/HttpService';
import { copyTextToClipboard } from '../../utils/common';
export default {
  components: { GeneratorTools },
  name: 'ExplorerBrainstorms',
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      filteredData: [],
      messageTypes: BRAINSTORM_TYPE_LABELS,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    filterData() {
      this.filteredData = this.results.filter((item) =>
        JSON.stringify(item)
          .toLowerCase()
          .includes(this.query.toLowerCase())
      );
    },
    async loadData() {
      this.loading = true;
      try {
        const {
          data: { answers },
        } = await http().get('/answers');
        this.results = answers.map((item) => ({
          ...item,
          truncated: true,
        }));
        this.filterData();
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.answer);
    },
    async removeItem(item) {
      try {
        await http().delete('answer/' + item._id);
        this.loadData();
      } catch (err) {}
    },
  },
  watch: {
    query: function() {
      this.filterData();
    },
  },
};
</script>
