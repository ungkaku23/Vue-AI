require('dotenv').config();
const STRIPE_API = require('../../services/stripe-service');
const stripe = require('stripe')(process.env.NODE_ENV != 'production' ? process.env.STRIPE_TEST_API_KEY : process.env.STRIPE_LIVE_API_KEY);
const { generateSession } = require('../../services/auth-service');
const auth = require('../../services/auth-service');
const User = require('../../model/User');
const Subscription = require('../../model/Subscription');
const Account = require('../../model/Account');
const { sendSubscribeEmail } = require('../../cron-jobs/subscribe');
//Check subscrption
async function checkSubscription(req, res) {
  const userId = auth.getUserId(req);
  const user = await User.findOne({
    _id: userId,
  })
    .populate({
      path: 'ownedAccount',
      model: 'Account',
    })
    .populate({
      path: 'currentProject',
      model: 'Project',
    });
  const account = user.ownedAccount;
  if (account.subscribed === true) {
    const subscription = await Subscription.findOne({
      _id: account.subscription_id,
    });
    const payload = generateSession(user, account, process.env.TOKEN_SECRET);
    const state = {
      payload: payload,
      message: `You're already on ${subscription.plan_name} Plan!`,
    };
    return res.status(409).json({ state: state });
  } else {
    return res.status(200).json();
  }
}
//Get invoices
async function getInvoices(req, res) {
  const invoicesResponse = await stripe.invoices.list({
    customer: req.params.stripeCustomerId,
  });

  let invoices = invoicesResponse.data.map((invoice) => ({
    Amount: `$${(invoice['amount_paid'] / 100).toFixed(2)}`,
    //Date: invoice["created"],
    Date: new Date(invoice['created'] * 1000).toDateString(),
    Invoice: invoice['invoice_pdf'],
  }));

  if (!invoices) {
    return;
  }
  
  return res.status(200).json({ invoices: invoices });
}
//Get Plans & Products
async function index(req, res) {
  const products = await STRIPE_API.getProductsAndPlans((error) => {
    if (error) {
      return res.status(500).json();
    }
  });

  return res.status(200).json({ products: products });
}

async function getHelloScribePlans(req, res) {
  const product = await STRIPE_API.getHelloScribePlans((error) => {
    if (error) {
      return res.status(500).json();
    }
  });

  return res.status(200).json({ product });
}
// GET CONFIG (PK KEY)
function config(req, res) {
  res.send({
    publishableKey: process.env.NODE_ENV != 'production' ? process.env.VUE_APP_STRIPE_TEST_PUBLISHABLE_KEY : process.env.VUE_APP_STRIPE_LIVE_PUBLISHABLE_KEY
  });
}

// REDIRECT SUBSCRIPTION
async function redirectSubscription(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: req.body.info.line_items,
      mode: req.body.info.mode,
      success_url: req.body.info.success_url,
      cancel_url: req.body.info.cancel_url,
      customer: req.body.info.customer,
      allow_promotion_codes: req.body.info.allow_promotion_codes
    });
      
    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    if (error.type === "StripeConnectionError") {
      redirectSubscription(req, res);
    } else {
      return res.status('402').send({ error: { message: error.message } });
    }
  }
}

// REDIRECT BILLING SUBSCRIPTION
async function redirectBillingSubscription(req, res) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      return_url: req.body.info.return_url,
      customer: req.body.info.customer
    });
      
    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    if (error.type === "StripeConnectionError") {
      redirectBillingSubscription(req, res);
    } else {
      return res.status('402').send({ error: { message: error.message } });
    }
  }
}

// CREATE SUBSCRIPTION
async function createSubscription(req, res) {
  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    console.log(error);
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(req.body.customerId, {
    invoice_settings: {
      default_payment_method: req.body.paymentMethodId,
    },
  });

  const coupon = req.body.couponCode;
  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: req.body.priceId }],
    coupon: coupon ? coupon : null,
    expand: ['latest_invoice.payment_intent'],
  });

  return res.status(200).json({ subscription });
}
//RETRY NEW PM
async function retryInvoice(req, res) {
  // Set the default payment method on the customer

  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
    await stripe.customers.update(req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    });
  } catch (error) {
    // in case card_decline error
    return res
      .status('402')
      .send({ result: { error: { message: error.message } } });
  }

  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ['payment_intent'],
  });
  //res.send(invoice);
  return res.status(200).json({ invoice });
}
// VERIFY & STORE SUBSCRIPTION
async function verifySubscription(req, res) {
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId,
    {
      expand: ['customer.invoice_settings.default_payment_method'],
    }
  );
  //The minimum fields from stripe to store
  const userId = auth.getUserId(req);
  const accountId = auth.getAccountId(req);
  const sub = new Subscription({
    customer_id: subscription.customer.id,
    price: subscription.items.data[0].price.unit_amount,
    subscription_id: subscription.id,
    plan_name: subscription.items.data[0].price.nickname,
    current_period_end: subscription.current_period_end,
    product_id: subscription.items.data[0].price.product,
    cancel_at_period_end: subscription.cancel_at_period_end,
    user_id: userId,
    card_last4:
      subscription.customer.invoice_settings.default_payment_method.card.last4,
    card_brand:
      subscription.customer.invoice_settings.default_payment_method.card.brand,
  });
  sub.save((error, sub) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    //Update Local User Subscription State
    Account.findOneAndUpdate(
      { _id: accountId },
      {
        $set: {
          plan: subscription.items.data[0].price.nickname,
          subscription: subscription.status,
          subscribed: true,
          membership_limit: 0,
          // membership_limit: STRIPE_API.getFeaturesPlan(
          //   subscription.items.data[0].price.nickname
          // ).membership_limit,
          subscription_id: sub._id,
        },
      },
      { new: true }
    ).exec(function(err, account) {
      if (err) {
        console.log(err);
      }
      //Get User
      User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            canceled: false,
          },
        },
        (error, user) => {
          if (user) {
            sendSubscribeEmail({
              email: user.email,
              emailId: 'upgrade_success',
              userName: user.username,
            });
            const payload = generateSession(
              user,
              account,
              process.env.TOKEN_SECRET
            );
            return res.status(200).json({ payload });
          } else {
            return res.status(404).json({ message: 'User Not Found' });
          }
        }
      );
    });
  });
}

// Retrieve Coupon Informations
async function retrieveCouponInfo(req, res) {
  const couponCode = req.params.couponCode;
  try {
    const coupon = await stripe.promotionCodes.list({
      code: couponCode,
    });
    return res.status(200).json(coupon.data);
  } catch (err) {
    return res.status(500).json({
      code: err.code,
      message: err.raw.message,
      type: err.raw.type,
    });
  }
}

function updateMembership() {

}

// Set Subscription
async function setSubscription(req, res) {
  console.log("customerid: ", req.params.stripeCustomerId);
  stripe.subscriptions.list({customer: req.params.stripeCustomerId})
  .then(async(resSub) => {
    console.log("strdata: ", resSub.data[0]);
    
    const subscriptionData = resSub.data[0];

    const userId = auth.getUserId(req);
    const accountId = auth.getAccountId(req);

    stripe.paymentMethods.retrieve(subscriptionData.default_payment_method)
    .then((paymentDetail) => {
      const newSub = new Subscription({
        customer_id: req.params.stripeCustomerId,
        price: subscriptionData.items.data[0].plan.amount,
        subscription_id: subscriptionData.id,
        plan_name: subscriptionData.items.data[0].plan.nickname ? subscriptionData.items.data[0].plan.nickname : `HelloScribe - $${subscriptionData.items.data[0].plan.amount} Plan`,
        current_period_end: subscriptionData.current_period_end,
        cancel_at_period_end: subscriptionData.cancel_at_period_end,
        user_id: userId,
        product_id: subscriptionData.items.data[0].plan.product,
        card_last4: paymentDetail.card.last4,
        card_brand: paymentDetail.card.brand,
        plan_id: subscriptionData.plan.id
      });

      let productTeamId = process.env.NODE_ENV != "production" ? process.env.STRIPE_TEST_PRODUCT_TEAM_ID : process.env.STRIPE_LIVE_PRODUCT_TEAM_ID;
  
      newSub.save((error, sub) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        //Update Local User Subscription State
        Account.findOneAndUpdate(
          { _id: accountId },
          {
            $set: {
              plan: subscriptionData.items.data[0].plan.nickname ? subscriptionData.items.data[0].plan.nickname : `HelloScribe - $${subscriptionData.items.data[0].plan.amount} Plan`,
              subscription: subscriptionData.status,
              subscribed: true,
              membership_limit: 0,
              membership: {
                access: subscriptionData.items.data[0].plan.product === productTeamId ? "owner" : "user",
                owner: null,
                user: userId
              },
              subscription_id: sub._id,
            },
          },
          { new: true }
        ).exec(function(err, account) {
          if (err) {
            console.log(err);
          }
          //Get User
          User.findOneAndUpdate(
            { _id: userId },
            {
              $set: {
                canceled: false,
              }
            },
            (error, user) => {
              if (user) {
                sendSubscribeEmail({
                  email: user.email,
                  emailId: 'upgrade_success',
                  userName: user.username,
                });
                const payload = generateSession(
                  user,
                  account,
                  process.env.TOKEN_SECRET
                );
                return res.status(200).json({ payload });
              } else {
                return res.status(404).json({ message: 'User Not Found' });
              }
            }
          );
        });
      });
    })
    .catch(paymentDetailError => {
      console.log("err: ", paymentDetailError);
      if (paymentDetailError.type === "StripeConnectionError") {
        setSubscription(req, res);
      } else {
        return res.status('402').send({ error: { message: paymentDetailError.message } });
      }
    });
  })
  .catch(suberr => {
    console.log("err: ", suberr);
    if (suberr.type === "StripeConnectionError") {
      setSubscription(req, res);
    } else {
      return res.status('402').send({ error: { message: suberr.message } });
    }
  });
}


// Set Subscription
async function upgradeSubscription(req, res) {
  console.log("upgrade customerid: ", req.params.stripeCustomerId);
  stripe.subscriptions.list({customer: req.params.stripeCustomerId})
  .then(async(resSub) => {
    console.log("upgrade strdata-----------: ", resSub.data[0]);

    if (resSub.data[0] === undefined) {
      await Subscription.deleteOne(
        { customer_id: req.params.stripeCustomerId },
        (error) => {
          console.log("sub del error: ", error);
          if (error) {
            return res.status(500).json();
          }
        }
      );
      const userId = auth.getUserId(req);

      await Account.findOneAndUpdate(
        { customer_id: req.params.stripeCustomerId },
        {
          $set: {
            plan: '',
            subscription: '',
            membership: {
              access: "user",
              owner: null,
              user: userId
            },
            subscribed: false
          },
        },
        { new: true },
        (error) => {
          console.log("account del error: ", error);
          if (error) {
            return res.status(500).json();
          }
        }
      );
      //Update Local User Subscription State
      User.findOne({ _id: userId })
        .populate({
          path: 'ownedAccount',
          model: 'Account',
        })
        .exec(function(err, user) {
          if (err) {
            console.log(err);
          }
          console.log("user, ownd", user);
          const payload = generateSession(
            user,
            user.ownedAccount,
            process.env.TOKEN_SECRET
          );
          return res.status(200).json({ payload });
        });
    } else {
      const subscriptionData = resSub.data[0];

      const userId = auth.getUserId(req);
      const accountId = auth.getAccountId(req);

      stripe.paymentMethods.retrieve(subscriptionData.default_payment_method)
      .then((paymentDetail) => {
        Subscription.findOneAndUpdate(
          {
            customer_id: req.params.stripeCustomerId
          }, 
          {
            price: subscriptionData.items.data[0].plan.amount,
            subscription_id: subscriptionData.id,
            plan_name: subscriptionData.items.data[0].plan.nickname ? subscriptionData.items.data[0].plan.nickname : `HelloScribe - $${subscriptionData.items.data[0].plan.amount} Plan`,
            current_period_end: subscriptionData.current_period_end,
            cancel_at_period_end: subscriptionData.cancel_at_period_end,
            user_id: userId,
            product_id: subscriptionData.items.data[0].plan.product,
            card_last4: paymentDetail.card.last4,
            card_brand: paymentDetail.card.brand,
            plan_id: subscriptionData.plan.id,
          }
        ).then(sub => {
          //Update Local User Subscription State
          let productTeamId = process.env.NODE_ENV != "production" ? process.env.STRIPE_TEST_PRODUCT_TEAM_ID : process.env.STRIPE_LIVE_PRODUCT_TEAM_ID;
          Account.findOneAndUpdate(
            { _id: accountId },
            {
              $set: {
                plan: subscriptionData.items.data[0].plan.nickname ? subscriptionData.items.data[0].plan.nickname : `HelloScribe - $${subscriptionData.items.data[0].plan.amount} Plan`,
                subscription: subscriptionData.status,
                subscribed: true,
                membership_limit: 0,
                membership: {
                  access: subscriptionData.items.data[0].plan.product === productTeamId ? "owner" : "user",
                  owner: null,
                  user: userId
                },
                subscription_id: sub._id,
              },
            },
            { new: true }
          ).exec(function(err, account) {
            if (err) {
              console.log(err);
            }
            //Get User
            User.findOneAndUpdate(
              { _id: userId },
              {
                $set: {
                  canceled: false,
                },
              },
              (error, user) => {
                if (user) {
                  sendSubscribeEmail({
                    email: user.email,
                    emailId: 'upgrade_success',
                    userName: user.username,
                  });

                  console.log("yah~~~~~~~~~~~~~~~~~~~~~~~");

                  if (subscriptionData.items.data[0].plan.product !== productTeamId) {
                    Account.updateMany({
                      "membership.owner": userId 
                    }, {
                      $set: {
                        membership: {
                          owner: null
                        }
                      }
                    })
                    .then(umres => {
                      const payload = generateSession(
                        user,
                        account,
                        process.env.TOKEN_SECRET
                      );
                      return res.status(200).json({ payload });
                    })
                    .catch(umerr => {
                      return res.status(404).json({ message: 'Users Not Found' });
                    });
                  } else {
                    const payload = generateSession(
                      user,
                      account,
                      process.env.TOKEN_SECRET
                    );
                    return res.status(200).json({ payload });
                  }
                } else {
                  return res.status(404).json({ message: 'User Not Found' });
                }
              }
            );
          });
        })
        .catch(upsuberr => {
          return res.status(500).json({ message: upsuberr.message });
        });
      })
      .catch(paymentDetailErr => {
        console.log("err: ", paymentDetailErr);
        if (paymentDetailErr.type === "StripeConnectionError") {
          upgradeSubscription(req, res);
        } else {
          return res.status('402').send({ error: { message: paymentDetailErr.message } });
        }
      });
    }
  })
  .catch(suberr => {
    console.log("err: ", suberr);
    if (suberr.type === "StripeConnectionError") {
      upgradeSubscription(req, res);
    } else {
      return res.status('402').send({ error: { message: suberr.message } });
    }
  });
}

// Retrieve Subscription Informations
async function retrieveSubscriptionInformation(req, res) {
  const stripeCustomerId = req.params.stripeCustomerId;
  const account = await Account.findOne({
    customer_id: stripeCustomerId,
  });

  const subscription = await Subscription.findOne({
    _id: account.subscription_id,
  });
  
  const subscription_stripe = await stripe.subscriptions.retrieve(subscription.subscription_id);
  if (subscription) {
    const subscriptionInfo = {
      card_last4: subscription.card_last4,
      card_brand: subscription.card_brand,
      subscription_id: subscription.subscription_id,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      price: subscription.price,
      status: subscription_stripe.status,
      product_id: subscription.product_id
      //You Can Add More Informations...
    };
    return res.status(200).json({ subscriptionInfo });
  }
}
// Cancel the subscription
async function cancelSubscription(req, res) {
  //const userId = auth.getUserId(req);
  const updateSubscription = await stripe.subscriptions.update(
    req.body.subscriptionId,
    {
      cancel_at_period_end: true,
    }
  );
  //Update Local User Subscription State
  await Subscription.findOneAndUpdate(
    { subscription_id: updateSubscription.id },
    {
      $set: {
        cancel_at_period_end: updateSubscription.cancel_at_period_end,
      },
    },
    { new: true }
  ).exec(function(err) {
    if (err) {
      console.log(err);
    }
    return res
      .status(200)
      .json({ message: 'Your Subscription Has Been canceled' });
  });
}
// Reactivating canceled subscription
async function reactivateSubscription(req, res) {
  //const userId = auth.getUserId(req);
  const subscription = await stripe.subscriptions.retrieve(req.body.subscriptionId);
  const updateSubscription = await stripe.subscriptions.update(
    req.body.subscriptionId,
    { 
      cancel_at_period_end: false,
      items: [{
        id: subscription.items.data[0].id,
        price: subscription.items.data[0].price.id,
      }]
    
    }
  );
  //Update Local User Subscription State
  await Subscription.findOneAndUpdate(
    { subscription_id: updateSubscription.id },
    {
      $set: {
        cancel_at_period_end: updateSubscription.cancel_at_period_end,
      },
    },
    { new: true }
  ).exec(function(err) {
    if (err) {
      console.log(err);
    }
    return res
      .status(200)
      .json({ message: 'Your Subscription Has Been Reactivated' });
  });
}
// Update subscription
async function updateSubscription(req, res) {
  const userId = auth.getUserId(req);
  // Set proration date to this moment:
  const proration_date = Math.floor(Date.now() / 1000);
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );
  const updatedSubscription = await stripe.subscriptions.update(
    req.body.subscriptionId,
    {
      cancel_at_period_end: false,
      proration_date: proration_date,
      proration_behavior: 'create_prorations',
      //proration_behavior: "none",
      items: [
        {
          id: subscription.items.data[0].id,
          price: req.body.newPriceId,
        },
      ],
    }
  );
  //Update Local Subscription State
  await Subscription.findOneAndUpdate(
    { subscription_id: updatedSubscription.id },
    {
      $set: {
        cancel_at_period_end: updatedSubscription.cancel_at_period_end,
        plan_name: updatedSubscription.plan.nickname,
        current_period_end: updatedSubscription.current_period_end,
        price: updatedSubscription.items.data[0].price.unit_amount,
      },
    },
    { new: true }
  ).exec(function(err) {
    if (err) {
      console.log(err);
    }
  });
  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        canceled: false,
      },
    },
    async function(err, user) {
      sendSubscribeEmail({
        email: user.email,
        emailId: 'upgrade_success',
        userName: user.username,
      });
      //Update Local User Plan
      await Account.findOneAndUpdate(
        { customer_id: req.body.stripeCustomerId },
        {
          $set: {
            plan: updatedSubscription.plan.nickname,
            subscription: updatedSubscription.status,
          },
        },
        { new: true }
      ).exec(function(err, account) {
        if (err) {
          console.log(err);
        }
        const payload = generateSession(
          user,
          account,
          process.env.TOKEN_SECRET
        );
        return res
          .status(200)
          .json({ message: 'Your Plan Has Been Updated', payload });
      });
    }
  );
}
module.exports = {
  config,
  index,
  redirectSubscription,
  redirectBillingSubscription,
  createSubscription,
  retryInvoice,
  verifySubscription,
  retrieveCouponInfo,
  retrieveSubscriptionInformation,
  cancelSubscription,
  reactivateSubscription,
  updateSubscription,
  getInvoices,
  checkSubscription,
  getHelloScribePlans,
  setSubscription,
  upgradeSubscription
};
