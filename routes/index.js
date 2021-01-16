var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', postController.getPostTypes);

module.exports = router;
