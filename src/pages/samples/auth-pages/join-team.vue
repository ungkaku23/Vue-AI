<template>
  <div>
    <section class="join">
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row w-100 flex-grow">
              <div class="col-xl-4 col-lg-6 mx-auto">
                <div class="auth-form-light text-left p-5 rounded shadow">
                  <div class="brand-logo">
                    <img 
                      src="@/assets/logo.png"
                      :style="{'height': `60px`, 'width': `auto`}"
                    />
                  </div>
                  <div v-if="!expire.expired" id="verification-process" class="verification-process">
                    <div>Verification</div>
                    <p :style="{ 'margin': `5px` }">Joining the {{ invitedBy }}'s team...</p>
                  </div>
                  <div v-else id="verification-process" class="verification-process">
                    <div>Something Wrong...</div>
                    <p :style="{ 'margin': `5px` }">{{ expire.message }}</p>
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
  </div>
</template>
<script>
import routerItems from "../../../constants/routerItems";
import { http } from '../../../services/HttpService';
import * as auth from '../../../services/AuthService';
import { mapGetters } from 'vuex';
export default {
  name: 'join-team',
  data() {
    return {
      invitedBy: null,
      token: null,
      expire: {
        expired: false,
        message: null,
      },
      errorMessage: null,
    };
  },
  mounted() {
    http()
      .get(`/checkstate/${this.$route.params.token}`)
      .then(response => {
        if (response) {
          console.log('RESPONSE', response);
          this.invitedBy = response.data.invitation.invitedBy;

          this.startVerificationProcess(
            response.data.invitation.email,
            response.data.invitation.role,
            response.data.invitation.owner
          );
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('ERROR', error.response);
          this.expire.message = error.response.data.message;
          this.expire.expired = true;
        }
      });
  },
  methods: {
    startVerificationProcess(userEmail, access, owner) {
      this.verificationProcessing = true;
      const user = {
        email: userEmail,
        password: "password",
        username: userEmail.split("@")[0],
        provider: '',
        access,
        owner
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
            password: "password",
            access,
            owner
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
    }
  },
  beforeMount() {
    
  },
  computed: {
    ...mapGetters({
      userInfo: 'getCurrentUser',
    }),
  },
};
</script>
<style>
.verification-process {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
