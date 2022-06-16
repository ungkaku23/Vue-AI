<template>
  <section class="register">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto custom-loginview">
              <div class="auth-form-light text-left p-5 rounded">
                <div class="brand-logo">
                  <router-link :to="{ name: $routerItems.LOGIN }">
                     <h4>Welcome to HelloScribe</h4>
                  </router-link>
                </div>
                <div class="googlesignup">
                  <a
                    class="btn btn-outline-primary d-block mt-3"
                    :href="$config.appUrl + '/api/google-login'"
                  >
                    <img src="@/assets/images/icons/googles.png" alt="" />
                    Sign up with Google
                  </a>
                  <div class="mt-3" v-if="googleErrorMessage">
                    <b-alert show dismissible variant="warning">
                      <strong>Heads Up!</strong>
                      {{ googleErrorMessage }}
                    </b-alert>
                  </div>
                </div>
                <div class="googlesignup" style="display:none;">
                  <a  
                    class="btn btn-outline-primary d-block mt-3"
                    :href="$config.appUrl + '/api/facebook-login'"
                  >
                    <img src="@/assets/images/icons/facebook.png" alt="" />
                    Continue with Facebook
                  </a>
                  <div class="mt-3" v-if="googleErrorMessage">
                    <b-alert show dismissible variant="warning">
                      <strong>Heads up!</strong>
                      {{ googleErrorMessage }}
                    </b-alert>
                  </div>
                </div>
                <div class="googlesignup" style="display:none;">
                  <a
                    class="btn btn-outline-primary d-block mt-3"
                    :href="$config.appUrl + '/api/linkedin-login'"
                  >
                    <img src="@/assets/images/icons/linkedin.png" alt="" />
                    Continue with LinkedIn
                  </a>
                  <div class="mt-3" v-if="googleErrorMessage">
                    <b-alert show dismissible variant="warning">
                      <strong>Heads up!</strong>
                      {{ googleErrorMessage }}
                    </b-alert>
                  </div>
                </div>
                <div class="orsepration">
                  <span>OR</span>
                </div>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group">
                    <label for="username">Enter your Name</label>
                    <input
                      type="text"
                      v-model="user.username"
                      class="form-control form-control-lg"
                      id="username"
                      placeholder="Your name"
                      :class="{
                        'is-invalid': submitted && $v.user.username.$error,
                      }"
                    />
                    <div
                      v-if="submitted && !$v.user.username.required"
                      class="invalid-feedback"
                    >
                      Username is required
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email">Your Email (personal or work)</label>
                    <input
                      type="email"
                      v-model="user.email"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Your email address"
                      :class="{
                        'is-invalid': submitted && $v.user.email.$error,
                      }"
                      v-on:keyup="check"
                    />
                    <span class="text-danger" v-if="!email_availability"
                      >An account with this email address already exists. Please
                      login to continue.</span
                    >
                    <div
                      v-if="submitted && $v.user.email.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.user.email.required"
                        >Email is required</span
                      >
                      <span v-if="!$v.user.email.email">Email is invalid</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password">Choose a Password</label>
                    <input
                      type="password"
                      v-model="user.password"
                      class="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Enter a password"
                      autocomplete="true"
                      :class="{
                        'is-invalid': submitted && $v.user.password.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.user.password.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.user.password.required"
                        >Password is required</span
                      >
                      <span v-if="!$v.user.password.minLength"
                        >Password must be at least 6 characters</span
                      >
                    </div>
                  </div>
                  <!-- <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input
                      type="password"
                      v-model="user.confirmPassword"
                      class="form-control form-control-lg"
                      id="exampleInputPassword2"
                      placeholder="Enter password again"
                      autocomplete="true"
                      :class="{
                        'is-invalid':
                          submitted && $v.user.confirmPassword.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.user.confirmPassword.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.user.confirmPassword.required"
                        >Confirm Password is required</span
                      >
                      <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                        >Passwords must match</span
                      >
                    </div>
                  </div> -->
                  <div class="form-group mt-3">
                    <button
                      :disabled="!email_availability"
                      class="btn auth-form-btn custommain-btn"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div class="mb-4 customterms-rules">
                    <label class="form-check-label text-muted">
                      
                     By signing up you agree to HelloScribe's
                        <a href="https://www.helloscribe.ai/home/terms-of-use"
                          >Terms of Use
                        </a>
                        and 
                        <a href="https://www.helloscribe.ai/home/helloscribe-guru-privacy-notice"
                          >Privacy Policy
                        </a>
                        <i class="input-helper"></i>
                    </label>
                  </div>
                  <div class="text-center mt-4 notamember">
                    Already registered?
                    <router-link
                      :to="{ name: $routerItems.LOGIN }"
                      class="text-HelloScribe"
                      >Login</router-link
                    >
                  </div>
                </form>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import * as auth from '../../../services/AuthService';
import { http } from '../../../services/HttpService';
export default {
  name: 'register',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        // confirmPassword: '',
        stripe_id: '',
        stripe_subscription_id: '',
      },
      email_availability: true,
      submitted: false,
      invitation: null,
      agreePolicy: false,
      googleErrorMessage: '',
    };
  },
  validations: {
    user: {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      // confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
  },
  methods: {
    //Check Email Availability Async
    check: function() {
      var email = this.user.email.trim();
      if (email.length > 2) {
        http()
          .post('/user/checkemail/', {
            email: email,
          })
          .then(
            function(response) {
              if (response.data.is_exist === 'no') {
                this.email_availability = true;
                this.is_disable = false;
              } else {
                this.email_availability = false;
                this.is_disable = true;
              }
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    //Register Here
    async handleSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const user = {
        email: this.user.email,
        password: this.user.password,
        username: this.user.username,
        provider: 'email',
      };
      if (this.$route.params.invitation) {
        this.registerByInvitation(this.$route.params.invitation, user);
      } else {
        this.register(user);
      }
    },
    register: function(user) {
      //Register And Automaticaly Login The User

      this.googleErrorMessage = '';
      auth
        .registerUser(user)
        .then(
          function(response) {
            if (response) {
              this.$router.push({ name: this.$routerItems.LOGIN });

              this.$swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 4000,
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    registerByInvitation: function(token, user) {
      this.googleErrorMessage = '';
      http()
        .post(`/register-invitation/${token}`, user)
        .then(
          function(response) {
            if (response) {
              auth.setSession(response.data.user);
              this.$router.push({ name: this.$routerItems.EXPLORER_PROJECTS });
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  //Check Invitation State Before showing form and Prefill Email Adresse
  beforeMount() {
    const invitation = this.$route.params.invitation;
    if (!invitation) {
      return;
    }
    const user = {
      token: invitation,
    };
    http()
      .get(`/checkstate/${user.token}`)
      .then(
        function(response) {
          if (response) {
            this.user.email = response.data.invitation.email;
          }
        }.bind(this)
      )
      .catch(
        function(error) {
          if (error.response) {
            console.log('ERROR', error.response);
          }
        }.bind(this)
      );
  },
};
</script>
<style scoped>
  .googlesignup {
    margin-bottom: 5px;
  }
</style>