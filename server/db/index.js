const mongoose = require('mongoose');
const config = require('../config');
const article = require('./models').article;

// Apply promise to the mongoose
mongoose.Promise = global.Promise;

/**
 * Try to connect to the DB
 * useMongoClient it's a flag to add more functions
 */
mongoose.connect(config.db.host, {useMongoClient: true})
  .then(
    // On success or cannot connect
    () => console.log('[OK] App connected to ' + config.db.host),
    (e) => console.log('[FAILED] Unable to establish connection to mongodb.', e)
  );

// Get mongoose connection
const db = mongoose.connection;

/**
 * Exporting models
 * @type {{db: *, user: *, toObjectId: *}}
 */
module.exports = {
  db,
  article,
};