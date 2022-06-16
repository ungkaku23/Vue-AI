const jwt = require('jsonwebtoken');

//Generate JSON Web Token Function
function generateJWT(user, account, secretKey, expireIn) {
  let membership;
  if (account && account.membership && account.membership.length === 1) {
    membership = account.membership[0];
  }
  else membership = null;
  const tokenData = {
    id: user._id,
    email: user.email,
    accountId: account._id,
    stripeCustomerId: account.customer_id,
    role: membership.access
  };
  return jwt.sign({ user: tokenData }, secretKey, expireIn);
}
module.exports.generateJWT = generateJWT;
//Attach Subscription Info to JWT if Active Subscription Else Sent only Token
function generateSession(user, account, secretKey, expireIn) {
  const token = generateJWT(user, account, secretKey, expireIn);
  let payload = {
    token: token,
    email: user.email,
    username: user.username,
    role: user.role,
    currentProject: user.currentProject,
    confirmed: user.confirmed,
    imgPath: user.imgPath,
    canceled: user.canceled,
    notificationSubscribed: user.notificationSubscribed,

    subscribed: account.subscribed,
    accountId: account._id,
    stripeCustomerId: account.customer_id,
    plan: account.plan,
    subscription: account.subscription,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return payload;
}
module.exports.generateSession = generateSession;

//Function To Decode The Token And Access User Data Inside The Token
function decodeToken(req, secretKey) {
  //Grab The Token From The Header
  const token =
    req?.headers?.authorization ||
    req?.headers['authorization'] ||
    req?.headers['Authorization'];
  if (!token) {
    return null;
  }
  //If Not Token Return Null
  if (!token) {
    return null;
  }
  //Dectypt Token
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
// Function To Attach To Any Routes That We Want To User To Be LoggedIn To Access
async function requireLogin(req, res, next) {
  try {
    const token = decodeToken(req, process.env.TOKEN_SECRET);
    if (!token) {
      return res.status(401).json({ message: 'You must be logged IN' });
    }
    //Get user info from decoded token
    const user = token.user;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports.requireLogin = requireLogin;

function getUserId(req) {
  const token = decodeToken(req, process.env.TOKEN_SECRET);
  if (!token) {
    return null;
  }
  return token.user.id;
}
module.exports.getUserId = getUserId;

function getAccountId(req) {
  const token = decodeToken(req, process.env.TOKEN_SECRET);
  if (!token) {
    return null;
  }
  return token.user.accountId;
}
module.exports.getAccountId = getAccountId;

function getEmail(req) {
  const token = decodeToken(req, process.env.TOKEN_SECRET);
  if (!token) {
    return null;
  }
  return token.user.email;
}
module.exports.getEmail = getEmail;

function getCustomerId(req) {
  const token = decodeToken(req, process.env.TOKEN_SECRET);
  if (!token) {
    return null;
  }
  return token.user.stripeCustomerId;
}
module.exports.getCustomerId = getCustomerId;