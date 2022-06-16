<template>
  <div class="explorer-container">
    <h3>Saved Headlines</h3>
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
        <div class="item-title">
          {{ item.headline }}
        </div>
        <div class="position-relative">
          <div
            class="item-content"
            :class="{ truncated: item.truncated }"
            @click="item.truncated = !item.truncated"
            v-html="$func.formattedContentString(item.headline)"
          ></div>
          <span
            class="material-icons expand"
            :class="{ expanded: !item.truncated }"
          >
            expand_more
          </span>
        </div>
        <div class="item-property">
          <span class="label">Article: </span>
          {{ item.article }}
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
  name: 'ExplorerHeadlines',
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
          data: { headlines },
        } = await http().get('/headlines');
        this.results = headlines.map((item) => ({
          ...item,
          truncated: true,
        }));
        this.filterData();
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.text);
    },
    async removeItem(item) {
      try {
        await http().delete('headline/' + item._id);
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
