<template>
  <div class="bg-light rounded">
    <div class="w-100 d-flex py-5 my-5 justify-content-center" v-if="loading">
      <b-spinner />
    </div>
    <div
      class="w-100 d-flex py-4 my-4 justify-content-center"
      v-if="!loading && headlines.length === 0"
    >
      There are no saved headlines.
    </div>
    <VueSlickCarousel
      :arrows="false"
      :dots="true"
      :slidesPerRow="2"
      :responsive="responsive"
      v-if="!loading && headlines.length > 0"
    >
      <div class="article-item" v-for="(item, idx) in headlines" :key="idx">
        <b-card :style="{ minHeight: 80 + 'px' }">
          <draft-tools
            @viewItem="goToDetail(item)"
            @deleteItem="deleteItem(item)"
            @copyToClipboard="copyToClipboard(item)"
          />
          <div class="article-title d-flex align-items-start">
            <img
              src="@/assets/images/icons/article-item.svg"
              alt="folder"
              class="mr-1"
            />{{ item.headline }}
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
import routerItems from '../../../constants/routerItems';
import { http } from '../../../services/HttpService';
import { copyTextToClipboard } from '../../../utils/common';
import DraftTools from './DraftTools.vue';
import { mapActions } from 'vuex';

export default {
  name: 'HeadlineDrafts',
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  components: { VueSlickCarousel, DraftTools },
  data() {
    return {
      responsive: defaultSliderConfig,
      headlines: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      setHeadline: 'draftStore/setHeadline',
    }),
    async loadData() {
      try {
        this.loading = true;

        const {
          data: { headlines },
        } = await http().get('/headlines', {
          params: { query: this.query },
        });
        this.headlines = headlines;
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    goToDetail(item) {
      this.setHeadline(item);
      this.$router.push({ name: routerItems.HEADLINE });
    },
    async deleteItem(item) {
      try {
        await http().delete('headline/' + item._id);
        this.loadData();
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.headline);
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
.material-icons-outlined {
  color: #4a4a4a !important;
}
</style>
