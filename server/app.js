const express = require('express');
const config = require('./config');
const routes = require('./routes');


/**
 * Initialize express server
 */
let app = express();

/**
 * Use routes
 */
app.use(routes);


/**
 * Start server
 */
app.listen(config.port, () => {
  console.log('[OK] Api server listening on port ' + config.port);
});
