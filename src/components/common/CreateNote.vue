<template>
  <div>
    <div v-if="needToShow">
      <div
        class="notes-sections"
        :class="{ show: show }"
        id="notes-section"
        v-click-outside="{
          excludeIds: ['notes-section'],
          handler: 'outsideClicked',
        }"
      >
        <div class="create-note" @click="toggleNotes">
          <div class="create-text">
            {{ show ? 'Close  x' : 'Saved Notes' }}
          </div>
          <img src="~@/assets/images/icons/bookmarkwhite.png">
        </div>
        <b-form-group class="col-12">
          <b-input-group style="max-width:97%">
            <b-form-input
              v-model="searchString"
              @keyup="searchTimeOut()"
              placeholder="Search"
            />
            <b-input-group-append>
              <span class="material-icons-outlined"> search </span>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <notes-tab :query="query" />
      </div>
    </div>
  </div>
</template>
<script>
import NotesTab from '../writing/Article/NotesTab.vue';
export default {
  components: { NotesTab },
  data() {
    return {
      show: false,
      query: '',
      searchString: '',
      needToShow: true,
    };
  },
  name: 'CreateNote',
  mounted() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (this.$route.fullPath.includes('/writing/')) {
        this.needToShow = true;
      } else {
        this.needToShow = false;
      }
    },
    toggleNotes() {
      this.show = !this.show;
    },
    outsideClicked() {
      this.show = false;
    },
    searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.query = this.searchString;
      }, 800);
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>
<style lang="scss" scoped>
.notes-sections {
  background-color: white;
  padding: 10px;
  @media (max-width: 600px) {
    padding-right: 10px;
  }
  position: fixed;
  top: 70px;
  bottom: 0;
  right: -600px;
  width: 600px;

  border: 1px solid transparent;
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 16%);
  transition: right ease 0.3s;
  &.show {
    right: 0;
  }
  .create-note {
    position: absolute;
    top: 50%;
    left: -30px;
    transform: translate(0, -50%);
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--primary);
    opacity: 0.7;
    color: white;
    padding: 10px 5px;
    border-radius: 6px 0 0 6px;
    transition: 0.3s all ease;
    &:hover {
      opacity: 1;
    }
    .material-icons-outlined {
      font-size: 18px;
    }
    cursor: pointer;
    .create-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
      margin-bottom: 5px;
    }
  }
}
</style>
