const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

  name: String,
  email: String,
  role: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

teamSchema.set('timestamps', true);
module.exports = mongoose.model('Team', teamSchema);
