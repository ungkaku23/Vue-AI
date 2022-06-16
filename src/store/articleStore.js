import articleApiUrl from '../constants/articleApiUrl';
import generateEmptyArticle from '../constants/emptyArticle';
import { http } from '../services/HttpService';
const articleStore = {
  namespaced: true,
  state: {
    articles: [generateEmptyArticle()],
    currentArticleIdx: 0,
    currentProject: 0,
  },
  getters: {
    getArticles: (state) => {
      return state.articles;
    },
    currentArticleInfo: (state) => {
      return state.articles[state.currentArticleIdx];
    },
    getCurrentArticleIdx: (state) => {
      return state.currentArticleIdx;
    },
    isSavedArticles: (state) => {
      let flag = true;
      state.articles.forEach((item) => {
        if (item.changed) {
          flag = false;
        }
      });
      return flag;
    },
  },
  mutations: {
    changeCurrentArticleIdx(state, idx) {
      state.currentArticleIdx = idx;
    },
    addNewEmptyArticle(state) {
      state.articles.push(generateEmptyArticle());
      state.currentArticleIdx = state.articles.length - 1;
    },
    addNewArticle(state, article) {
      let newArticles = [...state.articles];
      newArticles[state.currentArticleIdx] = article;
      state.articles = newArticles;
    },
    addArticle(state, article) {
      const i = state.articles.findIndex((item) => item._id === article._id);
      if (i >= 0) {
        state.articles.splice(i, 1);
      }
      state.articles.push({ ...article, changed: false });
    },
    removeArticle(state, idx) {
      state.articles.splice(idx, 1);
      if (state.articles.length === 0) {
        state.articles = [generateEmptyArticle()];
        state.currentArticleIdx = 0;
      }
    },
    updateArticle(state, { id, article, toDatabase = false }) {
      let oldArticles = [...state.articles];
      const i = oldArticles.findIndex((item) => item._id === id);
      oldArticles[i] = {
        ...oldArticles[i],
        ...article,
      };
      state.articles = oldArticles;
    },
    clearArticles(state) {
      state.articles = [];
    },
    setArticles(state, articles) {
      state.articles = articles;
    }
  },
  actions: {
    addArticle(ctx, article) {
      ctx.commit('addArticle', article);
    },
    addNewEmptyArticle(ctx) {
      ctx.commit('addNewEmptyArticle');
    },
    generateArticle(ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            data: { article },
          } = await http().post(articleApiUrl, info);
          const generatedData = {
            article,
            baseData: { ...info },
            cites: [],
          };

          const {
            data: { article: savedArticle },
          } = await http().post('/article', generatedData);

          ctx.commit('addNewArticle', savedArticle);
          return resolve(generatedData);
        } catch (err) {
          reject(err);
        }
      });
    },
    removeArticle(ctx, idx) {
      return new Promise(async (resolve, reject) => {
        try {
          ctx.commit('removeArticle', idx);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    updateArticle(ctx, article) {
      return new Promise(async (resolve, reject) => {
        let toDatabase = article.toDatabase;
        if (toDatabase) {
          try {
            await http().put('/article/' + article._id, article.article);
            resolve();
          } catch (err) {
            toDatabase = false;
            reject(err);
          }
        }
        ctx.commit('updateArticle', { ...article, toDatabase: toDatabase });
      });
    },
    clearArticles(ctx) {
      ctx.commit('clearArticles');
    },

    getAllDraftArticles(ctx, query) {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            data: { articles },
          } = await http().get('/articles', {
            params: { query: query },
          });
          resolve(articles);
        } catch (err) {
          reject(err);
        }
      });
    },

    changeCurrentArticleIdx(ctx, idx) {
      ctx.commit('changeCurrentArticleIdx', idx);
    },
    setArticles(ctx, articles) {
      ctx.commit('setArticles', articles);
    }
  },
};

export default articleStore;
