const ActivityLog = require('../model/ActivityLog');
const auth = require('./auth-service');

/*
```javascript
const ActivityLog = require('../models/activityLog');
const auth = require('../middleware/auth');

Args:
  req: The request object.
  { category, subcategory, description, objectName, objectId, ownerId }: These are the parameters that are passed to the function.
Returns:
  The activity log is being returned.
*/
module.exports.addActivityLog = function addActivityLog(
  req,
  { category, subcategory, description, objectName, objectId, ownerId }
) {
  const userId = auth.getUserId(req) || ownerId;

  const activityLog = new ActivityLog({
    category,
    subcategory,
    description,
    objectName,
    objectId,
    ownerId: userId,
  });
  return activityLog.save();
};

/*
```javascript
const ActivityLog = require('../models/activityLog');
const auth = require('../middleware/auth');

Args:
  req: The request object.
Returns:
  An array of activity logs.
*/
module.exports.getActivityLogsByUserId = function getActivityLogsByUserId(req) {
  const userId = auth.getUserId(req);
  const q = ActivityLog.find({ ownerId: userId })
    .sort({ updatedAt: -1 })
    .limit(10);
  return q.exec();
};
