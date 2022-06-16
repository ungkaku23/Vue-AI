const ACTIVITY_CATEGORY = require('../../constants/activityCategories');
const Article = require('../../model/Article');
const { addActivityLog } = require('../../services/activity-log-service');
const auth = require('../../services/auth-service');

module.exports.index = function(req, res) {
  Article.findOne({ _id: req.params.id }, (error, article) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!article) {
      return res.status(404).json();
    }
    return res.status(200).json({ article });
  });
};

/* Create Article Info */
module.exports.createArticle = function(req, res) {
  const article = new Article({
    ...req.body,
    ownerId: auth.getUserId(req),
  });

  article.save((error, article) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.ARTICLE,
      description: 'A new article has been created',
      objectName: article.baseData.title,
      objectId: article._id,
    });
    return res
      .status(200)
      .json({ article, message: 'The Article has been created' });
  });
};

/* Update Article Info */
module.exports.updateArticle = function(req, res) {
  Article.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    async (error, article) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (article) {
        await addActivityLog(req, {
          category: ACTIVITY_CATEGORY.ARTICLE,
          description: 'A new article has been updated',
          objectName: article.baseData.title,
          objectId: article._id,
        });
        return res
          .status(200)
          .json({ article, message: 'The article has been updated' });
      }
    }
  );
};

//Delete Article
module.exports.deleteArticle = function(req, res) {
  Article.deleteOne({ _id: req.params.id }, function(err, article) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    addActivityLog(req, {
      category: ACTIVITY_CATEGORY.ARTICLE,
      description: 'Article has been deleted',
      objectName: '',
      objectId: req.params.id,
    });
    return res
      .status(200)
      .json({ article, message: 'Article has been deleted' });
  });
};

//Get Articles
module.exports.getArticles = async function(req, res) {
  const userId = auth.getUserId(req);
  const query = req.query?.query || '';
  let queryBody = { ownerId: userId };
  if (query) {
    const regex = new RegExp(query, 'i');
    const or = {
      $or: [
        { article: { $regex: regex } },
        { 'baseData.title': { $regex: regex } },
        { 'baseData.domain': { $regex: regex } },
        { 'baseData.authors': { $regex: regex } },
        { 'baseData.domain': { $regex: regex } },
      ],
    };
    queryBody = {
      $and: [queryBody, or],
    };
  }
  const q = Article.find(queryBody)
    .sort({ updatedAt: -1 })
    .limit(20);
  await q.exec((error, articles) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({ articles });
  });
};
