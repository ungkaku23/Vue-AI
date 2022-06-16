const express = require('express');
const router = express.Router();
const controller = require('./share-controller');
const auth = require('../../services/auth-service');


//Get Shared File by file_id
router.get('/share/:file_id', controller.index);

//Create Shared File
router.post('/share', auth.requireLogin, controller.createShare);

//Update Shared File
router.put('/share/:id', auth.requireLogin, controller.updateShare);

//Delete Shared File
router.delete('/share/:id', auth.requireLogin, controller.deleteShare);

module.exports = router;