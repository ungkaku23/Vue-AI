<template>
    <b-navbar id="template-header" class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex justify-content-between flex-row" toggleable="false">
        <div class="btn-toggle-menu">
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" id="toggleMenuButton" @click="toggleMobileSidebar()">
                <span class="icon-menu"></span>
            </button>
            <!-- <img src="~@/assets/images/icons/mobilesearch.png"> -->
        </div>
        <a href="" class="toplogo-mobile"><img src="~@/assets/images/icons/mobilelogo.png"></a>
        <a @click="showCreateProjectModal" class="addproject-mobile"><img src="~@/assets/images/icons/addprojectmobile.png"></a>
        <div class="text-center navbar-brand-wrapper d-flex align-items-center">
            <router-link
                class="navbar-brand brand-logo"
                :to="{ name: routers.DASHBOARD }"
            >
                <img src="@/assets/logo-5.png" alt="logo" class="logo-dark" />
                <img src="" alt="logo-light" class="logo-light" />
            </router-link>
            <router-link
                class="navbar-brand brand-logo-mini"
                :to="{ name: routers.DASHBOARD }"
                ><img src="@/assets/logo-mini-5.png" alt="logo"
            /></router-link>
            <button
                class="navbar-toggler navbar-desktop-toggler align-self-center"
                type="button"
                data-toggle="minimize"
                @click="toggleSidebar()"
            >
                <img
                    src="~@/assets/images/sidebar-icons/caretcircle.png"
                    class="toggleimg-left"
                />
                <img
                    src="~@/assets/images/sidebar-icons/caretcircle1.png"
                    class="toggleimg-right"
                />
            </button>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
            <div class="breadcrumb-main" v-if="project === null">
                <h3>Projects</h3>
                <p class="subpage">Main</p>
                <p class="xsubpage">Projects</p>
                <p class="xxsubpage-">Projects</p>
            </div>
            <div class="breadcrumb-main" v-if="project !== null">
                <h3>{{ project?project.name:'' }}</h3>
                <b-dropdown size="sm" right>
                    <b-dropdown-item-button
                        variant="primary"
                        v-on:click="renameProject"
                    >
                        <div class="d-flex align-items-center">
                            <img
                                src="~@/assets/images/icons/penciltrash-icon-bread.png"
                            />
                            Rename
                        </div>
                    </b-dropdown-item-button>
                    <b-dropdown-item-button
                        variant="primary"
                        v-on:click="deleteProject"
                    >
                        <div class="d-flex align-items-center">
                            <img
                                src="~@/assets/images/icons/trash-icon-bread.png"
                            />
                            Delete
                        </div>
                    </b-dropdown-item-button>
                </b-dropdown>
                <p class="subpage">Main</p>
                <p class="xsubpage">Projects</p>
                <p class="xxsubpage-">Activities</p>
                <p class="xxsubpage-">{{ project?project.name:'' }}</p>
            </div>
            <ul class="navbar-nav navbar-nav-right">
                <!-- <a href=""
                    ><img
                        src="~@/assets/images/icons/queryicon.png"
                        class="staticicons"
                /></a>
                <a href=""
                    ><img
                        src="~@/assets/images/icons/settingtop.png"
                        class="staticicons"
                /></a>
                <a href=""
                    ><img
                        src="~@/assets/images/icons/alertbell.png"
                        class="staticicons"
                /></a> -->
                <b-nav-item-dropdown right class="preview-list user-dropdown navbar-dropdown">
                    <template slot="button-content" class="p-0 m-0">
                        <div class="nav-link count-indicator message-dropdown p-0 m-0 ml-1">
                            <img class="user-avatar rounded-circle" :src="profileImgPath()" alt="Profile image"/>
                            <span class="font-weight-normal text-capitalize">
                                {{
                                    userInfo.username
                                        ? userInfo.username
                                        : "User"
                                }}</span
                            >
                        </div>
                    </template>
                    <b-dropdown-item>
                        <div
                            class="dropdown-header text-center mx-auto d-block"
                        >
                            <img
                                class="img-md rounded-circle"
                                :src="profileImgPath()"
                                alt="Profile image"
                                width="80px"
                            />
                            <p class="mb-1 mt-2">
                                <i
                                    class="
                                        dropdown-item-icon
                                        ti-briefcase
                                        text-dark
                                    "
                                ></i>
                                {{
                                    userInfo.username
                                        ? userInfo.username
                                        : "User"
                                }}
                            </p>
                            <p class="font-weight-light text-muted mb-0">
                                {{ userInfo.email }}
                            </p>
                        </div>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link
                            :to="{ name: $routerItems.ACCOUNT }"
                            class="preview-item d-flex align-items-center w-100"
                        >
                            <i
                                class="dropdown-item-icon icon-user text-dark"
                            ></i>
                            Profile
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item v-on:click.prevent="logout()">
                        <a class="preview-item d-flex align-items-center">
                            <i
                                class="dropdown-item-icon icon-power text-dark"
                            ></i
                            >Sign Out
                        </a>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </ul>
        </div>
        <rename-project-modal
            :project="project"
            @rename_finished="rename_finished"
        />
        <create-project-modal />
    </b-navbar>
</template>

<script>
import routerItems from "../../constants/routerItems";
import * as auth from "../../services/AuthService";
import { mapGetters } from "vuex";
import { http } from "../../services/HttpService";
import RenameProjectModal from "../../components/common/modal/RenameProjectModal.vue";
import CreateProjectModal from "../../pages/projects/CreateProjectModal.vue";

export default {
    name: "app-header",
	components: {
		RenameProjectModal,
        CreateProjectModal
	},
    data() {
        return {
            tenants: [],
            currentAccountName: null,
            imgProfile: this.$store.state.imgProfile,
            routers: routerItems,
            hideSidebar: false,
            project: null,
        };
    },
    methods: {
        logout: function () {
            auth.logout();
            //const path = "/";
            //if (this.$route.path !== path) {
            this.$router.push({ name: this.$routerItems.LOGIN });
            //}
        },
        profileImgPath: function () {
            if (this.imgProfile) {
                return this.imgProfile;
            } else {
                return require("@/assets/images/faces/placeholder-avatar.jpg");
            }
        },
        toggleSidebar: function () {
            document
                .querySelector("body")
                .classList.toggle("sidebar-icon-only");
            this.hideSidebar = document
                .querySelector("body")
                .classList.contains("sidebar-icon-only");
            this.$root.$emit("sidebar_toggled");
        },
        toggleMobileSidebar: function () {
            document.querySelector("#sidebar").classList.toggle("active");
        },
        project_entered(project) {
            this.project = project;
        },
        project_leaved() {
            this.project = null;
        },
        deleteProject() {
            this.$bvModal
                .msgBoxConfirm(
                    "Do you want to delete this item?",
                    {
                        title: "Please Confirm",
                        size: "sm",
                        buttonSize: "sm",
                        okVariant: "danger",
                        okTitle: "YES",
                        cancelTitle: "NO",
                        cancelVariant: "primary",
                        footerClass: "p-2",
                        hideHeaderClose: false,
                        centered: true,
                    }
                )
                .then(async (value) => {
                    if (value) {
                        try {
                            await http().delete("project/" + this.project._id);
                            this.$router.push("/saved-drafts/projects");
                        } catch (err) {}
                    }
                })
                .catch((err) => {
                    // An error occurred
                });
        },
        renameProject() {
            this.$bvModal.show("RenameProjectModal");
        },
		rename_finished(project) {
			this.$bvModal.hide("RenameProjectModal");
			this.project = project;
			this.$forceUpdate();
		},
        showCreateProjectModal() {
            this.$bvModal.show('CreateProjectModal');
        },
    },
    mounted() {
        this.hideSidebar = document
            .querySelector("body")
            .classList.contains("sidebar-icon-only");
    },
    created() {
        this.$root.$on("project_entered", this.project_entered);
        this.$root.$on("project_list", this.project_leaved);
    },
    beforeDestroy() {
        this.$root.$off("project_entered", this.project_entered);
        this.$root.$off("project_list", this.project_leaved);
    },
    computed: {
        ...mapGetters({
            userInfo: "getCurrentUser",
        }),
    },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
.user-avatar {
    width: 28px;
    height: 28px;
    margin-right: 10px !important;
    @media (max-width: $mobile-size) {
        width: 20px;
        height: 20px;
        margin-right: 5px !important;
    }
}
.navbar-toggler {
    color: white;
}
</style>
