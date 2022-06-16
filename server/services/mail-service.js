//Import dotenv Module
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const { generateJWT } = require('../services/auth-service');
//const jwt = require("jsonwebtoken");
//MAILGUN
const mailgun = require('mailgun-js');
const { capitalizeString, firstName } = require('../utilities/string-util');
const DOMAIN = process.env.MAILGUN_DOMAIN;

const urlBase = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/dashboard`;
const urlExploreAllFeatures = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/dashboard`;
const urlExploreEditor = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/writing/article`;
const urlCreateHeadlines = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/writing/headline`;
const urlGenerateSummary = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/writing/summary`;
const urlSchedule = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/dashboard`;
const urlUpgradeSusbscription = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/account/billing`;
const urlDashboard = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/dashboard`;
const urlCheckoutPreset = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/account/billing`;
const urlLogin = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/auth/login`;
const urlViewDocument = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/writing/article`;
const urlViewSubscribe = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/account/`;
const urlLetsConnect = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/dashboard/`;
const urlUnsubscribe = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/account/`;
const urlProjects = `${(process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL)}/saved-drafts/projects`;

const defaultUrlParams = {
  'v:urlBase': urlBase,
  'v:urlExploreAllFeatures': urlExploreAllFeatures,
  'v:urlExploreEditor': urlExploreEditor,
  'v:urlCreateHeadlines': urlCreateHeadlines,
  'v:urlGenerateSummary': urlGenerateSummary,
  'v:urlSchedule': urlSchedule,
  'v:urlUpgradeSusbscription': urlUpgradeSusbscription,
  'v:urlDashboard': urlDashboard,
  'v:urlCheckoutPreset': urlCheckoutPreset,
  'v:urlLogin': urlLogin,
  'v:urlViewDocument': urlViewDocument,
  'v:urlViewSubscribe': urlViewSubscribe,
  'v:urlUnsubscribe': urlUnsubscribe,
  'v:urlLetsConnect': urlLetsConnect,
  'v:urlProjects': urlProjects,
};

module.exports.mg = mailgun({
  apiKey: process.env.API_KEY_MAILGUN,
  domain: DOMAIN,
  from_who: process.env.FROM_WHO_MAIL,
});
//RESET PASSWORD TEMPLATE
function resetPassword(user, token) {
  const filePath = path.join(
    __dirname,
    '../../public/emails/forgot-password.html'
  );
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const resetUrl = `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}/auth/resetpassword/${token}`;
  const replacements = {
    urlReset: resetUrl,
  };
  const htmlToSend = template(replacements);
  const data = {
    from: process.env.FROM_WHO_MAIL,
    to: user.email,
    subject: capitalizeString(
      `Hi ${firstName(
        user.username
      )}, [HelloScribe] Please reset your password.`
    ),
    html: htmlToSend,
  };
  return data;
}
module.exports.resetPassword = resetPassword;
//EMAIL CONFIRMATION TEMPLATE
function confirmEmail(user, account) {
  const token = generateJWT(user, account, process.env.TOKEN_SECRET, {
    expiresIn: '3d',
  });
  /* const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  }); */
  const confirmationUrl = `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}/auth/emailconfirmation/${token}`;
  const replacements = {
    'v:urlConfirmation': confirmationUrl,
    ...defaultUrlParams,
    'v:userName': firstName(user.username),
  };
  const data = {
    from: process.env.FROM_WHO_MAIL,
    to: user.email,
    subject: capitalizeString(`HelloScribe - Verify your email address`),
    template: 'confirm_subscription',
    ...replacements,
  };
  return data;
}
module.exports.confirmEmail = confirmEmail;

// INVITATION EMAIL
function inviteEmail(email, senderName, receiverName, token) {
  const filePath = path.join(
    __dirname,
    '../../public/emails/email-invitation.html'
  );
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const invitationUrl = `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}/join-team/${token}`;
  const replacements = {
    urlInvitation: invitationUrl,
    senderName: firstName(senderName),
  };
  const htmlToSend = template(replacements);
  const data = {
    from: process.env.FROM_WHO_MAIL,
    to: email,
    subject: capitalizeString(
      `Hi ${firstName(receiverName)}, Your Invitation from [HelloScribe]`
    ),
    html: htmlToSend,
  };
  return data;
}
module.exports.inviteEmail = inviteEmail;

// INVITATION Collaboration
function inviteCollaboration(from, to, senderName, receiverName, token) {
  const invitCollaborationUrl = `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}/writing/join-collaborator/${token}`;
  const replacements = {
    'v:urlInvitation': invitCollaborationUrl,
    'v:senderName': firstName(senderName),
  };
  const data = {
    from: from,
    to: to,
    subject: capitalizeString(
      `Hi ${firstName(receiverName)}, Your Invitation from [HelloScribe]`
    ),
    template: 'invite-collaborator',
    ...replacements,
  };
  return data;
}
module.exports.inviteCollaboration = inviteCollaboration;

// Subscribe email
function subscribeEmail({ email, userName, url = '', emailId, title }) {
  const urlCustom = `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.CLIENT_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}/${url}`;
  const replacements = {
    'v:urlCustom': urlCustom,
    ...defaultUrlParams,
    'v:userName': firstName(userName),
  };
  const data = {
    from: process.env.FROM_WHO_MAIL,
    to: email,
    subject: capitalizeString(title ? title : `Hi ${firstName(userName)}.`),
    template: emailId,
    ...replacements,
  };
  return data;
}
module.exports.subscribeEmail = subscribeEmail;
