import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from '../services/AuthService';
import { http } from '../services/HttpService';
import articleStore from './articleStore';
import draftStore from './draftStore';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    projects: [],
    isLoggedIn: false,
    apiUrl: `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.VUE_APP_API_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}/api`,
    accountId: null,
    canceled: null,
    confirmed: null,
    createdAt: null,
    email: null,
    plan: null,
    role: null,
    currentProject: null,
    currentProjectName: null,
    currentProjectId: null,
    stripeCustomerId: null,
    notificationSubscribed: null,
    subscribed: null,
    subscription: null,
    token: null,
    updatedAt: null,
    username: null,
    input_language: null,
    output_language: null,
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if (state.isLoggedIn) {
        state.accountId = auth.getSession().accountId;
        state.canceled = auth.getSession().canceled;
        state.confirmed = auth.getSession().confirmed;
        state.createdAt = auth.getSession().createdAt;
        state.email = auth.getSession().email;
        state.plan = auth.getSession().plan;
        state.role = auth.getSession().role;
        state.currentProject = auth.getSession().currentProject;
        if (auth.getSession().currentProject) {
          state.currentProjectId = auth.getSession().currentProject._id;
          state.currentProjectName = auth.getSession().currentProject.name;
        } else {
          state.currentProjectId = null;
          state.currentProjectName = null;
        }
        state.notificationSubscribed = auth.getSession().notificationSubscribed;
        state.stripeCustomerId = auth.getSession().stripeCustomerId;
        state.subscribed = auth.getSession().subscribed;
        state.subscription = auth.getSession().subscription;
        state.token = auth.getSession().token;
        state.updatedAt = auth.getSession().updatedAt;
        state.username = auth.getSession().username;
      } else {
        state.accountId = null;
        state.canceled = null;
        state.confirmed = null;
        state.createdAt = null;
        state.email = null;
        state.plan = null;
        state.role = null;
        state.currentProject = null;
        state.currentProjectId = null;
        state.currentProjectName = null;
        state.stripeCustomerId = null;
        state.subscribed = null;
        state.notificationSubscribed = null;
        state.subscription = null;
        state.token = null;
        state.updatedAt = null;
        state.username = null;
      }
    },
    confirmEmail(state) {
      state.isLoggedIn = auth.isLoggedIn();
    },
    updateCurrentProject(state, project) {
      console.log(project.name);
      state.currentProject = project;
      state.currentProjectId = project._id;
      state.currentProjectName = project.name;
    },
    updateLanguage(state) {
      state.input_language = localStorage.getItem('input_language')?localStorage.getItem('input_language'):'EN-US';
      state.output_language = localStorage.getItem('output_language')?localStorage.getItem('output_language'):'EN-US';
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate');
    },
    confirmEmail(context) {
      context.commit('confirmEmail');
    },
    async updateCurrentProject(context, projectId) {
      try {
        console.log(projectId);
        const { data } = await http().put('/user-current-project', {
          projectId: projectId,
        });
        auth.updateSession({ currentProject: data.currentProject });
        return data.currentProject;
      } catch (err) {
        return { message: err.message };
      }
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return {
        accountId: state.accountId,
        canceled: state.canceled,
        confirmed: state.confirmed,
        createdAt: state.createdAt,
        email: state.email,
        plan: state.plan,
        role: state.role,
        currentProject: state.currentProject,
        currentProjectId: state.currentProjectId,
        currentProjectName: state.currentProjectName,
        stripeCustomerId: state.stripeCustomerId,
        notificationSubscribed: state.notificationSubscribed,
        subscribed: state.subscribed,
        subscription: state.subscription,
        token: state.token,
        updatedAt: state.updatedAt,
        username: state.username,
      };
    },
    getSubscribedStatus: (state) => {
      return state.subscribed;
    },
    getCurrentProjectName: (state) => {
      return state.currentProjectName;
    },
  },
  modules: {
    articleStore: articleStore,
    draftStore: draftStore,
  },
});
