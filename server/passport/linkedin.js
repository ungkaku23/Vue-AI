const Strategy = require('passport-linkedin-oauth2').Strategy;

function applyLinkedInPassportStrategy(passport) {
  passport.use(new Strategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_ENV != 'production' ? process.env.NODE_ENV != 'spark' ? process.env.VUE_APP_API_URL : process.env.VUE_APP_SPARK_API_URL : process.env.VUE_APP_LIVE_API_URL}${process.env.LINKEDIN_CALLBACK_PATH}`
  },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }));
}
module.exports.applyLinkedInPassportStrategy = applyLinkedInPassportStrategy;