<template>
  <div class="companion-tab academia-container custm-reserach">
    <div class="searchbar-topp">
      <input type="text" placeholder="Search verified sources" v-model="query">
      <img src="~@/assets/images/icons/magnifyingglass.png">
    </div>
    <div class="d-flex p-5 justify-content-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="item-info" v-for="(item, idx) in results" :key="idx">
      <div class="item-title">{{ item.slug }}</div>
      <div class="add-to-notes">
        <article-actions
          @addToNotes="addToNotes(item)"
          @addToDocument="addToDocument(item)"
          @copyToClipboard="copyToClipboard(item)"
        />
      </div>
      <div class="truncated">
        {{
          item.showMore
            ? item.description
            : $func.formttedSubstring(item.description, 100)
        }}
        <span
          class="text-danger clickable"
          @click="switchShowMore(idx)"
          v-if="
            item.description !== $func.formttedSubstring(item.description, 100)
          "
        >
          {{ item.showMore ? 'less' : 'more' }}</span
        >
      </div>
      <div class="item-property">
        <span class="label">Cite: </span>
        <a :href="item.url" target="_blank">{{ item.url }}</a>
      </div>
      <div class="item-property">
        <span class="label">Authors: </span>{{ item.authors }}
      </div>
      <div class="item-property">
        <span class="label">Year: </span>{{ item.year }}
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../../../services/HttpService';
import { copyTextToClipboard } from '../../../utils/common';
import ArticleActions from './ArticleActions.vue';
export default {
  components: { ArticleActions },
  name: 'SemanticScholarInfoTab',
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
    switchShowMore(idx) {
      this.results[idx].showMore = !this.results[idx].showMore;
    },
    addToDocument(item) {
      this.$root.$emit('addToDocument', {
        slug: item.slug,
        text: item.description,
        authors: item.authors,
        url: item.url,
        year: item.year,
        publishedAt: new Date().toLocaleDateString(),
      });
    },
    addToNotes(item) {
      this.$root.$emit('addToNotes', {
        slug: item.slug,
        category: 'Article',
        text: item.description,
        authors: item.authors,
        url: item.url,
        year: item.year,
        publishedAt: new Date().toLocaleDateString(),
        baseData: { type: 'Article' },
      });
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.description);
    },
    async loadData() {
      try {
        this.results = [];
        this.loading = true;
        if (this.query) {
          const { data } = await http().post(
            '/doc/semantic-scholar-academic-info',
            {
              query: this.query || '',
            }
          );
          data.forEach((item) => {
            this.results.push({
              id: item.paperId,
              slug: item.title || '',
              description: item.abstract || '',
              venue: item.venue,
              url: item.url || '',
              authors: item.authors.map((author) => author.name).join(', '),
              year: item.year,
              truncated: false,
              showMore: false,
            });
          });
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
<style lang="scss" scoped></style>
