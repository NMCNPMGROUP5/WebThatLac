const postService = require('../models/service/postService');
const postsModel = require("../models/mongoose/postsModel");

exports.getPostTypes = async (req, res, next) => {
    const postType = await postService.getPostTypes();
    res.render('index', {title: 'Thất lạc', postType});
}



exports.displayAddPost = async (req, res, next) => {
    const itemType = await postService.getItemTypes();
    const postType = await postService.getPostTypes();
    res.render('postsView', {itemType, postType, postTypeID: req.params.id});
}

exports.addPost = async (req, res, next) => {
    await postService.addPost(req, res, next);
    const itemType = await postService.getItemTypes();
    const postType = await postService.getPostTypes();
    res.render('postsView', {itemType, postType, isSaved: true});
}