<template>
  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto dashb-container">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                  <img src="@/assets/logo-mini.png" />
                </div>
                <div v-if="processing" class="text-center">
                  <b-spinner
                    variant="primary"
                    label="Text Centered"
                  ></b-spinner>
                </div>
                <div class="dashb-fix" v-if="!processing">
                  <h4>Email Confirmation...</h4>
                  <p v-if="infoMessage" class="lead">
                    {{ infoMessage }}
                  </p>
                  <p v-if="errorMessage" class="lead text-danger">
                    {{ errorMessage }}
                  </p>
                  <hr class="my-4" />
                  <p>Continue to your projects.</p>
                  <router-link
                    :to="{ name: $routerItems.EXPLORER_PROJECTS }"
                    class="btn btn-block btn-HelloScribe btn-lg font-weight-medium auth-form-btn btn-danger"
                  >
                    Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>
<script>
import routerItems from '../../../constants/routerItems';
import * as auth from '../../../services/AuthService';
import { http } from '../../../services/HttpService';
export default {
  name: 'emailconfirmation',
  data() {
    return {
      processing: true,
      infoMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    init() {
      const isLoggedIn = auth.isLoggedIn();
      const token = this.$route.params.token;
      /* Redirect to login if not */
      if (isLoggedIn) {
        console.log('not loggedin');
        this.$router.push({
          name: routerItems.DASHBOARD,
        });
      } else {
        /* Verify email */
        http()
          .get(`/auth/email/confirm/${token}`)
          .then(
            function(response) {
              if (response) {
                this.processing = false;
                this.infoMessage = response.data.message;
                //Init Confirmation
                auth.setSession(response.data.user);
                this.$store.dispatch('authenticate');
              }
            }.bind(this)
          )
          .catch(
            function(error) {
              if (error.response) {
                this.processing = false;
                this.errorMessage = error.response.data.message;
              }
            }.bind(this)
          );
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
