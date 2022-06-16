<template>
  <div class="bg-light rounded">
    <div class="w-100 d-flex py-5 my-5 justify-content-center" v-if="loading">
      <b-spinner />
    </div>
    <div
      class="w-100 d-flex py-4 my-4 justify-content-center"
      v-if="!loading && articles.length === 0"
    >
      There are no saved articles.
    </div>
    <VueSlickCarousel
      :arrows="false"
      :dots="true"
      :slidesPerRow="initialCols"
      :responsive="responsive"
      v-if="!loading && articles.length > 0"
    >
      <div class="article-item" v-for="(item, idx) in articles" :key="idx">
        <b-card>
          <draft-tools
            @viewItem="goToDetail(item)"
            @deleteItem="deleteItem(item)"
            @copyToClipboard="copyToClipboard(item)"
          />
          <div class="article-content mb-3" v-html="item.article" />
          <div class="article-title d-flex align-items-center">
            <img
              src="@/assets/images/icons/article-item.svg"
              alt="folder"
              class="mr-1"
            />
            {{ item.baseData.title }}
          </div>
        </b-card>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import defaultSliderConfig from '../../../constants/sliderConfig';
import { mapActions } from 'vuex';
import routerItems from '../../../constants/routerItems';
import DraftTools from './DraftTools.vue';
import { copyTextToClipboard } from '../../../utils/common';
import { http } from '../../../services/HttpService';

export default {
  name: 'ArticleDrafts',
  props: {
    query: {
      type: String,
      default: '',
    },
    initialCols: {
      type: Number,
      default: 2,
    },
  },
  components: { VueSlickCarousel, DraftTools },
  data() {
    return {
      responsive: defaultSliderConfig,
      articles: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getAllDraftArticles: 'articleStore/getAllDraftArticles',
      addArticle: 'articleStore/addArticle',
    }),
    async loadData() {
      try {
        this.loading = true;

        this.articles = await this.getAllDraftArticles(this.query);
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    goToDetail(article) {
      this.addArticle(article);
      this.$router.push({ name: routerItems.ARTICLE });
    },
    async deleteItem(article) {
      try {
        await http().delete('article/' + article._id);
        this.loadData();
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    copyToClipboard(article) {
      copyTextToClipboard(article.article);
    },
  },
  mounted() {
    this.loadData();
  },
  watch: {
    query: function() {
      this.loadData();
    },
  },
};
</script>
<style lang="scss" scoped>
.article-content {
  overflow: hidden;
  height: 150px;
  max-height: 150px;
  p {
    font-size: 10px !important;
  }
}
.material-icons-outlined {
  color: #4a4a4a !important;
}
</style>
