<template>
  <div class="join-collaborator-container">
    <div class="d-flex p-5 justify-content-center" v-if="loading">
      <b-spinner variant="primary"></b-spinner>
      <div class="ml-3 h3">Loading ...</div>
    </div>
    <b-alert variant="danger" :show="!!errMsg">
      {{ errMsg }}
    </b-alert>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import routerItems from "../../constants/routerItems";
import { http } from "../../services/HttpService";
export default {
  name: "HeadlineEditor",
  components: {},
  data() {
    return {
      loading: false,
      errMsg: "",
    };
  },
  methods: {
    ...mapActions({
      addArticle: "articleStore/addArticle",
    }),
    async validateCollaboration() {
      const token = this.$route.params.token;
      if (!token) {
        this.errMsg = "Invalid invitation url.";
        return;
      }
      this.loading = true;
      this.errMsg = "";
      try {
        const {
          data: { article },
        } = await http().post("/doc/validate-collaboration", {
          token,
        });
        this.addArticle(article);
        this.$router.push({ name: routerItems.ARTICLE });
      } catch (err) {
        if (err) {
          this.errMsg = "Invalid Join";
        } else {
          this.errMsg = "Invalid Join";
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.validateCollaboration();
  },
};
</script>
<style lang="scss" scoped></style>
