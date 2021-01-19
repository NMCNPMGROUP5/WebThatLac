const postService = require('../models/service/postService');
const postsModel = require("../models/mongoose/postsModel");

exports.getPostTypes = async (req, res, next) => {
    const postType = await postService.getPostTypes();
    res.render('index', {title: 'Thất lạc', postType});
}

exports.displayAddPost = async (req, res, next) => {
    const itemType = await postService.getItemTypes();
    const postType = await postService.getPostTypes();
    res.render('postsView', {title: 'Thất lạc', itemType, postType, postTypeID: req.params.id});
}

exports.addPost = async (req, res, next) => {
    await postService.addPost(req, res, next);
    const itemType = await postService.getItemTypes();
    const postType = await postService.getPostTypes();
    res.render('postsView', {title: 'Thất lạc', itemType, postType, isSaved: true, postTypeID: req.params.id});
}

exports.displayListPosts = async(req, res, next)=>{
    const searchValue = req.query.searchValue;

    console.log(searchValue);
    const postType = await postService.getPostTypes();
    const listPosts = await postService.getListPosts(req,res,next);
    res.render('index', {title: 'Thất lạc', postType, listPosts});
}