<template>
  <div class="companion-tab web-container">
    <div class="d-flex p-5 justify-content-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="item-info" v-for="(item, idx) in results" :key="idx">
      <div class="item-title">{{ item.title }}</div>
      <div class="add-to-notes">
        <article-actions
          @addToNotes="addToNotes(item)"
          @addToDocument="addToDocument(item)"
          @copyToClipboard="copyToClipboard(item)"
        />
      </div>
      <div class="truncated">
        {{ item.description }}
      </div>

      <div class="item-property">
        <span class="label">Cite: </span>
        <a :href="item.link" target="_blank">{{ item.link }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../services/HttpService";
import { copyTextToClipboard } from "../../../utils/common";
import ArticleActions from "./ArticleActions.vue";
export default {
  components: { ArticleActions },
  name: "AcademiaTab",
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
    async loadData() {
      try {
        this.results = [];
        this.loading = true;
        if (this.query) {
          const {
            data: { results: webData },
          } = await http().post("/doc/google-info", {
            query: this.query || "",
          });
          this.results = webData;
        }
      } catch (err) {}
      this.loading = false;
    },
    addToDocument(item) {
      this.$root.$emit("addToDocument", {
        slug: item.title,
        text: item.description,
        authors: "",
        url: item.link,
        year: "",
        publishedAt: new Date().toLocaleDateString(),
      });
    },
    addToNotes(item) {
      this.$root.$emit("addToNotes", {
        slug: item.title,
        text: item.description,
        authors: "",
        url: item.link,
        year: "",
        publishedAt: new Date().toLocaleDateString(),
      });
    },

    copyToClipboard(item) {
      copyTextToClipboard(item.description);
    },
  },
  watch: {
    query: function () {
      this.loadData();
    },
  },
};
</script>