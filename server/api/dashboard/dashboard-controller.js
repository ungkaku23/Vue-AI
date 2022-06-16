const Article = require('../../model/Article');
const Note = require('../../model/Note');
const auth = require('../../services/auth-service');
const mongoose = require('mongoose');
const {
  getActivityLogsByUserId,
} = require('../../services/activity-log-service');
const ActivityLog = require('../../model/ActivityLog');
const Project = require('../../model/Project');
const File = require('../../model/File');

module.exports.index = async function(req, res) {
  const userId = auth.getUserId(req);
  let queryBody = { ownerId: userId };
  try {
    const q = Article.countDocuments(queryBody);
    const allActivityCnt = await ActivityLog.countDocuments(queryBody);
    const activityLogs = await getActivityLogsByUserId(req);
    const cntArticles = await q.exec();

    const q3 = Note.countDocuments(queryBody);
    const cntNotes = await q3.exec();
    const aggregateQuery_incompleted = [
      {
        $match: {
          ownerId: mongoose.Types.ObjectId(userId),
          status: { $ne: 'Completed'}
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];

    const aggregateQuery_completed = [
      {
        $match: {
          ownerId: mongoose.Types.ObjectId(userId),
          status: 'Completed'
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];
    
    const incompletedFiles = await File.aggregate(aggregateQuery_incompleted).exec();
    const completedFiles = await File.aggregate(aggregateQuery_completed).exec();

    // for statistic data
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let fir = new Date(firstday.getFullYear() + '-' + (firstday.getMonth() + 1) + '-' + firstday.getDate());
    let las = new Date(lastday.getFullYear() + '-' + (lastday.getMonth() + 1) + '-' + lastday.getDate());

    const allProjectCnt = await Project.countDocuments(queryBody);
    const recentProjectCnt = await Project.countDocuments({
      ...queryBody,
      "createdAt": {"$gte": fir, "$lt": las}
    });
    const allProgressFiles = await File.countDocuments({
      type: 'file',
      status: 'In-Progress',
    });
    const recentProgressFiles = await File.countDocuments({
      type: 'file',
      status: 'In-Progress',
      "createdAt": {"$gte": fir, "$lt": las}
    });
    const allCompletedFiles = await File.countDocuments({
      type: 'file',
      status: 'Completed',
    });
    const recentCompletedFiles = await File.countDocuments({
      type: 'file',
      status: 'Completed',
      "createdAt": {"$gte": fir, "$lt": las}
    });
    const statisticData = {
      project_cnt: allProjectCnt,
      recent_project_cnt: recentProjectCnt,
      progress_task: allProgressFiles,
      recent_progress_task: recentProgressFiles,
      completed_task: allCompletedFiles,
      recent_completed_task: recentCompletedFiles,
    }
    ////
    return res.status(200).json({
      stats: {
        articles: cntArticles,
        notes: cntNotes,
      },
      recentData: {
        incompleted: incompletedFiles,
        completed: completedFiles,
      },
      activities: activityLogs,
      allActivityCnt: allActivityCnt,
      statisticData: statisticData
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.recentProjects = async function(req, res) {
  const userId = auth.getUserId(req);
  let queryBody = { ownerId: userId };
  try {
    const allProjectCnt = await Project.countDocuments(queryBody);
    const projects = await Project.find(queryBody)
      .sort({ updatedAt: -1 })
      .limit(6)
      .exec();

    return res.status(200).json({
      allProjectCnt: allProjectCnt,
      projects: projects,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
