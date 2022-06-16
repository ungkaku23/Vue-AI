import Vue from 'vue';
import Router from 'vue-router';
import routerItems from '../constants/routerItems';

import LandingLayout from '../layout/landing-layout';
// import LandingOldPage from '../pages/samples/general-pages/landing-page'
import layout from '../layout';

Vue.use(Router);

//const isLoggedIn = true;
import * as auth from '../services/AuthService';
import store from '../store';
/*
1. If the user is logged in, then we check if the user has canceled their subscription or if they have not subscribed yet. If they have canceled their subscription or they have not subscribed yet, then we redirect them to the billing page.
2. If the user is not logged in, then we redirect them to the login page with a query string that contains the redirect path.
*/

function authAndBillingNeeded(to, from, next) {
  if (auth.isLoggedIn()) {
    const canceled = auth.getCanceled();
    const subscribed = auth.getSubStatus();
    const createdAtStr = auth.getCreatedAt();

    const now = new Date();
    const createdAt = new Date(createdAtStr);
    const diffTime = Math.abs(now - createdAt);
    const trialDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (
      (canceled || (!subscribed && trialDays > 7)) &&
      to.name !== routerItems.BILLING
    ) {
      next({
        name: routerItems.BILLING,
      });
    } else {
      next();
    }
  } else {
    next({
      name: routerItems.LOGIN,
      query: {
        redirect: to.fullPath,
      },
    });
  }
}

function authNeeded(to, from, next) {
  if (auth.isLoggedIn()) {
    next();
  } else {
    next({
      name: routerItems.LOGIN,
      query: {
        redirect: to.fullPath,
      },
    });
  }
}
export default new Router({
  linkExactActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  hashbang: false,
  routes: [
    /* DASHBOARD */
    {
      path: '/',
      redirect: { name: routerItems.LOGIN },
    },
    {
      path: '/saved-drafts',
      component: layout,
      beforeEnter: authNeeded,
      children: [
        {
          path: 'projects',
          name: routerItems.EXPLORER_PROJECTS,
          component: () => import('@/pages/explorers/ExplorerProjects'),
        },
        {
          path: 'notes',
          name: routerItems.EXPLORER_NOTES,
          component: () => import('@/pages/explorers/ExplorerNotes'),
        },
        {
          path: 'headlines',
          name: routerItems.EXPLORER_HEADLINES,
          component: () => import('@/pages/explorers/ExplorerHeadlines'),
        },
        {
          path: 'articles',
          name: routerItems.EXPLORER_ARTICLES,
          component: () => import('@/pages/explorers/ExplorerArticles'),
        },
        {
          path: 'messages',
          name: routerItems.EXPLORER_MESSAGES,
          component: () => import('@/pages/explorers/ExplorerMessages'),
        },
        {
          path: 'brainstorms',
          name: routerItems.EXPLORER_BRAINSTORMS,
          component: () => import('@/pages/explorers/ExplorerBrainstorms'),
        },
        {
          path: 'media-pitches',
          name: routerItems.EXPLORER_MEDIA_PITCHES,
          component: () => import('@/pages/explorers/ExplorerMediaPitches'),
        },
        {
          path: 'copywritings',
          name: routerItems.EXPLORER_COPYWRITINGS,
          component: () => import('@/pages/explorers/ExplorerCopywritings'),
        },
        {
          path: 'quotes',
          name: routerItems.EXPLORER_QUOTES,
          component: () => import('@/pages/explorers/ExplorerQuotes'),
        },
        {
          path: 'questions',
          name: routerItems.EXPLORER_QUESTIONS,
          component: () => import('@/pages/explorers/ExplorerQuestions'),
        },
        {
          path: '',
          name: routerItems.SAVED_DRAFTS,
          component: () => import('@/pages/dashboard/SavedDrafts'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      //Protect This Route If User Not LoggedIn
      children: [
        {
          path: 'help-tutorials',
          name: routerItems.HELP_TUTORIALS,
          beforeEnter: authNeeded,
          component: () => import('@/pages/dashboard/HelpTutorials'),
        },
        {
          path: 'dashboard',
          name: routerItems.DASHBOARD,
          beforeEnter: authNeeded,
          component: () => import('@/pages/dashboard'),
        },
        {
          path: 'project-settings/:id',
          name: routerItems.PROJECT_SETTINGS,
          beforeEnter: authNeeded,
          component: () => import('@/pages/projects/ProjectSettings'),
        },
        {
          path: 'project-overview/:id',
          name: routerItems.PROJECT_OVERVIEW,
          beforeEnter: authNeeded,
          component: () => import('@/pages/projects/ProjectOverview'),
        },
        {
          path: 'share/:id',
          name: routerItems.TASK_SHARE,
          // beforeEnter: authNeeded,
          component: () => import('@/pages/sharing/share'),
        },
      ],
    },
    /* Writing */
    {
      path: '/writing',
      component: layout,
      //Protect This Route If User Not LoggedIn
      beforeEnter: authAndBillingNeeded,
      children: [
        {
          path: 'article',
          name: routerItems.ARTICLE,
          component: () => import('@/pages/writing/Article'),
        },
        {
          path: 'headline',
          name: routerItems.HEADLINE,
          component: () => import('@/pages/writing/Headline'),
        },
        {
          path: 'summary',
          name: routerItems.SUMMARY,
          component: () => import('@/pages/writing/Summary'),
        },
        {
          path: 'brainstorm',
          name: routerItems.BRAINSTORM,
          component: () => import('@/pages/writing/Brainstorm'),
        },
        {
          path: 'media-pitch',
          name: routerItems.MEDIA_PITCH,
          component: () => import('@/pages/writing/MediaPitch'),
        },
        {
          path: 'promote',
          name: routerItems.PROMOTE,
          component: () => import('@/pages/writing/Promote'),
        },
        {
          path: 'quote',
          name: routerItems.QUOTE,
          component: () => import('@/pages/writing/Quote'),
        },
        {
          path: 'question',
          name: routerItems.QUESTION,
          component: () => import('@/pages/writing/Questions'),
        },
        {
          path: 'messaging',
          name: routerItems.MESSAGING,
          component: () => import('@/pages/writing/Messaging'),
        },
        {
          path: 'outreach',
          name: routerItems.OUTREACH,
          component: () => import('@/pages/writing/Summary'),
        },
        {
          path: 'social',
          name: routerItems.SOCIAL,
          component: () => import('@/pages/writing/Social'),
        },
        {
          path: 'join-collaborator/:token',
          name: routerItems.JOIN_COLLABORATOR,
          component: () => import('@/pages/writing/JoinCollaborator'),
        },
      ],
    },
    {
      path: '/subscription',
      component: layout,
      //Protect This Route If User Not LoggedIn
      beforeEnter: authNeeded,
      children: [
        {
          path: 'success',
          name: routerItems.SUBSCRIPTION_SUCCESS,
          component: () => import('@/pages/account/success.vue'),
        },
        {
          path: 'success-upgrade',
          name: routerItems.SUBSCRIPTION_SUCCESS_UPGRADE,
          component: () => import('@/pages/account/success-upgrade.vue'),
        },
      ],
    },
    /* ACCOUNT */
    {
      path: '/account',
      component: layout,
      //Protect This Route If User Not LoggedIn
      children: [
        {
          path: 'profile',
          name: routerItems.ACCOUNT,
          beforeEnter: authNeeded,
          component: () => import('@/pages/account/profile.vue'),
        },
        {
          path: 'billing',
          name: routerItems.BILLING,
          beforeEnter: authAndBillingNeeded,
          component: () => import('@/pages/account/billing.vue'),
        },
        {
          path: 'team',
          name: routerItems.TEAM,
          beforeEnter: authAndBillingNeeded,
          component: () => import('@/pages/account/team.vue'),
        },
        {
          path: 'password',
          name: routerItems.PASSWORD,
          beforeEnter: authNeeded,
          component: () => import('@/pages/account/password.vue'),
        },
      ],
    },
    /* Pricing */
    {
      path: '/upgrade',
      component: layout,
      beforeEnter: authNeeded,
      children: [
        {
          path: '',
          name: routerItems.UPGRADE,
          component: () => import('@/pages/samples/e-commerce/upgrade.vue'),
        },
      ],
    },
    {
      path: '/join-team/:token?',
      component: {
        render(c) {
          return c('router-view');
        },
      },
      children: [
        {
          path: '',
          name: routerItems.JOIN_TEAM,
          component: () => import('@/pages/samples/auth-pages/join-team.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: LandingLayout,
      children: [
        {
          path: 'login/:invitation?',
          name: routerItems.LOGIN,
          component: () => import('@/pages/samples/auth-pages/login'),
          beforeEnter: (to, from, next) => {
            if (auth.isLoggedIn()) {
              if (!to.params.invitation) {
                next({ name: routerItems.EXPLORER_PROJECTS });
              } else {
                next();
              }
            } else {
              next();
            }
          },
        },
        {
          path: 'register/:invitation?',
          name: routerItems.REGISTER,
          component: () => import('@/pages/samples/auth-pages/register'),
          beforeEnter: (to, from, next) => {
            if (auth.isLoggedIn()) {
              if (!to.params.invitation) {
                next({ name: routerItems.EXPLORER_PROJECTS });
              } else {
                next();
              }
            } else {
              next();
            }
          },
        },
        {
          path: 'google-signup',
          name: routerItems.GOOGLE_REGISTER,
          component: () => import('@/pages/samples/auth-pages/google-signup'),
          beforeEnter: (to, from, next) => {
            if (auth.isLoggedIn()) {
              if (!to.params.invitation) {
                next({ name: routerItems.EXPLORER_PROJECTS });
              } else {
                next();
              }
            } else {
              next();
            }
          },
        },
        {
          path: 'forgot-password',
          name: routerItems.FORGOT_PASSWORD,
          beforeEnter: (to, from, next) => {
            if (!auth.isLoggedIn()) {
              next();
            } else {
              next({ name: routerItems.EXPLORER_PROJECTS });
            }
          },
          component: () => import('@/pages/samples/auth-pages/forgot-password'),
        },
        {
          path: 'resetpassword/:token',
          name: routerItems.RESET_PASSWORD,
          component: () => import('@/pages/samples/auth-pages/reset-password'),
          //Protect This Route If User Not LoggedIn
          beforeEnter: (to, from, next) => {
            if (!auth.isLoggedIn()) {
              next();
            } else {
              next({ name: routerItems.EXPLORER_PROJECTS });
            }
          },
        },
        {
          path: 'emailconfirmation/:token',
          name: routerItems.EMAIL_CONFIRMATION,
          component: () =>
            import('@/pages/samples/auth-pages/email-confirmation'),
        },
        {
          path: 'invitation/:token',
          name: routerItems.INVITATION,
          component: () => import('@/pages/samples/auth-pages/invitation'),
        },
      ],
    },
    {
      path: '/error-pages',
      component: {
        render(c) {
          return c('router-view');
        },
      },
      children: [
        {
          path: 'error-404',
          name: routerItems.ERROR_404,
          component: () => import('@/pages/samples/error-pages/error-404'),
        },
      ],
    },
    /* ERROR PAGE */
    {
      path: '*',
      redirect: '/error-404',
      component: {
        render(c) {
          return c('router-view');
        },
      },
      children: [
        {
          path: 'error-404',
          component: () => import('@/pages/samples/error-pages/error-404'),
        },
      ],
    },
  ],
});
