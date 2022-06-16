const ACTIVITY_CATEGORY = require('../../constants/activityCategories');
const Note = require('../../model/Note');
const { addActivityLog } = require('../../services/activity-log-service');
const auth = require('../../services/auth-service');

module.exports.index = function(req, res) {
  Note.findOne({ _id: req.params.id }, (error, note) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!note) {
      return res.status(404).json();
    }
    return res.status(200).json({ note });
  });
};

/* Create Note Info */
module.exports.createNote = function(req, res) {
  const note = new Note({
    ...req.body,
    ownerId: auth.getUserId(req),
  });

  note.save((error, note) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.NOTE,
      description: 'A new note has been created',
      objectName: note.baseData.type,
      objectId: note._id,
    });
    return res.status(200).json({ note, message: 'The Note has been created' });
  });
};

/* Update Note Info */
module.exports.updateNote = function(req, res) {
  Note.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    (error, note) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (note) {
        addActivityLog(req, {
          category: ACTIVITY_CATEGORY.NOTE,
          description: 'A note has been updated',
          objectName: note.baseData.type,
          objectId: note._id,
        });
        return res
          .status(200)
          .json({ note, message: 'The Note has been updated' });
      }
    }
  );
};

//Delete Note
module.exports.deleteNote = function(req, res) {
  Note.deleteOne({ _id: req.params.id }, function(err, note) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.NOTE,
      description: 'A note has been deleted',
      objectName: '',
      objectId: req.params.id,
    });
    return res.status(200).json({ note, message: 'Note has been deleted' });
  });
};

//Get Notes
module.exports.getNotes = async function(req, res) {
  const userId = auth.getUserId(req);
  const query = req.query?.query || '';
  let queryBody = { ownerId: userId };
  if (query) {
    const regex = new RegExp(query, 'i');
    const or = {
      $or: [
        { slug: { $regex: regex } },
        { text: { $regex: regex } },
        { url: { $regex: regex } },
        { authors: { $regex: regex } },
      ],
    };
    queryBody = {
      $and: [queryBody, or],
    };
  }
  const q = Note.find(queryBody)
    .sort({ updatedAt: -1 })
    .limit(20);
  await q.exec((error, notes) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({ notes });
  });
};
