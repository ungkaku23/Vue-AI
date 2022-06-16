const User = require('../../model/User');
const Membership = require('../../model/Membership');
const Account = require('../../model/Account');
const auth = require('../../services/auth-service');
const ObjectId = require('mongodb').ObjectId; 

module.exports.index = function(req, res) {
  User.findOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!user) {
      return res.status(404).json();
    }
    const userInfo = {
      email: user.email,
      username: user.name,
    };
    return res.status(200).json({ user: userInfo });
  });
};
//Add un-registered or existed member to the team
module.exports.addMember = function(req, res) {
  return res.status(200).json({ user: userInfo });
};
//Check Email Availability In DB For Registration Async Form
module.exports.checkemail = function(req, res) {
  User.findOne({ email: req.body.email.toLowerCase() }, (error, email) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    if (email) {
      return res.status(200).json({ is_exist: 'yes' });
    }
    return res.status(200).json({ is_exist: 'no' });
  });
};
/* Edit Member Info */
module.exports.editMemberInfo = async function(req, res) {
  let updateData = {
    access: req.body.info.role,
  };

  if (req.body.info.role === "owner") {
    updateData["owner"] = null
  }

  Account.findOneAndUpdate(
    {"membership.user": req.params.id},
    {
      $set: {
        membership: updateData
      }
    },
    function(err, account) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (account) {
        return res.status(200).json({ message: 'User has been updated' });
      }
    }
  );
};
//Delete Member
module.exports.deleteMember = function(req, res) {
  Account.findOneAndUpdate(
    {"membership.user": req.params.id},
    {
      $set: {
        membership: { 
          owner: null 
        }
      }
    },
    function(err, account) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (account) {
        return res.status(200).json({ message: 'User has been deleted' });
      }
    }
  );
};
//Get Members Account
module.exports.getMembers = async function(req, res) {
  const userId = auth.getUserId(req);
  let o_id = new ObjectId(userId);

  await Account.find({ "membership.owner": o_id })
    .populate({
      path: 'membership',
      populate: {
        path: 'user',
        model: 'User',
        select: ['email', 'username', 'confirmed'],
      },
    })
    .exec(function(err, members) {
      console.log("memberse: ", members);
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const membersOfAccount = members.map(m => m.membership[0]);
      return res.status(200).json({ membersOfAccount });
    });
};
