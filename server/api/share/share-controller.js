const Share = require('../../model/Share');
const auth = require('../../services/auth-service');
const File = require('../../model/File');

module.exports.index = async function(req, res) {
  Share.findOne({ file_id: req.params.file_id }, async (error, share) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!share) {
      const file_id = req.params.file_id;
      const file = await File.findOne({ _id: file_id }).exec();
      const share = new Share({
        contents: file.contents,
        file_id: req.params.file_id,
        ownerId: auth.getUserId(req),
      });
      const result = await share.save();
      return res.status(200).json({
        share: result,
      });
    }
    return res.status(200).json({ share });
  });
};

/* Create Share Info */
module.exports.createShare = async function(req, res) {
  const share = new Share({
    ...req.body,
    ownerId: auth.getUserId(req),
  });

  try {
    const createdShare = await share.save();
    return res.status(200).json({
      share: createdShare,
      message: 'The Share has been created',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* Update Share Info */
module.exports.updateShare = function(req, res) {
  Share.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    async (error, share) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (share) {
        return res
          .status(200)
          .json({ share, message: 'The share has been updated' });
      }
    }
  );
};

//Delete Share
module.exports.deleteShare = function(req, res) {
  Share.deleteOne({ _id: req.params.id }, function(err, share) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Share has been deleted' });
  });
};
