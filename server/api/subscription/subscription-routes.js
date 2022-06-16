const express = require("express");
const router = express.Router();
const controller = require("./subscription-controller");

// GET CONFIG (PK KEY)
router.get("/config", controller.config);

//Get Plans & Products
router.get("/plans", controller.index);

//Get HelloScribe Plans & Products
router.get("/helloscribe-plans", controller.getHelloScribePlans);

// Check Subscription account
router.get("/check-subscription", controller.checkSubscription);

// Redirect Subscription
router.post("/redirect-subscription", controller.redirectSubscription);

// Redirect Billing Subscription
router.post("/redirect-billing-subscription", controller.redirectBillingSubscription);

// Create Subscription
router.post("/create-subscription", controller.createSubscription);

//Retry new payment method and assigns it
router.post("/retry-invoice", controller.retryInvoice);

//Verify subscription Status
router.post("/verify-subscription", controller.verifySubscription);

//Retrive coupon info
router.get("/retrieve-coupon-info/:couponCode", controller.retrieveCouponInfo);

//Retrieve subscription information
router.get(
  "/retrieve-subscription-information/:stripeCustomerId",
  controller.retrieveSubscriptionInformation
);
//Cancel subscription
router.put("/cancel-subscription", controller.cancelSubscription);

//Reactivate subscription
router.put("/reactivate-subscription", controller.reactivateSubscription);


//Update subscription
router.put("/update-subscription", controller.updateSubscription);

//Get invoices
router.get("/get-invoices/:stripeCustomerId", controller.getInvoices);

//Set Subscription
router.get("/set-subscription/:stripeCustomerId", controller.setSubscription);

//Upgrade Subscription
router.get("/upgrade-subscription/:stripeCustomerId", controller.upgradeSubscription);

module.exports = router;
