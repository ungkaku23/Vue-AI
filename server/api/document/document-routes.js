const express = require('express');
const router = express.Router();
//Import Controller
const controller = require('./document-controller');
const auth = require('../../services/auth-service');

// Generate article
router.post(
  '/doc/v2/generate-article',
  auth.requireLogin,
  controller.generateArticleV2
);

router.post(
  '/doc/generate-article-draft',
  auth.requireLogin,
  controller.generateArticleDraft
);

router.post(
  '/doc/generate-article-outline',
  auth.requireLogin,
  controller.generateArticleOutline
);

router.post(
  '/doc/generate-article-free',
  auth.requireLogin,
  controller.generateArticleFree
);

// Generate date
// router.post('/doc/generate-date', auth.requireLogin, controller.generateDate);

// Generate Media Pitch
router.post(
  '/doc/generate-media-pitch',
  auth.requireLogin,
  controller.generateMediaPitch
);

/* This is a route that is used to generate a message. */
router.post(
  '/doc/generate-message',
  auth.requireLogin,
  controller.generateMessage
);

/* This route is used to generate a social media post. */
router.post(
  '/doc/generate-social-media',
  auth.requireLogin,
  controller.generateSocialMedia
);

/* This route that is used to generate a message. */
router.post(
  '/doc/rewrite-article',
  auth.requireLogin,
  controller.rewriteArticle
);

/* This route is used to generate a headline. */
router.post(
  '/doc/generate-headline',
  auth.requireLogin,
  controller.generateHeadline
);
/* This is used to generate a Brainstorm. */
router.post(
  '/doc/generate-answer/:type',
  auth.requireLogin,
  controller.generateAnswer
);
/* This is a route that is used to generate a domain. */
router.post(
  '/doc/generate-domain',
  auth.requireLogin,
  controller.generateDomain
);
/* This is a route that is used to generate a summary. */
router.post(
  '/doc/generate-summary',
  auth.requireLogin,
  controller.generateSummary
);

/* This is a route that is used to generate a quote. */
router.post(
'/doc/generate-quote', 
auth.requireLogin, 
controller.generateQuote
);

/* This is a route that is used to generate Ad Copy */
router.post(
  '/doc/generate-promote',
  auth.requireLogin,
  controller.generatePromote
);
/* This is a route that is used to generate a question. */
router.post(
  '/doc/generate-question',
  auth.requireLogin,
  controller.generateQuestion
);
/* This is a route that is used to generate a headline. */
router.post(
  '/doc/generate-headline',
  auth.requireLogin,
  controller.generateHeadline
);

/* This is a route that is the same as generate Semantic Scholar Output. */
router.post(
  '/doc/academia-info',
  auth.requireLogin,
  controller.getAcademiaInfo
);
/* This is a route that is used to generate a Google Search. */
router.post(
  '/doc/google-info',
  auth.requireLogin,
  controller.getGoogleSearchInfo
);
/* These are routes that are used to generate a DuckDuck Go Search. */
router.post('/doc/news-info', auth.requireLogin, controller.getNewsInfo);
router.post('/doc/fact-info', auth.requireLogin, controller.getFactInfo);
router.post(
  '/doc/duck-duck-info',
  auth.requireLogin,
  controller.getDuckDuckGoInfo
);

/* This is a route that is used to generate Semantic Scholar info. */
router.post(
  '/doc/semantic-scholar-academic-info',
  auth.requireLogin,
  controller.getSemanticScholarAcademicInfo
);

/* This is a route that is used to invite a collaborator to a document. */
router.post(
  '/doc/invite-collaborator',
  auth.requireLogin,
  controller.inviteCollaborator
);
/* This is a route that is used to validate a collaborator to a document. */
router.post(
  '/doc/validate-collaboration',
  auth.requireLogin,
  controller.validateCollaboration
);

/* This is a route that is used to download a document. */
router.post('/doc/download-docx', controller.downloadDocx);
router.post('/doc/download-pdf', controller.downloadPdf);

module.exports = router;
