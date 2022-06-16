<template>
  <div class="bg-light rounded">
    <div class="w-100 d-flex py-5 my-5 justify-content-center" v-if="loading">
      <b-spinner />
    </div>
    <div
      class="w-100 d-flex py-4 my-4 justify-content-center"
      v-if="!loading && notes.length === 0"
    >
      There are no saved notes.
    </div>
    <VueSlickCarousel
      :arrows="false"
      :dots="true"
      :slidesPerRow="4"
      :responsive="responsive"
      v-if="!loading && notes.length > 0"
    >
      <div class="article-item" v-for="(item, idx) in notes" :key="idx">
        <b-card>
          <draft-tools
            :hideView="true"
            @deleteItem="deleteItem(item)"
            @copyToClipboard="copyToClipboard(item)"
          />
          <!-- <div class="text-center">
            <span class="material-icons-outlined article-icon">
              description
            </span>
          </div> -->
          <div class="article-title d-flex align-items-start">
            <img
              src="@/assets/images/icons/article-item.svg"
              alt="folder"
              class="mr-1"
            />{{ item.sm }}
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
import { http } from '../../../services/HttpService';
import { copyTextToClipboard } from '../../../utils/common';
import DraftTools from './DraftTools.vue';

export default {
  name: 'NoteDrafts',
  components: { VueSlickCarousel, DraftTools },
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      responsive: defaultSliderConfig,
      notes: [],
      loading: false,
    };
  },
  methods: {
    async loadData() {
      const strLimit = 200;
      try {
        this.loading = true;

        const {
          data: { notes },
        } = await http().get('/notes', {
          params: { query: this.query },
        });
        this.notes = notes.map((item) => ({
          ...item,
          sm: this.$func.formttedSubstring(item.text, strLimit),
        }));
        // eslint-disable-next-line no-empty
      } catch (err) {}
      this.loading = false;
    },
    async deleteItem(item) {
      try {
        await http().delete('notes/' + item._id);
        this.loadData();
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
    copyToClipboard(item) {
      copyTextToClipboard(item.text);
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
