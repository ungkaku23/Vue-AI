const express = require('express');
const router = express.Router();
const controller = require('./file-controller');
const auth = require('../../services/auth-service');

//Get files
router.get('/files/:project_id', auth.requireLogin, controller.getFiles);

//Get File
// router.get('/file/:id', auth.requireLogin, controller.index);
router.get('/file/:id', auth.requireLogin, controller.index);

//Create File
router.post('/file', auth.requireLogin, controller.createFile);

//Update File
router.put('/file/:id', auth.requireLogin, controller.updateFile);

//Delete File
router.delete('/file/:id', auth.requireLogin, controller.deleteFile);

module.exports = router;