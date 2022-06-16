<template>
  <div class="explorer-container">
    <h3>Saved Articles</h3>
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
        <div class="item-title" v-if="item.baseData.title">
          {{ item.baseData.title }}
        </div>
        <div class="position-relative">
          <div
            class="item-content"
            :class="{ truncated: item.truncated }"
            @click="item.truncated = !item.truncated"
            v-html="$func.formattedContentString(item.article)"
          ></div>
          <span
            class="material-icons expand"
            :class="{ expanded: !item.truncated }"
            @click="item.truncated = !item.truncated"
          >
            expand_more
          </span>
        </div>
        <div class="d-flex flex-wrap">
          <div class="item-property mr-3">
            <span class="label">Document Type: </span>
            {{ item.baseData.documentType }}
          </div>
          <div class="item-property mr-3">
            <span class="label">Domain: </span>
            {{ item.baseData.domain }}
          </div>
          <div class="item-property" v-if="item.baseData.keywords">
            <span class="label">Keywords: </span>
            {{ item.baseData.keywords.join(', ') }}
          </div>
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
import { MESSAGE_TYPE_LABELS } from '../../constants/messageTypes';
import { http } from '../../services/HttpService';
import { copyTextToClipboard } from '../../utils/common';
export default {
  components: { GeneratorTools },
  name: 'ExplorerArticles',
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      filteredData: [],
      messageTypes: MESSAGE_TYPE_LABELS,
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
          data: { articles },
        } = await http().get('/articles');
        this.results = articles.map((item) => ({
          ...item,
          truncated: true,
        }));
        this.filterData();
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.article);
    },
    async removeItem(item) {
      try {
        await http().delete('article/' + item._id);
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
