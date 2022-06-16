const express = require("express");
const passport = require('passport');
const router = express.Router();
//Import Controller
const controller = require("./oauth-controller");

router.get(process.env.GOOGLE_CALLBACK_PATH,
  passport.authenticate('google'),
  controller.handleGoogleCallback
);

// router.get(process.env.LINKEDIN_CALLBACK_PATH,
//   passport.authenticate('linkedin'),
//   controller.handleLinkedInCallback
// );

// router.get(process.env.FACEBOOK_CALLBACK_PATH,
//   passport.authenticate('facebook'),
//   controller.handleFacebookCallback
// );

module.exports = router;
