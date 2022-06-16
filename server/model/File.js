const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  type: String, // 'file', 'folder'
  name: String,
  tool_type: { type: String, default: 'none' }, // used tool ex:headline none means a folder
  assigned_user: { type: String, default: '' },
  status: { type: String, default: 'none' }, // -1: NO Status, 0: In Progress, 0: For Review, 1:Completed
  folder: { type: String, default: '' }, // this mean file is in the parent directory
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contents: Array,
  base_data: Object,
  tool_count: { type: Number, default: 0},
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // needs more fields here ++++
});
FileSchema.set('timestamps', true);

module.exports = mongoose.model('File', FileSchema);
