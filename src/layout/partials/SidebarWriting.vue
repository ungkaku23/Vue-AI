<template>
  <div
    id="sidebar-menu"
    v-click-outside="{
      excludeIds: ['sidebar-menu', 'toggleMenuButton'],
      handler: 'outsideClicked',
    }"
  >
  <div class="mobl-only-sidebar">
      <!-- <div class="top-mobl-only">
        <div class="searchonly-mobl">
          <img src="~@/assets/images/icons/mobilesidebar-close.png">
          <img src="~@/assets/images/icons/mobilesearch.png">
        </div>
        <a href="" class="toplogo-mobile"><img src="~@/assets/images/icons/mobilelogo.png"></a>
        <a href="" class="addproject-mobile"><img src="~@/assets/images/icons/addprojectmobile.png"></a>
      </div> -->
      <div class="topmid-mobl-only">
        <div class="profileonly-mobl">
          <img src="~@/assets/images/icons/logo-mainn.png"> {{username}}
        </div>
        <div class="rightmobile-icons">
          <a href="" @click="logout" style="color:white">Logout</a>
          <!-- <a href=""><img src="~@/assets/images/icons/mobilemenu-question.png"></a>
          <a href=""><img src="~@/assets/images/icons/mobilemenu-gear.png"></a>
          <a href=""><img src="~@/assets/images/icons/mobilemenu-bell.png"></a> -->
        </div>
      </div>
  </div>
    <div class="pad-custm-20">
      <div v-b-toggle.collapse-project class="collapse-header" @click="navBar_clicked">
        <img src="~@/assets/images/sidebar-icons/squaresfour.png" class="iconshow-color">
        <img src="~@/assets/images/sidebar-icons/squaresfour1.png" class="iconshow-white">
         Projects</div>
      <b-collapse id="collapse-project" class="nav" v-model="visible[0]">
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.EXPLORER_PROJECTS }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">All Projects</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.DASHBOARD }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.EXPLORER_NOTES }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon isaved"></div>
            <span class="menu-title">Saved Notes</span>
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.EXPLORER_ARTICLES }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">Saved Articles</span>
          </router-link>
        </li> -->
      </b-collapse>
    </div>
    <div class="pad-custm-20">
      <div v-b-toggle.collapse-tools class="collapse-header" @click="navBar_clicked">
        <img src="~@/assets/images/sidebar-icons/magicwand.png" class="iconshow-color">
        <img src="~@/assets/images/sidebar-icons/magicwand1.png" class="iconshow-white">
        Tools</div>
      <b-collapse id="collapse-tools" class="nav" tag="ul" v-model="visible[1]">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.ARTICLE }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon idraft"></div>
            <span class="menu-title">Article</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.BRAINSTORM }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon istrom"></div>
            <span class="menu-title">Brainstorm</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.PROMOTE }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon iwrite"></div>
            <span class="menu-title">Copywriting</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.HEADLINE }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ifile"></div>
            <span class="menu-title">Headline</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.MEDIA_PITCH }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ipitch"></div>
            <span class="menu-title">Media Pitch</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.MESSAGING }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon iemail"></div>
            <span class="menu-title">Messaging</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.QUESTION }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon iques"></div>
            <span class="menu-title">Questions</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.QUOTE }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon iquote"></div>
            <span class="menu-title">Quotes</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.SOCIAL }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon isocial"></div>
            <span class="menu-title">Social Media</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.SUMMARY }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">Summary</span>
          </router-link>
        </li>
      </b-collapse>
    </div>
    <div class="pad-custm-20">
      <div v-b-toggle.collapse-settings class="collapse-header" @click="navBar_clicked">
        <img src="~@/assets/images/sidebar-icons/gearsix.png" class="iconshow-color">
        <img src="~@/assets/images/sidebar-icons/gearsix1.png" class="iconshow-white">
        Settings</div>
      <b-collapse id="collapse-settings" class="nav" v-model="visible[2]">
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.ACCOUNT }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">Account</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.TEAM }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">Team</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.BILLING }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon ihouse"></div>
            <span class="menu-title">Billing</span>
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link
            router-link-exact-active
            class="nav-link"
            :to="{ name: routers.BILLING }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon isaved"></div>
            <span class="menu-title">Integrations</span>
          </router-link>
        </li> -->
      </b-collapse>
    </div>
    <div class="pad-custm-20">
      <div v-b-toggle.collapse-help class="collapse-header" @click="navBar_clicked"> 
        <img src="~@/assets/images/sidebar-icons/headset.png" class="iconshow-color">
        <img src="~@/assets/images/sidebar-icons/headset1.png" class="iconshow-white">
        Help & Tutorials</div>
      <b-collapse id="collapse-help" class="nav" v-model="visible[3]">
        <li class="nav-item">
          <a
            class="nav-link"    
            href="https://www.helloscribe.ai/home/helloscribe-help-tutorials"
            target="_blank"
          >
            <div class="side-icon ituto"></div>
            <span class="menu-title">Tutorials</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"    
            href="https://www.helloscribe.ai/home/helloscribe-help-center"
            target="_blank"
          >
            <div class="side-icon ihelp"></div>
            <span class="menu-title">Help</span>
          </a>
        </li>
        <!-- <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: routers.ACCOUNT }"
            @click.native="sidebarInlineButtonClick"
          >
            <div class="side-icon isetting"></div>
            <span class="menu-title">Settings</span>
          </router-link>
        </li> -->
      </b-collapse>
    </div>
  </div>
</template>

<script>
import routerItems from '../../constants/routerItems';
import '../../directives/click-outside';
import * as auth from "../../services/AuthService";

export default {
  name: 'SidebarWriting',
  data() {
    return {
      collapses: [{ show: false }, { show: false }, { show: false }],
      imgProfile: this.$store.state.imgProfile,
      routers: routerItems,
      visible: [true, true, false, false],
      username: this.$store.state.username
    };
  },

  methods: {
    sidebarInlineButtonClick() {
      const sidebar = document.querySelector('#sidebar');
      if (sidebar) sidebar.classList.toggle('active');
    },
    outsideClicked() {
      const sidebar = document.querySelector('#sidebar');
      if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    },
    update_collapse() {
      let flg = document.body.classList.contains('sidebar-icon-only');
      if (flg) {
        this.visible = this.visible.map(el => false);
      } else {
        this.visible = [true, true, false, false];
      }
    },
    navBar_clicked() {
      if (document
            .querySelector("body")
            .classList.contains("sidebar-icon-only")) {
        document
          .querySelector("body")
          .classList.toggle("sidebar-icon-only");
      }
    },
    logout: function () {
      auth.logout();
      //const path = "/";
      //if (this.$route.path !== path) {
      this.$router.push({ name: this.$routerItems.LOGIN });
      //}
    },
  },
  created () {
    this.$root.$on('sidebar_toggled', this.update_collapse);
  },
  mounted () {
    this.update_collapse();
  }
};
</script>
<style lang="scss" scoped>
.collapse-header { padding: 15px 20px;color: white; }
</style>