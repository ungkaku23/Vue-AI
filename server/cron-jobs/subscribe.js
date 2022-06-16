const cron = require('node-cron');
const User = require('../model/User');
const mail = require('../services/mail-service');

const titles = {
  day_one_welcome: '🎉 Welcome Aboard!',
  day_two_editing_feature: ' 🪄 One Command for Everything',
  day_three_headline_feature: '🎁 80+ A.I Tools to Make Your Life Easier',
  day_four_summary: '💡 We have an idea for you.',
  day_five_onboarding_invite: '📝 IMPORTANT: Requesting your Feedback.',
  day_six_one_upgrade_request: ' ✅ Your invitation to Upgrade',
  'day-seven_free_trial_is_over': 'Time to Invest in You 😊',
};
function sendSubscribeEmail({ email, emailId, userName }) {
  return new Promise(async (resolve, reject) => {
    const emailInfo = mail.subscribeEmail({
      email: email,
      emailId: emailId,
      userName: userName,
      title: titles[emailId] || '',
    });
    await mail.mg.messages().send(emailInfo, function(err, body) {
      if (err) {
        reject(err);
      } else {
        console.log('Subscribe email sent!');
        resolve();
      }
    });
  });
}
module.exports.sendSubscribeEmail = sendSubscribeEmail;

module.exports.setSubscribeCronJob = function() {
  const everydaySchedule = '0 12 * * *'; // everyday 5:00 am
  cron.schedule(everydaySchedule, async function() {
    try {
      const users = await User.find({
        canceled: { $ne: true },
      })
        .select(['_id', 'username', 'email', 'createdAt'])
        .populate({
          path: 'ownedAccount',
          model: 'Account',
          select: ['name', 'customer_id', 'subscribed', 'subscription', 'plan'],
        });
      const now = new Date();
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const account = user.ownedAccount;
        const createdAt = new Date(user.createdAt);
        const diffTime = Math.abs(now - createdAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let emailId = '';
        if (diffDays === 1) {
          emailId = 'day_one_welcome';
        } else if (diffDays === 2) {
          emailId = 'day_two_editing_feature';
        } else if (diffDays === 3) {
          emailId = 'day_three_headline_feature';
        } else if (diffDays === 4) {
          emailId = 'day_four_summary';
        } else if (diffDays === 5) {
          emailId = 'day_five_onboarding_invite';
        } else if (diffDays === 6) {
          emailId = 'day_six_one_upgrade_request';
        } else if (diffDays === 7) {
          emailId = 'day-seven_free_trial_is_over';
        } else if (diffDays > 7) {
          emailId = '';
          if (!account.subscribed) {
            console.log('unsubscribed', user._id);
            User.findByIdAndUpdate(
              { _id: user._id },
              {
                $set: {
                  canceled: true,
                },
              }
            ).exec(function(error, userInfo) {
              if (error) {
                console.log(error);
              }
              if (userInfo) {
                console.log(userInfo);
              }
            });
          }
        }
        if (emailId) {
          sendSubscribeEmail({
            email: user.email,
            emailId: emailId,
            userName: user.username,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};
