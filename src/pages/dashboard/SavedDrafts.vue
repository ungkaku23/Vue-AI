<template>
  <div class="container-fluid draftpage">
    <b-form-group>
      <b-input-group>
        <b-form-input
          v-model="searchString"
          @keyup="searchTimeOut()"
          placeholder="Search Saved Notes"
        />
        <b-input-group-append>
          <span class="material-icons-outlined"> search </span>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <div class="row">
      <div class="col-md-6">
        <div>
          <div class="accordion-header" v-b-toggle.accordion-articles>
            <h4>Articles</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-articles" role="tabpanel" visible>
            <article-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_ARTICLES }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>

        <div>
          <div class="accordion-header" v-b-toggle.accordion-messages>
            <h4>Messaging</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-messages" role="tabpanel">
            <messaging-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_MESSAGES }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>

        <div>
          <div class="accordion-header" v-b-toggle.accordion-media-pitches>
            <h4>Media Pitches</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-media-pitches" role="tabpanel">
            <media-pitch-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_MEDIA_PITCHES }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>

        <div>
          <div class="accordion-header" v-b-toggle.accordion-quotes>
            <h4>Quotes</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-quotes" role="tabpanel">
            <quotes-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_QUOTES }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <div class="accordion-header" v-b-toggle.accordion-headlines>
            <h4>Headlines</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-headlines" visible role="tabpanel">
            <headline-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_HEADLINES }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>
        <div>
          <div class="accordion-header" v-b-toggle.accordion-brainstorms>
            <h4>Brainstorm</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-brainstorms" role="tabpanel">
            <brainstorm-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_BRAINSTORMS }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>

        <div>
          <div class="accordion-header" v-b-toggle.accordion-copywritings>
            <h4>Copywriting</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-copywritings" role="tabpanel">
            <div class="accordion-body">
              <copywriting-drafts :query="query" />
              <div class="d-flex justify-content-end my-3">
                <router-link
                  :to="{ name: $routerItems.EXPLORER_COPYWRITINGS }"
                  class="mr-3"
                  >View all</router-link
                >
              </div>
            </div>
          </b-collapse>
        </div>
        <div>
          <div class="accordion-header" v-b-toggle.accordion-questions>
            <h4>Questions</h4>
            <span class="material-icons">
              expand_more
            </span>
          </div>
          <b-collapse id="accordion-questions" role="tabpanel">
            <question-drafts :query="query" />
            <div class="d-flex justify-content-end my-3">
              <router-link
                :to="{ name: $routerItems.EXPLORER_QUESTIONS }"
                class="mr-3"
                >View all</router-link
              >
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleDrafts from '../../components/writing/drafts/ArticleDrafts.vue';
import HeadlineDrafts from '../../components/writing/drafts/HeadlineDrafts.vue';
// import SummaryDrafts from '../../components/writing/drafts/SummaryDrafts.vue';
// import NoteDrafts from '../../components/writing/drafts/NoteDrafts.vue';
import BrainstormDrafts from '../../components/writing/drafts/BrainstormDrafts.vue';
import MediaPitchDrafts from '../../components/writing/drafts/MediaPitchDrafts.vue';
import MessagingDrafts from '../../components/writing/drafts/MessagingDrafts.vue';
import CopywritingDrafts from '../../components/writing/drafts/CopywritingDrafts.vue';
import QuotesDrafts from '../../components/writing/drafts/QuotesDrafts.vue';
import QuestionDrafts from '../../components/writing/drafts/QuestionDrafts.vue';
export default {
  components: {
    ArticleDrafts,
    HeadlineDrafts,
    // SummaryDrafts,
    // NoteDrafts,
    BrainstormDrafts,
    MediaPitchDrafts,
    MessagingDrafts,
    CopywritingDrafts,
    QuotesDrafts,
    QuestionDrafts,
  },
  name: 'SavedDrafts',
  data() {
    return {
      searchString: '',
      query: '',
    };
  },
  methods: {
    searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.searchData();
      }, 800);
    },
    searchData() {
      this.query = this.searchString;
    },
  },
};
</script>
<style lang="scss" scoped>
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px var(--gray-lighter);
  padding: 5px 10px;
  border-radius: 6px;
  h4 {
    margin-bottom: 0;
  }
  .material-icons {
    transform: rotate(0deg);
    transition: all 0.3s ease;
  }
  &[aria-expanded='true'] {
    .material-icons {
      transform: rotate(180deg);
    }
  }
  margin-bottom: 10px;
}
.accordion-body {
  height: 250px;
}
</style>
