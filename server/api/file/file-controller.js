const File = require('../../model/File');
const auth = require('../../services/auth-service');
const ACTIVITY_CATEGORY = require('../../constants/activityCategories');
const { addActivityLog } = require('../../services/activity-log-service');
const Project = require('../../model/Project');

//Increate File count for folders
const increateFileCount = async function (folder) {
  File.findOneAndUpdate({ _id: folder }, { $set: {tool_count : 1} });
  File.findByIdAndUpdate(
    { _id: folder },
    { $inc: {tool_count : 1} },
    async (error, file) => {
      if (error) {
        console.log(error);
      }
      if (file) {
        console.log("File count increased");
      }
    }
  );
}

/*
1. Find a file by its id.
2. If there is an error, return a 500 status code with the error message.
3. If the file is not found, return a 404 status code.
4. If the file is found, return a 200 status code with the file.
*/
module.exports.index = function(req, res) {
  File.findOne({ _id: req.params.id }, (error, file) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!file) {
      return res.status(404).json();
    }
    return res.status(200).json({ file });
  });
};

/* Create File Info */
module.exports.createFile = async function(req, res) {
  const file = new File({
    ...req.body,
    ownerId: auth.getUserId(req),
  });

  try {
    const createdFile = await file.save();
    Project.findByIdAndUpdate(
      { _id: createdFile.project_id },
      { $set: {updatedAt: createdFile.updatedAt} },
      {new: true},
      async (error, project) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      }
    );
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.FILE,
      description: 'A new file has been created',
      objectName: createdFile.name,
      objectId: createdFile._id,
    });
    const folder = req.body?.folder || '';
    if (folder !== '') await increateFileCount(folder);
    return res.status(200).json({
      file: createdFile,
      message: 'The File has been created',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* Update File Info */
module.exports.updateFile = function(req, res) {
  File.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    async (error, file) => {
      Project.findByIdAndUpdate(
        { _id: file.project_id },
        { $set: {updatedAt: file.updatedAt} },
        {new: true},
        async (error, project) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          }
        }
      );
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (file) {
        await addActivityLog(req, {
          category: ACTIVITY_CATEGORY.FILE,
          description: 'A new file has been updated',
          objectName: file.name,
          objectId: file._id,
        });
        return res
          .status(200)
          .json({ file, message: 'The file has been updated' });
      }
    }
  );
};

//Delete File
module.exports.deleteFile = function(req, res) {
  File.deleteOne({ _id: req.params.id }, function(err, file) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'File has been deleted' });
  });
};

//Get Files
module.exports.getFiles = async function(req, res) {
  const project_id = req.params?.project_id || '';
  const keyword = req.query?.keyword || '';
  const regex = new RegExp(keyword, 'i');
  let queryBody = { 
    project_id: project_id,
    name: { $regex: regex }
  };
  const folder = req.query?.folder || '';
  queryBody = {
    $and: [queryBody, {folder: folder}],
  };
  let q = File.find(queryBody);
  const sortOption = req.query?.sortOption || '';
  if (sortOption === 'name') {
    q = q.sort({ name: 1 });
  } else if (sortOption === 'modified') {
    q = q.sort({ updatedAt: -1 });
  } else {
    q = q.sort({ type: 1, updatedAt: -1 });
  }
  await q.exec((error, files) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({
      files,
    });
  });
};

