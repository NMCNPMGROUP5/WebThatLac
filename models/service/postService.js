const formidable = require('formidable');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fse = require('fs-extra');

cloudinary.config({
    cloud_name: 'hexadstore',
    api_key: "616475942262733",
    api_secret: "Cn2TDpeyyCBaLJr5ck5jB1i8d-g"
})

const postsModel = require("../mongoose/postsModel");
const itemModel = require("../mongoose/itemModel");

exports.getListPosts = async (req, res, next) => {
    const searchValue = req.query.searchValue || undefined;

    //Tạo ra query search
    let query= {};
    
    if(searchValue!=undefined){
        const regex =new RegExp(searchValue,"i");
        query = {$or:[ {description: regex },{area: regex },{fullName: regex },{idCharacteristics: regex}]};
    }

    console.log(query);

    const listPosts = await itemModel.itemModel.find(query)
        .populate({ path: "idAccount" })
        .exec().then(async (docs) => {
            const options = [{
                path: "idPost",
                model: "Post",
            }]

            const result = await postsModel.postModel.populate(docs, options);
            //console.log("listPosts: " + result);
            return result;
        });
    
    console.log(listPosts);
    return listPosts;
}

exports.getPostTypes = async (req, res, next) => {
    return await postsModel.postTypeModel.find({});
}

exports.getItemTypes = async () => {
    return await itemModel.itemTypeModel.find({});
}

exports.uploadImg = async (coverImg, cloudinaryFolder, res, next) => {
    fse.remove(coverImg.path, err => {
        if (err) return console.error(err);
        //console.log('success!');
    })

    const publicID = cloudinaryFolder + '/' + coverImg.path.split('\\').pop();
    await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(coverImg.path, { public_id: publicID }, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });

    return cloudinary.url(publicID);
}

exports.addPost = async (req, res, next) => {
    const form = formidable({ multiples: true });

    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            const coverImg = files.filename;
            //console.log(coverImg.path);

            if (coverImg && coverImg.size > 0) {
                const imgLink = await this.uploadImg(coverImg, 'itemImages');
                //const imgLink = "#";
                //console.log("arr: " + imgLink);
                console.log(req.user);
                const accountID = req.user._id;

                const newPost = new postsModel.postModel({
                    //idAccount: fields.accountID,
                    idAccount: accountID,
                    idPostType: req.params.id,
                    postContent: fields.postTitle,
                })

                let idPost;
                await newPost.save()
                    .then((id) => {
                        //console.log("id: " + id._id);
                        idPost = id._id;
                    });

                const newItem = new itemModel.itemModel({
                    //idAccount: fields.accountID,
                    idAccount: accountID,
                    idType: fields.itemType,
                    idPost: idPost,
                    image: imgLink,
                    description: fields.describeIncident,
                    area: fields.describeArea,
                    idCharacteristics: fields.idCharacteristics
                });

                await newItem.save();
                //console.log("newItem" + newItem);

                console.log("Save successful!");
            }

            resolve();
        });
    });
}

