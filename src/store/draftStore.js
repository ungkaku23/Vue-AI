const draftStore = {
  namespaced: true,
  state: {
    headline: null,
    summary: null,
    answer: null,
    mediaPitch: null,
  },
  getters: {
    getHeadline: (state) => {
      return state.headline;
    },
    getSummary: (state) => {
      return state.summary;
    },
    getAnswer: (state) => {
      return state.answer;
    },
    getMediaPitch: (state) => {
      return state.mediaPitch;
    },
  },
  mutations: {
    setHeadline(state, headline) {
      state.headline = { ...headline };
    },
    setSummary(state, summary) {
      state.summary = { ...summary };
    },
    setAnswer(state, answer) {
      state.answer = { ...answer };
    },
    setMediaPitch(state, mediaPitch) {
      state.mediaPitch = { ...mediaPitch };
    },

    resetHeadline(state) {
      state.headline = null;
    },
    resetAnswer(state) {
      state.answer = null;
    },
    resetSummary(state) {
      state.summary = null;
    },
    resetMediaPitch(state) {
      state.mediaPitch = null;
    },
  },
  actions: {
    setHeadline(ctx, headline) {
      ctx.commit('setHeadline', headline);
    },
    setSummary(ctx, summary) {
      ctx.commit('setSummary', summary);
    },
    setAnswer(ctx, answer) {
      ctx.commit('setAnswer', answer);
    },
    setMediaPitch(ctx, mediaPitch) {
      ctx.commit('setMediaPitch', mediaPitch);
    },

    resetHeadline(ctx) {
      ctx.commit('resetHeadline');
    },
    resetSummary(ctx) {
      ctx.commit('resetSummary');
    },
    resetAnswer(ctx) {
      ctx.commit('resetAnswer');
    },
    resetMediaPitch(ctx) {
      ctx.commit('resetMediaPitch');
    },
  },
};

export default draftStore;
