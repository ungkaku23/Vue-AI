const express = require('express');
const router = express.Router();
const controller = require('./article-controller');
const auth = require('../../services/auth-service');

//Get article
router.get('/article/:id', auth.requireLogin, controller.index);

//Create article
router.post('/article', auth.requireLogin, controller.createArticle);

//Update article
router.put('/article/:id', auth.requireLogin, controller.updateArticle);

//Delete article
router.delete('/article/:id', auth.requireLogin, controller.deleteArticle);

//Get all articles
router.get('/articles', auth.requireLogin, controller.getArticles);

module.exports = router;
