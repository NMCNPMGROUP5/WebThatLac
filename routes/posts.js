const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

router.get('/add-post/:id', postController.displayAddPost);

router.post('/add-post/:id', postController.addPost);

module.exports = router;