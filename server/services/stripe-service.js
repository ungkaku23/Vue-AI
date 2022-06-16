require("dotenv").config();
const stripe = require("stripe")(process.env.NODE_ENV != 'production' ? process.env.STRIPE_TEST_API_KEY : process.env.STRIPE_LIVE_API_KEY);
const UTILS = require("../utilities/stripe-util");

/**
 * @param {Array} plans An array of Stripe products
 * @return {Array} An array of Stripe products with additional display information
 */
function getFeaturesPlan(planName) {
  var keys = Object.keys(UTILS.PLAN_INFO);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key == planName) {
      return UTILS.PLAN_INFO[key];
    }
  }
  //return UTILS.PLAN_INFO;
}
/**
 * @param {Array} products An array of Stripe products
 * @return {Array} An array of Stripe products with additional display information
 */
function formatProducts(products) {
  products.forEach((product) => {
    /* Append additional display information */
    product.subheader = UTILS.getValue(
      UTILS.PRODUCT_INFO[product.name],
      "subheader",
      ""
    );
  });

  return products;
}
/**
 * @param {Array} plans An array of Stripe plans
 * @return {Array} An array of Stripe plans with additional display information
 * This array is also sorted by amount
 */
function sortAndFormatPlans(plans) {
  plans = plans.sort((a, b) => {
    /* Sort plans in ascending order of price (amount)
     * Ref: https://www.w3schools.com/js/js_array_sort.asp */
    return a.amount - b.amount;
  });
  plans[0].nickname = plans[0].nickname || 'Maverick';
  plans[1].nickname = plans[1].nickname || 'Squad';
  // plans[2].nickname = plans[2].nickname || 'Maverick';
  // plans[3].nickname = plans[3].nickname || 'Squad';
  plans.forEach((plan) => {
    /* Format plan price (amount) in USD */
    plan.amount = UTILS.formatUSD(plan.amount);

    /* Append additional display information */
    plan.formatted = JSON.stringify(plan);
    plan.features = UTILS.getValue(
      UTILS.PLAN_INFO[plan.nickname],
      "features",
      []
    );
    plan.highlight = UTILS.getValue(
      UTILS.PLAN_INFO[plan.nickname],
      "highlight",
      false
    );
    plan.membership_limit = UTILS.getValue(
      UTILS.PLAN_INFO[plan.nickname],
      "membership_limit"
    );
  });

  return plans.filter(p => p.active);
}
/**
 * @param {Array} plans An array of Stripe plans
 * @param {Array} products An array of Stripe products
 * @return {Array} An array of Stripe products with attached plans
 * Products with no plans are filtered out
 */
function attachPlansToProducts(plans, products) {
  products.forEach((product) => {
    const filteredPlans = plans.filter((plan) => {
      return product.id === plan.product;
    });

    product.plans = filteredPlans;
  });

  return products.filter((product) => product.plans.length > 0);
}

/**
 * @return {Array} An array of Stripe products that have 1+ plans
 * Each Stripe product contains an array of Stripe plans
 */
async function getProductsAndPlans() {
  return Promise.all([
    stripe.products.list({ limit: 30 }), // Default returns 10 products, sorted by most recent creation date
    stripe.plans.list({}), // Default returns 10 plans, sorted by most recent creation date
  ])
    .then((stripeData) => {
      var products = formatProducts(stripeData[0].data);
      var plans = sortAndFormatPlans(stripeData[1].data);
      return attachPlansToProducts(plans, products);
    })
    .catch((err) => {
      console.error("Error fetching Stripe products and plans: ", err);
      return [];
    });
}

async function getHelloScribePlans() {
  // console.log("process.env.STRIPE_TEST_PRODUCT_TEAM_ID: ", process.env.STRIPE_TEST_PRODUCT_TEAM_ID);
  // console.log("process.env.STRIPE_TEST_PRODUCT_SINGLE_ID: ", process.env.STRIPE_TEST_PRODUCT_SINGLE_ID);
  let productSingleId = process.env.NODE_ENV != 'production' ? process.env.STRIPE_TEST_PRODUCT_SINGLE_ID : process.env.STRIPE_LIVE_PRODUCT_SINGLE_ID;
  let productTeamId = process.env.NODE_ENV != 'production' ? process.env.STRIPE_TEST_PRODUCT_TEAM_ID : process.env.STRIPE_LIVE_PRODUCT_TEAM_ID;

  return Promise.all([
    stripe.products.retrieve(productTeamId),
    stripe.plans.list({ product: productTeamId }),
    stripe.products.retrieve(productSingleId),
    stripe.plans.list({ product: productSingleId })
  ])
    .then((stripeData) => {
      let productTeam = Object.assign({}, stripeData[0].data);
      let plansTeam = sortAndFormatPlans(stripeData[1].data);
      let productSingle = Object.assign({}, stripeData[2].data);
      let plansSingle = sortAndFormatPlans(stripeData[3].data);
      let plans = [
        plansSingle[0],
        plansTeam[0],
        plansSingle[1],
        plansTeam[1]
      ];

      productTeam['subheader'] = UTILS.PRODUCT_INFO['HelloScribe'].subheader;
      productTeam['plans'] = plans;
      return productTeam;
    })
    .catch((err) => {
      console.error("Error fetching Stripe products and plans: ", err);
      return {};
    });
}
//Return The Created Subscription
/**
 * @param {string} paymentMethodId The id of your customer's Stripe Payment Method (an
 * abstraction of your customer's card information)
 * @param {Object} customerInfo An object containing your customer's email, name,
 * and the plan your customer wants to pay for
 * @return {Object} Your customer's newly created subscription
 */
async function createCustomerAndSubscription(paymentMethodId, customerInfo) {
  /* Create customer and set default payment method */
  const customer = await stripe.customers.create({
    payment_method: paymentMethodId,
    email: customerInfo.email,
    name: customerInfo.name,
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
  /* Create subscription and expand the latest invoice's Payment Intent
   * We'll check this Payment Intent's status to determine if this payment needs SCA
   */
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        plan: customerInfo.planId,
      },
    ],
    //trial_from_plan: true, /* Use trial period specified in plan */
    expand: ["latest_invoice.payment_intent"],
    /* Stripe automatically sends an email to your customer’s email address approximately
     *one hour after delivering the invoice.created webhook event.
     */
    collection_method: "send_invoice",
  });

  return subscription;
}

module.exports = {
  getProductsAndPlans,
  createCustomerAndSubscription,
  getFeaturesPlan,
  getHelloScribePlans
};
