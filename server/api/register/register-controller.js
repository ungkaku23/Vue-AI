const StringUtil = require('../../utilities/string-util');
const User = require('../../model/User');
const Membership = require('../../model/Membership');
const Account = require('../../model/Account');
const Invitation = require('../../model/Invitation');
const stripe = require('stripe')(process.env.NODE_ENV != 'production' ? process.env.STRIPE_TEST_API_KEY : process.env.STRIPE_LIVE_API_KEY);
const { generateSession } = require('../../services/auth-service');
const mail = require('../../services/mail-service');
// Register

const doSignIn = (req, res, customer, user) => {
  const account = new Account({
    name: `${user.username}'s Account`,
    customer_id: customer.id,
    membership: [{
      access: req.body.hasOwnProperty("access") && req.body.access ? req.body.access : "user",
      user: user._id,
      owner: req.body.hasOwnProperty("owner") && req.body.owner ? req.body.owner : null
    }]
  });
  const provider = req.body.provider;
  account.save(async (error, account) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const update = {
      $set: { ownedAccount: account._id },
    };
    User.findOneAndUpdate({ _id: user._id }, update, { new: true })
      .populate({
        path: 'currentProject',
        model: 'Project',
      })
      .exec(async function(err, user) {
        if (provider === 'email') {
          //Send Email Verification
          const emailConfirmation = mail.confirmEmail(user, account);
          await mail.mg
            .messages()
            .send(emailConfirmation, function(error, body) {
              if (error) {
                console.log(error.message);
              } else {
                console.log('Email confirmation sent!');
              }
            });
          return res.status(200).json({
            message:
              'Confirmation email has been sent, please check your inbox',
          });
        } else {
          const payload = generateSession(
            user,
            account,
            process.env.TOKEN_SECRET
          );
          return res.status(200).json({ user: payload });
        }
      });
  });
}

const setStripeCustomerInfo = (req, res, user) => {
  stripe.customers.create({
    email: req.body.email,
  }).then(customer => {
    doSignIn(req, res, customer, user);
  }).catch(err => {
    console.log("err: ", err);
    setStripeCustomerInfo(req, res, user);
  });
}

module.exports.index = async function(req, res) {
  const validation = validateIndex(req.body);
  //No Valid Request
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    confirmed: true,
    canceled: false
  });
  await user.save(async (error, user) => {
    if (error) {
      if (error.code === 11000) {
        return res.status(403).json({ message: 'Username is already taken' });
      }
      return res.status(500).json({ message: error.message });
    } else {
      setStripeCustomerInfo(req, res, user);
    }
  });
};
/* Register by invitation */
module.exports.registerInvitation = async function(req, res) {
  const invitation = await Invitation.findOne(
    { token: req.params.token },
    (error, invite) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (!invite) {
        return res
          .status(404)
          .json({ message: 'Sorry, Your Invitation Has Expired ⌛' });
      }
    }
  );
  const validation = validateIndex(req.body);
  //No Valid Request
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    confirmed: true,
    ownedAccount: invitation.account,
  });
  await user.save(async (error, user) => {
    if (error) {
      // Mongoose Error Code 11000 means validation failure (username taken)
      if (error.code === 11000) {
        return res.status(403).json({ message: 'Username is already taken' });
      }
      return res.status(500).json({ message: error.message });
    }
    //Adjust function to create Own Account on creation if you want
    /* const customer = await stripe.customers.create({
      email: req.body.email,
    });
    const ownAccount = new Account({
      name: `${user.username}'s Team`,
      customer_id: customer.id,
      membership: [{ access: "owner", user: user._id }],
    });
    ownAccount.save(async (error, ownAccount) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      console.log("ownAccount", ownAccount);
    }); */
    //Push New Member into Invited Account
    Account.findOneAndUpdate(
      { _id: invitation.account },
      {
        $push: { membership: { access: invitation.role, user: user._id } },
      },
      { new: true }
    ).exec(function(err, account) {
      //Delete Invitation
      if (!err) {
        Invitation.findOneAndRemove({ token: req.params.token }, (err) => {
          if (!err) console.log('Invitation deleted');
        });
      }
      //Get Current Membership From SubDocuments Array
      let membership = account.membership.find(
        (obj) => obj.user == user._id.toString()
      );
      //Gen & sent token
      const payload = generateSession(
        user,
        account,
        process.env.TOKEN_SECRET,
      );
      return res.status(200).json({ user: payload });
    });
  });
};
//Validate Request From FrontEnd (Username & Password)
function validateIndex(body) {
  let errors = '';
  if (StringUtil.isEmpty(body.email)) {
    errors += 'Email is required.';
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password is required.';
  }
  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username is required.';
  }
  //I return An Object
  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors,
  };
}
