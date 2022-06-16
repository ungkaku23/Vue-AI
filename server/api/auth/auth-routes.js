const express = require("express");
const passport = require('passport');
const router = express.Router();
//Import Controller
const controller = require("./auth-controller.js");

//END POINTS FOR AUTH ROUTES
//Login
router.post("/auth", controller.index);
//Forgot Password
router.put("/forgot-password", controller.forgotPassword);
//Reset Password
router.put("/reset-password", controller.resetPassword);
//Account Confirmation
router.get("/auth/email/confirm/:token", controller.confirmAccount);
//Login By Invitation
router.post("/login-invitation/:token", controller.loginInvitation);
//Google Auth
router.get("/google-login", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/linkedin-login", passport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'] }));
router.get("/facebook-login", passport.authenticate('facebook', { scope: ['profile', 'email'] }));
module.exports = router;
