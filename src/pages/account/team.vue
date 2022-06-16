<template>
    <div>
        <section class="users-table mb-4">
            <Header/>
            <div class="profilecenterbox">
                <div class="text-center pb-4">
                    <Breadcrumb />
                </div>
                <!-- TABLE -->
                <div class="grid-margin stretch-card mb-0">
                    <div class="card border-0">
                        <div class="card-body pl-0 pr-0 pb-0">
                            <!-- <h4 class="card-title">Manage Members</h4> -->
                            <button
                                type="button"
                                :disabled="!isEnabledInvite"
                                class="btn btn-primary btn-icon-text pull-right"
                                @click="openAddModal"
                            >
                                <i class="mdi mdi-account-multiple-plus"></i>
                                Invite a Member
                            </button>
                            <table>
                                <thead>
                                    <input
                                        v-model="searchQuery"
                                        class="form-control float-right mb-1"
                                        id="tableSearch"
                                        type="text"
                                        placeholder="Search"
                                    />
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(
                                            item, index
                                        ) in filteredRows.slice(
                                            pageStart,
                                            pageStart + countOfPage
                                        )"
                                        :key="`user-${index}`"
                                    >
                                        <td class="d-none">{{ item._id }}</td>
                                        <td>{{ item.user.username }}</td>
                                        <td>{{ item.user.email }}</td>
                                        <td>
                                            <span class="badge badge-info">
                                                {{ item.access }}</span
                                            >
                                        </td>
                                        <td>
                                            <a
                                                @click="openEditModal(item)"
                                                class="edit"
                                                href="#"
                                                title="edit"
                                                data-toggle="tooltip"
                                            >
                                                <i
                                                    class="mdi mdi-table-edit"
                                                ></i>
                                            </a>
                                            <a
                                                href="#"
                                                class="delete"
                                                title="Delete"
                                                data-toggle="tooltip"
                                                @click="openDeleteModal(item)"
                                                ><i
                                                    class="
                                                        mdi mdi-delete-forever
                                                    "
                                                ></i
                                            ></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end">
                                    <li
                                        class="page-item"
                                        v-bind:class="{
                                            disabled: currPage === 1,
                                        }"
                                        @click.prevent="setPage(currPage - 1)"
                                    >
                                        <a class="page-link" href="">Prev</a>
                                    </li>
                                    <li
                                        class="page-item"
                                        v-for="n in totalPage"
                                        :key="n"
                                        v-bind:class="{
                                            active: currPage === n,
                                        }"
                                        @click.prevent="setPage(n)"
                                    >
                                        <a class="page-link" href="">{{ n }}</a>
                                    </li>
                                    <li
                                        class="page-item"
                                        v-bind:class="{
                                            disabled: currPage === totalPage,
                                        }"
                                        @click.prevent="setPage(currPage + 1)"
                                    >
                                        <a class="page-link" href="">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div
                    class="spinner-border text-primary"
                    role="status"
                    v-if="loadingTable"
                >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </section>
        <!-- ADD MEMBER MODAL -->
        <add-new-member-modal></add-new-member-modal>
        <!-- END MEMBER USER MODAL -->
        <!-- EDIT MEMBER MODAL -->
        <div v-if="editModal.myModal" class="users-modal">
            <transition name="model">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <span>Update User</span>
                                    <button
                                        type="button"
                                        class="close"
                                        @click="editModal.myModal = false"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <span
                                        v-if="editModal.errorMessage"
                                        class="text-danger"
                                        >{{ editModal.errorMessage }}</span
                                    >
                                    <form
                                        class="custom-form"
                                        v-on:submit.prevent="editUser"
                                    >
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="editModal.name"
                                                :class="{
                                                    'is-invalid':
                                                        submitted &&
                                                        $v.editModal.name
                                                            .$error,
                                                }"
                                            />
                                            <div
                                                v-if="
                                                    submitted &&
                                                    $v.editModal.name.$error
                                                "
                                                class="invalid-feedback"
                                            >
                                                <span
                                                    v-if="
                                                        !$v.editModal.name
                                                            .required
                                                    "
                                                    >Name is required</span
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="editModal.email"
                                                :class="{
                                                    'is-invalid':
                                                        submitted &&
                                                        $v.editModal.email
                                                            .$error,
                                                }"
                                            />
                                            <div
                                                v-if="
                                                    submitted &&
                                                    $v.editModal.email.$error
                                                "
                                                class="invalid-feedback"
                                            >
                                                <span
                                                    v-if="
                                                        !$v.editModal.email
                                                            .required
                                                    "
                                                    >Email is required</span
                                                >
                                                <span
                                                    v-if="
                                                        !$v.editModal.email
                                                            .email
                                                    "
                                                    >Email is invalid</span
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="role">Role:</label>
                                            <select
                                                class="form-control"
                                                id="roles"
                                                name="roles"
                                                v-model="editModal.role"
                                            >
                                                <option
                                                    v-for="item in editModal.roles"
                                                    :value="item"
                                                    v-bind:key="item"
                                                >
                                                    {{ item }}
                                                </option>
                                            </select>
                                        </div>
                                        <br />
                                        <div align="center" v-if="!loading">
                                            <input
                                                type="submit"
                                                class="
                                                    btn
                                                    btn-outline-success
                                                    btn-icon-text
                                                "
                                                v-model="editModal.actionButton"
                                            />
                                            <div v-if="loading">
                                                <span
                                                    class="
                                                        spinner-grow
                                                        spinner-grow-sm
                                                        btn-outline-success
                                                    "
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Loading...
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <edit-member-modal 
            @updateMembers="updateMembers"
            ref="editMemberModal"
        >
        </edit-member-modal>
        <!-- END EDIT MEMBER MODAL -->
        <delete-member-modal 
            :memberInfo="deleteModal"
            @deleteMember="deleteMember">
        </delete-member-modal>
    </div>
</template>
<script>
import Breadcrumb from "./breadcrumb";
import { http } from "../../services/HttpService";
import { required, email } from "vuelidate/lib/validators";
import * as paymentService from "../../services/PaymentService";
import AddNewMemberModal from "../../components/common/modal/AddNewMemberModal.vue";
import DeleteMemberModal from "../../components/common/modal/DeleteMemberModal.vue";
import EditMemberModal from "../../components/common/modal/EditMemberModal.vue";
import { mapGetters } from "vuex";
import Header from "./header.vue";

export default {
    name: "team",
    components: {
        Breadcrumb,
        Header,
        AddNewMemberModal,
        DeleteMemberModal,
        EditMemberModal
    },
    data() {
        return {
            users: [],
            searchQuery: "",
            countOfPage: 8,
            currPage: 1,
            loading: false,
            loadingTable: false,
            isEnabledInvite: false,
            addModal: {
                myModal: false,
                actionButton: "Send Invitation",
                email: null,
                name: null,
                role: null,
                roles: ["user", "owner", "admin"],
                errorMessage: null,
            },
            editModal: {
                myModal: false,
                actionButton: "Update",
                id: null,
                userId: null,
                email: null,
                name: null,
                role: null,
                roles: ["user", "owner", "admin"],
                errorMessage: null,
            },
            deleteModal: {
                myModal: false,
                id: null,
                name: null,
                actionButton: "Delete User",
                errorMessage: null,
            },
            submitted: false,
        };
    },
    validations: {
        addModal: {
            email: { required, email },
            name: { required },
            role: { required },
        },
        editModal: {
            email: { required, email },
            name: { required },
        },
    },
    methods: {
        async getSubscriptionInformation() {
            const stripeCustomerId = this.$store.state.stripeCustomerId;
            paymentService.getSubscriptionInformation(stripeCustomerId).then(
                function (response) {
                    if (response) {
                        this.isEnabledInvite = response.data.subscriptionInfo.product_id === this.$config.productTeamId
                    }
                }.bind(this)
            );
        },
        openEditModal: function (item) {
            this.editModal.id = item._id;
            this.editModal.userId = item.user._id;
            this.editModal.name = item.user.username;
            this.editModal.email = item.user.email;
            this.editModal.role = item.access;

            this.$refs.editMemberModal.setFormValue(this.editModal);
            this.$bvModal.show('EditMemberModal');
        },
        openAddModal: function () {
            this.$bvModal.show('AddNewMemberModal');
        },
        openDeleteModal: function (item) {
            this.deleteModal.id = item.user._id;
            this.deleteModal.name = item.username;

            this.$bvModal.show('DeleteMemberModal');
        },
        //Delete Member
        deleteMember: function () {
            let temp = Object.assign([], this.users);
            this.users = this.users.filter(o => o.user._id !== this.deleteModal.id);
        },
        updateMembers() {
            http()
                .get("/members")
                .then(
                    function (response) {
                        console.log("members: ", response);
                        if (response) {
                            this.users = response.data.membersOfAccount || [];
                        }
                        this.loadingTable = false;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },
        //Pagination Table
        setPage: function (idx) {
            if (idx <= 0 || idx > this.totalPage) {
                return;
            }
            this.currPage = idx;
        },
    },
    //Fetch Members From API
    async beforeMount() {
        this.loadingTable = true;
        await this.getSubscriptionInformation();
        this.updateMembers();
    },
    /* Handling table rows */
    computed: {
        ...mapGetters({
            userInfo: "getCurrentUser",
        }),
        filteredRows() {
            return this.users.filter((row) => {
                const name = row.user.username.toString().toLowerCase();
                const email = row.user.email.toLowerCase();
                const searchTerm = this.searchQuery.toLowerCase();

                return email.includes(searchTerm) || name.includes(searchTerm);
            });
        },
        //Pagination
        pageStart: function () {
            return (this.currPage - 1) * this.countOfPage;
        },
        totalPage: function () {
            return Math.ceil(this.filteredRows.length / this.countOfPage);
        },
    },
};
</script>
