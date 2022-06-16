const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  customer_id: String,
  price: Number,
  subscription_id: String,
  plan_name: String,
  current_period_end: Number,
  cancel_at_period_end: Boolean,
  user_id: String,
  product_id: String,
  card_last4: Number,
  card_brand: String,
  plan_id: String
});
subscriptionSchema.set('timestamps', true);

module.exports = mongoose.model('Subscription', subscriptionSchema);
