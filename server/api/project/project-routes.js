const express = require('express');
const router = express.Router();
const controller = require('./project-controller');
const auth = require('../../services/auth-service');

//Get project
router.get('/project/:id', auth.requireLogin, controller.index);

//Create project
router.post('/project', auth.requireLogin, controller.createProject);

//Update project
router.put('/project/:id', auth.requireLogin, controller.updateProject);

//Delete project
router.delete('/project/:id', auth.requireLogin, controller.deleteProject);

//Get all projects
router.get('/projects', auth.requireLogin, controller.getProjects);
router.get('/recent-projects', auth.requireLogin, controller.getRecentProjects);

module.exports = router;
