const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  slug: String,
  text: String,
  url: String,
  authors: String,
  year: String,
  baseData: Object,
  category: String,
  publishedAt: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pinned: { type: Boolean, default: false },
});
NoteSchema.set('timestamps', true);

module.exports = mongoose.model('Note', NoteSchema);
