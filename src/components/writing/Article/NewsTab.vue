<template>
  <div class="companion-tab news-container custm-reserach">
    <div class="searchbar-topp">
      <input type="text" placeholder="Search verified sources" v-model="query">
      <img src="~@/assets/images/icons/magnifyingglass.png">
    </div>
    <div class="d-flex p-5 justify-content-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="item-info" v-for="(item, idx) in results" :key="idx">
      <div class="add-to-notes">
        <article-actions
          @addToNotes="addToNotes(item)"
          @addToDocument="addToDocument(item)"
          @copyToClipboard="copyToClipboard(item)"
        />
      </div>
      <div class="item-title">{{ item.title }}</div>
      <div class="truncated">
        {{ item.summary }}
      </div>
      <div class="item-property linkks">
        <a :href="item.link" target="_blank">{{ item.link }}</a>
        <img src="~@/assets/images/icons/arrowsquareout.png">
      </div>
      <!-- <div class="item-property">
        {{ item.author }}
      </div>
      <div class="item-property datte">
        {{ item.published_date }}
      </div> -->
      <!-- <div class="nsavednote-bottom">
        <div class="nsavednote-action">
          <a href=""><img src="~@/assets/images/icons/copydone.png"></a>
          <a href=""><img src="~@/assets/images/icons/fileplus.png"> To Document</a>
          <a href=""><img src="~@/assets/images/icons/filenote.png"> To notes</a>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { http } from '../../../services/HttpService';
import { copyTextToClipboard } from '../../../utils/common';
import ArticleActions from './ArticleActions.vue';
export default {
  components: { ArticleActions },
  name: 'NewsTab',
  props: {
    query: String,
  },
  data() {
    return {
      results: [],
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    addToDocument(item) {
      this.$root.$emit('addToDocument', {
        slug: item.title,
        text: item.summary,
        authors: item.author,
        url: item.link,
        year: item.published_date,
        publishedAt: new Date().toLocaleDateString(),
      });
    },
    addToNotes(item) {
      this.$root.$emit('addToNotes', {
        slug: item.title,
        category: 'Article',
        text: item.summary,
        authors: item.author,
        url: item.link,
        year: item.published_date,
        publishedAt: new Date().toLocaleDateString(),
        baseData: { type: 'Article' },
      });
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.summary);
    },
    async loadData() {
      try {
        this.results = [];
        this.loading = true;
        if (this.query) {
          const {
            data: { results: newsData },
          } = await http().post('/doc/news-info', {
            query: this.query || '',
          });
          this.results = newsData;
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
  },
  watch: {
    query: function() {
      this.loadData();
    },
  },
};
</script>
