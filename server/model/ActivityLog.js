const mongoose = require('mongoose');
const ACTIVITY_CATEGORY = require('../constants/activityCategories');

const activityLogSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: Object.keys(ACTIVITY_CATEGORY).map((key) => ACTIVITY_CATEGORY[key]),

    default: ACTIVITY_CATEGORY.COMMON,
    require: true,
  },
  subcategory: String,
  description: String,
  objectName: String,
  objectId: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
activityLogSchema.set('timestamps', true);
module.exports = mongoose.model('ActivityLogo', activityLogSchema);
