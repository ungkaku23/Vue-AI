const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  article: String,
  baseData: Object,
  cites: Array,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
articleSchema.set('timestamps', true);

module.exports = mongoose.model('Article', articleSchema);
