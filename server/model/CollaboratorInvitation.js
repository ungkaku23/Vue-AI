const mongoose = require('mongoose');

const collaboratorInvitatonSchema = new mongoose.Schema({
  token: String,
  email: String,
  fullName: String,
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  inviterName: String,
  inviterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, expires: '3d', default: Date.now }, // expires in 3 days /* https://docs.mongodb.com/manual/core/index-ttl/ */
});

module.exports = mongoose.model(
  'CollaboratorInvitation',
  collaboratorInvitatonSchema
);
