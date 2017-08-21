// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const articleSchema = new Schema({
  articleUrl: String,
  originalText: String,
  usersText: String,
  isApproved: Boolean
});

// we need to create a model using it
module.exports.article = mongoose.model('Article', articleSchema);