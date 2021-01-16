const mongoose= require('mongoose');
const Schema = mongoose.Schema();
//const mongoosePaginate = require('mongoose-paginate-v2');

const itemSchema = mongoose.Schema({
    idPost: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'Post'},
    idAccount: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'Account'},
    idType: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'ItemType'},
    image: {type: String, require: true},
    description: {type: String, require: true},
    area: {type: String, require: true},
    idCharacteristics: {type: String, require: true},
    fullName: {type: String, require: true},
});

const itemTypeSchema = mongoose.Schema({
    typeName: {type: String, require: true},
});

const item = mongoose.model('Item', itemSchema, "Items" );
const itemType = mongoose.model('ItemType', itemTypeSchema, "ItemTypes" );

module.exports = {
    itemModel: item,
    itemTypeModel: itemType,
}