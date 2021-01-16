const mongoose= require('mongoose');
const Schema = mongoose.Schema();
//const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = mongoose.Schema({
    idAccount: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'Account'},
    postState: {type: String, default: "Chưa duyệt", require: true},
    idPostType: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'PostType'},
    postContent: {type: String, require: true},
    postDate: {type: Date, default: Date.now()},
});

const postTypeSchema = mongoose.Schema({
    typeName: {type: String}
});

const post = mongoose.model('Post', postSchema, "Posts" );
const postType= mongoose.model('PostType', postTypeSchema, "PostTypes" );

module.exports = {
    postModel: post,
    postTypeModel: postType,
}
