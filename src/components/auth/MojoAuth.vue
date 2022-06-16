<template lang="html">
  <div class="mojo-auth">
    <div v-if="mojoPayload === null" id="mojoauth-passwordless-form" class="mojo-auth-form" />
    <div v-if="mojoPayload === null" class="mt-4 customterms-rules">
      <label class="form-check-label text-muted">
        By signing up or signing in you agree to our
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
    <div v-if="mojoPayload !== null" id="verification-process" class="verification-process">
      <div>Verification</div>
      <p :style="{ 'margin': `5px` }">{{mojoProcessStatus}}...</p>
    </div>
  </div>
</template>

<script>
import MojoAuth from "mojoauth-web-sdk";
import routerItems from "../../constants/routerItems";
import * as auth from "../../services/AuthService";
import config from "../../constants/config";
const mojoauth = new MojoAuth(config.mojoApiKey, {
  language: "en_US",
  redirect_url: `${config.appBaseUrl}/auth/login`,
  source: [
    { type: "email", feature: "magiclink" }
  ],
});

export default {
  name: 'MojoAuth',
  data: function () {
    return {
      mojoPayload: null,
      mojoProcessStatus: ""
    };
  },
  methods: {
    onVerificationResult() {
      this.$emit('onVerificationResult','Awesome ')
    },
    startVerificationProcess(userEmail) {
      this.mojoProcessStatus = "Checking on the Registration Status";
      this.mojoPayload = {};
      const user = {
        email: userEmail,
        password: "password",
        username: userEmail.split("@")[0],
        provider: '',
      };

      setTimeout(() => {
        this.mojoProcessStatus = "Connecting to the Stripe Service";
      }, 2500);

      console.log("will regsiter: ", user);

      auth
      .registerUser(user)
      .then((regResponse) => {
        console.log("regResponse Success: ", regResponse.response);
        if (regResponse) {
          console.log("valid regResponse", regResponse);
          this.mojoProcessStatus = "Logging in to HelloScribe";
          auth
          .login({
            email: userEmail,
            password: "password"
          })
          .then(() => {
            console.log("loginSuccess");
            this.$router.push(
              this.$route.query.redirect || {
                name: routerItems.EXPLORER_PROJECTS,
              }
            )
          })
          .catch((loginError) => {
            console.log("loginError: ", loginError);
            if (loginError.response) {
              this.errorMessage = loginError.response.data.message;
              if (this.errorMessage.includes("not confirmed")) {
                this.notConfirmed = true;
              }
            }
          });
        }
      })
      .catch(regError => {
        console.log("regResponse Error: ", regError.response);
        // if (regError.response.data.message === "Username is already taken") {
          console.log("valid regError duplicated user", regError);
          this.mojoProcessStatus = "Logging in to HelloScribe";
          auth
          .login({
            email: userEmail,
            password: "password"
          })
          .then(() => {
            console.log("regeError / loginSuccess");
            this.$router.push(
              this.$route.query.redirect || {
                name: routerItems.EXPLORER_PROJECTS,
              }
            )
          })
          .catch((loginError) => {
            console.log("regeError / loginError", loginError);
            if (loginError.response) {
              this.errorMessage = loginError.response.data.message;
              if (this.errorMessage.includes("not confirmed")) {
                this.notConfirmed = true;
              }
            }
          });
        // }
      });
    }
  },
  created() {
    
  },
  mounted() {
    const mojoLIstener = setInterval(() => {
      if (this.$jQuery.trim(this.$jQuery(".mojo-auth-form").html())) {
        clearInterval(mojoLIstener);
        this.$jQuery("#mojoauth-login label").text("Enter your email");
        this.$jQuery("#mojoauth-passwordless-email").attr("placeholder", "Email");
        this.$jQuery("#mojoauth-login input[type=submit]").attr("value", "CONTINUE");
      }
    }, 500);

    const postLoginMessage = setInterval(() => {
      if (this.$jQuery(".mojo-auth-form div:first-child").attr("id") === "post-login-message" || this.$jQuery(".mojo-auth div:first-child").attr("id") === "verification-process") {
        clearInterval(postLoginMessage);
        this.$jQuery(".googlesignup").css("display", "none");
        this.$jQuery(".orsepration").css("display", "none");
      }
    }, 500);

    if (this.$route.query.state_id === undefined) {
      mojoauth.signIn().then(payload => {
      });
    }

    if (this.$route.query.state_id !== "signInWithStateID") {
      this.mojoProcessStatus = "Verifying on MojoAuth Provider";
      mojoauth.signInWithStateID(this.$route.query.state_id).then(payload => {
        if (payload.authenticated) {
          this.startVerificationProcess(payload.user.identifier);
        }
      }); 
    }
  }
}
</script>

<style lang="scss">
:root {
  .mojo-auth {
    .mojo-auth-form {
      #mojoauth-login-container,
      #post-login-message {
        .mj-main-js {
          height: auto;

          .mj-card-js {
            box-shadow: none !important;
            padding: 0;

            .header {
              display: none !important;
            }

            #mojoauth-login {
              margin: 0;

              label {
                margin-bottom: 10px;
                color: #280728;
                font-family: 'Manrope', sans-serif;
                font-weight: 700;
                font-size: 0.8125rem;
              }

              input {
                background: transparent;
                height: auto;
                border-color: #EAECF4 !important;
                padding: 0.5rem 0.75rem;
                font-size: 14px !important;
                line-height: 23px;
                box-sizing: border-box;
                border: 1px solid #e8e5e5;
                border-radius: 4px;
                font-family: "Graphik";
                box-shadow: 0px 0px 7px 0.1px #574b8a0a;
              }

              input:hover {
                border-color: #E91E63 !important;
              }
            }

            #mojoauth-brand-footer {
              display: none !important;
            }

            div.logo {
              margin-top: 70px;
            }

            div.title {
              margin-top: 125px;
            }
          }
        }
      }
    }
  }
}

.verification-process {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>