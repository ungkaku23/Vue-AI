const ACTIVITY_CATEGORY = require('../../constants/activityCategories');
const Project = require('../../model/Project');
const File = require('../../model/File');
const { addActivityLog } = require('../../services/activity-log-service');
const auth = require('../../services/auth-service');
const mongoose = require('mongoose');

module.exports.index = function(req, res) {
  Project.findOne({ _id: req.params.id }, (error, project) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!project) {
      return res.status(404).json();
    }
    return res.status(200).json({ project });
  });
};

/* Create Project Info */
module.exports.createProject = async function(req, res) {
  const project = new Project({
    ...req.body,
    ownerId: auth.getUserId(req),
  });

  try {
    const createdProject = await project.save();
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.PROJECT,
      description: 'A new project has been created',
      objectName: createdProject.name,
      objectId: createdProject._id,
    });
    return res.status(200).json({
      project: createdProject,
      message: 'The Project has been created',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* Update Project Info */
module.exports.updateProject = function(req, res) {
  Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    {new: true},
    async (error, project) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (project) {
        await addActivityLog(req, {
          category: ACTIVITY_CATEGORY.ARTICLE,
          description: 'A new project has been updated',
          objectName: project.name,
          objectId: project._id,
        });
        return res
          .status(200)
          .json({ project, message: 'The project has been updated' });
      }
    }
  );
};

//Delete Project
module.exports.deleteProject = function(req, res) {
  Project.deleteOne({ _id: req.params.id }, function(err, project) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.ARTICLE,
      description: 'Project has been deleted',
      objectName: '',
      objectId: req.params.id,
    });
    return res.status(200).json({ message: 'Project has been deleted' });
  });
};

//Get Projects
module.exports.getProjects = async function(req, res) {
  const userId = auth.getUserId(req);
  const keyword = req.query?.keyword || '';
  const limit = parseInt(req.query?.project_limit) || 12;
  let cur_page = parseInt(req.query?.cur_page) || 1;
  let queryBody = { ownerId: userId };
  const total_ProjectCnt = await Project.countDocuments(queryBody); // total counts for the user
  const exist_any = total_ProjectCnt ? true : false;
  if (keyword) {
    const regex = new RegExp(keyword, 'i');
    const or = {
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { audience: { $regex: regex } },
      ],
    };
    queryBody = {
      $and: [queryBody, or],
    };
  }
  const allProjectCnt = await Project.countDocuments(queryBody); // per search result
  if(allProjectCnt < cur_page) cur_page = parseInt(allProjectCnt / limit) + (allProjectCnt % limit ? 1 : 0);

  const q = Project.find(queryBody).sort({ updatedAt: -1 }).skip((cur_page - 1) * limit).limit(limit);
  await q.exec(async (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const resultsPromises = (results)
    .map(async function(item) {
      const aggregateQuery = [
        {
          $match: {
            project_id: mongoose.Types.ObjectId(item._doc._id),
          },
        },
        {
          $group: {
            _id: '$assigned_user',
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ];
      const user_list = await File.aggregate(aggregateQuery).exec();
      return {
        ...item._doc,
        users: user_list,
      }
    });
    let projects = await Promise.all(resultsPromises);
    return res.status(200).json({
      allProjectCnt: allProjectCnt,
      projects,
      exist_any
    });
  });
};

//Get Recent Projects
module.exports.getRecentProjects = async function(req, res) {
  const userId = auth.getUserId(req);
  const query = req.query?.query || '';
  let queryBody = { ownerId: userId };
  if (query) {
    const regex = new RegExp(query, 'i');
    const or = {
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { audience: { $regex: regex } },
      ],
    };
    queryBody = {
      $and: [queryBody, or],
    };
  }
  const allProjectCnt = await Project.countDocuments(queryBody);
  const q = Project.find(queryBody)
    .sort({ updatedAt: -1 })
    .limit(4);
  await q.exec((error, projects) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({
      allProjectCnt: allProjectCnt,
      projects,
    });
  });
};


//Rename Project
