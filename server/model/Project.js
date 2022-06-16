const mongoose = require('mongoose');
const PROJECT_TYPES = require('../constants/projectTypes');

const projectSchema = new mongoose.Schema({
  projectType: {
    type: String,
    enum: Object.keys(PROJECT_TYPES).map((key) => PROJECT_TYPES[key]),
    default: PROJECT_TYPES.PERSONAL,
    require: true,
  },
  audience: String,
  name: String,
  description: String,
  iconSymbol: String,
  keywords: [String],
  notifications: {
    type: [
      {
        type: String,
        enum: ['email', 'phone'],
      },
    ],
    default: 'email',
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  website: String
});
projectSchema.set('timestamps', true);
module.exports = mongoose.model('Project', projectSchema);
