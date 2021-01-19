const express = require('express');
const router = express.Router();

const loginMiddle = require('../middlewares/loginMiddleware');

const postController = require("../controllers/postController");

router.get('/add-post/:id',loginMiddle.restrict, postController.displayAddPost);

router.post('/add-post/:id', postController.addPost);

module.exports = router;