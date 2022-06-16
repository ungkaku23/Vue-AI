const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({

  file_id: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  contents: Array,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
ShareSchema.set('timestamps', true);

module.exports = mongoose.model('Share', ShareSchema);
