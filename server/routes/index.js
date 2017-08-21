const express       = require('express');
const bodyParser    = require('body-parser');
const utils    	 		= require('../utils/functions');
const article 			= require('../api');
const path 					= require('path');
const ROOT				 	= path.resolve(__dirname + "/../../");

let router = express.Router();

/**
 * Parse body for application/json
 */
router.use(bodyParser.json());


/**
 * Add methods to the response
 */
router.use(utils.addFunctionsResponse);


/**
 * Our APIs
 */
router.get('/api/results', article.getList);
router.get('/api/article', article.getListToUpdate);

router.post('/api/add', article.add);
router.put('/api/approve', article.approve);
router.delete('/api/delete/:id', article.remove);


/**
 * Send html
 */
router.use('/public', express.static(path.join(ROOT, 'public')));
router.get('/fb', (req, res) => res.sendFile(`${ROOT}/client/index.html`));
router.get('/fb/results', (req, res) => res.sendFile(`${ROOT}/client/index.html`));


/**
 * If route didn't use, send 404
 */
router.use((request, response) => {
  response.sendStatus(404);
});


module.exports = router;
