<template>
  <section class="login">
    <div v-if="notConfirmed">
      <b-alert show dismissible variant="warning">
        <strong>Heads up!</strong>
        Check your email for a link to confirm your email address.
        <router-link to="" v-on:click.native="init">Click here</router-link>
        if you still can't find it
      </b-alert>
    </div>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto custom-loginview">
              <div class="auth-form-light text-left p-5 rounded">
                <div class="brand-logo">
                  <router-link :to="{ name: $routerItems.LOGIN }">
                    <img :style="{'height': `60px`}" src="@/assets/logo-7.png" />
                  </router-link>
                </div>
                <div v-if="verificationProcessing" id="verification-process" class="verification-process">
                  <div>Verification</div>
                  <p :style="{ 'margin': `5px` }">Google Account Verification...</p>
                </div>
                <div v-else>
                  <div class="googlesignup">
                    <a
                      class="btn btn-outline-primary d-block mt-3 cursor-pointer"
                      @click="doGoogleAuth"
                    >
                      <img src="@/assets/images/icons/googles.png" alt="" />
                      Sign in with Google
                    </a>
                  </div>
                  <div class="orsepration">
                    <span>or</span>
                  </div> 
                  <MojoAuth
                    @onVerificationResult="onVerificationResult($event)"
                    ref="mojoAuthRef"
                  /> 
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
import routerItems from "../../../constants/routerItems";
import * as auth from "../../../services/AuthService";
import { http } from "../../../services/HttpService";
import MojoAuth from "../../../components/auth/MojoAuth.vue";

export default {
  name: "login",
  components: {
    MojoAuth
  },
  data: function () {
    return {
      email: "",
      password: "",
      errorMessage: null,
      notConfirmed: false,
      googleErrorMessage: "",
      googleEmail: "",
      verificationProcessing: false
    };
  },
  methods: {
    startVerificationProcess(userEmail) {
      this.verificationProcessing = true;
      const user = {
        email: userEmail,
        password: "password",
        username: userEmail.split("@")[0],
        provider: '',
      };

      auth
      .registerUser(user)
      .then((regResponse) => {
        if (regResponse) {
          auth
          .login({
            email: userEmail,
            password: "password"
          })
          .then(() => {
            this.verificationProcessing = false;
            this.$router.push(
              this.$route.query.redirect || {
                name: routerItems.EXPLORER_PROJECTS,
              }
            )
          })
          .catch((loginError) => {
            this.verificationProcessing = false;
            if (loginError.response) {
              this.errorMessage = loginError.response.data.message;
              if (this.errorMessage.includes("not confirmed")) {
                this.notConfirmed = true;
              }
            }
          });
        } else {
          this.verificationProcessing = false;
        }
      })
      .catch(regError => {
        // if (regError.response.data.message === "Username is already taken") {
          auth
          .login({
            email: userEmail,
            password: "password"
          })
          .then(() => {
            this.verificationProcessing = false;
            this.$router.push(
              this.$route.query.redirect || {
                name: routerItems.EXPLORER_PROJECTS,
              }
            )
          })
          .catch((loginError) => {
            this.verificationProcessing = false;
            if (loginError.response) {
              this.errorMessage = loginError.response.data.message;
              if (this.errorMessage.includes("not confirmed")) {
                this.notConfirmed = true;
              }
            }
          });
        // }
      });
    },
    doGoogleAuth() {
      // http().get(`${this.$config.appUrl}/api/google-login`);
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          if (this.$gAuth.isAuthorized) {
            let userEmail = GoogleUser.getBasicProfile()["Iv"];
            console.log("verified email via google auth: ", userEmail);
            this.startVerificationProcess(userEmail);
          }
        })
        .catch(error => {
          //on fail do something
        });
    },
    async handleSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      if (this.$route.params.invitation) {
        this.loginByInvitation(this.$route.params.invitation, user);
      } else {
        this.onLogin(user);
      }
    },
    ///Mail NOtif confirmation
    init() {
      http()
        .post("/auth/email/confirm/sent", { email: this.googleEmail?this.googleEmail:this.email })
        .then(
          function (response) {
            if (response) {
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            if (error) {
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }.bind(this)
        );
    },
    onVerificationResult(info) {
      console.log("info: ", info);
    },
    onLogin: async function (user) {
      this.notConfirmed = false;
      this.googleErrorMessage = "";
      await auth
        .login(user)
        .then(() =>
          this.$router.push(
            this.$route.query.redirect || {
              name: routerItems.EXPLORER_PROJECTS,
            }
          )
        )
        //this.$router.push({ name: this.$routerItems.DASHBOARD });
        .catch(
          function (error) {
            if (error.response) {
              this.errorMessage = error.response.data.message;
              if (this.errorMessage.includes("not confirmed")) {
                this.notConfirmed = true;
              }
            }
          }.bind(this)
        );
    },
    loginByInvitation: function (token, user) {
      this.googleErrorMessage = "";
      http()
        .post(`/login-invitation/${token}`, user)
        .then(
          function (response) {
            if (response) {
              auth.setSession(response.data.user);
              this.$router.push(
                this.$route.query.redirect || {
                  name: routerItems.EXPLORER_PROJECTS,
                }
              );
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    if (this.$route.query.error) {
      this.googleErrorMessage = this.$route.query.error;
      if (this.googleErrorMessage.includes("not confirmed")) {
        this.notConfirmed = true;
        if (this.$route.query.email) this.googleEmail = this.$route.query.email;
      }
    }
    if (this.$route.query.user) {
      auth.setSession(JSON.parse(this.$route.query.user));
      this.$router.push({ name: this.$routerItems.EXPLORER_PROJECTS });
    }
    // if (this.$route.params.stateId) {
    //   console.log("stateId: ", this.$route.params.stateId);
    // }
  },
};
</script>
<style scoped>
  .googlesignup {
    margin-bottom: 5px;
  }

  .verification-process {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
