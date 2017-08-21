const db = require('../db');
const utils = require('../utils/functions');

const Article = {

  /**
   * Get list of proposed changes
   * @param request
   * @param response
   */
  getList(request, response) {
    db.article.aggregate()
      .match({isApproved: false})
      .project({id: "$_id", _id: 0, articleUrl: 1, originalText: 1, usersText: 1})
      .then((items) => {
        response.sendJson(items);
      })
      .catch((error) => {
        console.log(error);
        response.sendError('Cannot get list');
      });
  },

  /**
   * Parse article by url and return text by paragraphs
   * @param request
   * @param response
   * @returns {Promise|Promise.<TResult>}
   */
  getListToUpdate(request, response) {
    const {url} = request.query;
    // TODO use redis to cache this results to 5-10 minutes
    return utils.parseArticle(url).then((data) => {
      response.sendJson(data);
    }).catch((error) => {
      console.log(error);
      response.sendError('Cannot get list of the article');
    });
  },

  /**
   * Add users text to be approved
   * @param request
   * @param response
   */
  add(request, response) {
    const {articleUrl, originalText, usersText} = request.body;
    // here we can validate, but we just add simple check
    if (!articleUrl || !originalText || !usersText) {
      return response.sendError(`Didn't get all required params`);
    }

    // Create new post
    const newPost = new db.article({
      articleUrl,
      originalText,
      usersText,
      isApproved: false
    });

    // Save it
    newPost.save().then((data) => {
      response.sendJson('success');
    }).catch((error) => {
      console.log(error);
      response.sendError('Cannot add thi one');
    });
  },

  /**
   * Approve current changes
   * @param request
   * @param response
   */
  approve(request, response) {
    const {id} = request.body;
    // here we can validate, but we just add simple check
    if (!id) {
      return response.sendError(`Didn't get all required params`);
    }

    // Approve users text
    db.article
      .update({ _id: id }, { isApproved: true })
      .then(({n, nModified, ok}) => {
        if (!n || !nModified || !ok) {
          return Promise.reject('Cannot approve this one')
        }
        // Success
        response.sendJson('success');
      })
      .catch((error) => {
        console.log(error);
        response.sendError('Cannot approve this one');
      });
  },

  /**
   * Decline changes
   * @param request
   * @param response
   */
  remove(request, response) {
    const {id} = request.params;
    // here we can validate, but we just add simple check
    if (!id) {
      return response.sendError(`Didn't get all required params`);
    }

    // Approve users text
    db.article
      .findByIdAndRemove(id)
      .then((result) => response.sendJson('success'))
      .catch((error) => {
        console.log(error);
        response.sendError('Cannot remove');
      });
  },

};

module.exports = Article;
