const express = require('express');
const router = express.Router();
const controller = require('./note-controller');
const auth = require('../../services/auth-service');

//Get article
router.get('/notes/:id', auth.requireLogin, controller.index);

//Create article
router.post('/notes', auth.requireLogin, controller.createNote);

//Update article
router.put('/notes/:id', auth.requireLogin, controller.updateNote);

//Delete article
router.delete('/notes/:id', auth.requireLogin, controller.deleteNote);

//Get all articles
router.get('/notes', auth.requireLogin, controller.getNotes);

module.exports = router;
