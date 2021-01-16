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

exports.displayListPost = async (req, res, next) => {

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
                //console.log("arr: " + imgLink);

                const newPost = new postsModel.postModel({
                    idAccount: fields.accountID,
                    idPostType: req.params.id,
                    postContent: fields.postTitle,
                })

                const id = await newPost.save((err, id)=>{
                    return id;
                });

                const newItem = new itemModel.itemModel({
                    idAccount: fields.accountID,
                    idType: fields.itemType,
                    idPost: id,
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

