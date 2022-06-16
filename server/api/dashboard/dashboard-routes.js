const express = require('express');
const router = express.Router();
const controller = require('./dashboard-controller');
const auth = require('../../services/auth-service');

//Get stats for dashboard
router.get('/dashboard/stats', auth.requireLogin, controller.index);
router.get(
  '/dashboard/recent-projects',
  auth.requireLogin,
  controller.recentProjects
);

module.exports = router;
