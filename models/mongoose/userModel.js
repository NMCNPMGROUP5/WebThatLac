const mongoose= require('mongoose');
const Schema = mongoose.Schema();

//Tạo model
const userSchema = mongoose.Schema({
    name: {type: String, require: true},//Tên đăng nhập
    userName: {type: String, require: true},//Họ tên
    password: {type: String, require: true},
    email: {type: String, require: true},
    phoneNumber: {type: String, require: true},  
    avatar: {type: String},
    DoB:  {type: String, require: true},
    address: {type: String, require: true},
    gender: {type: String, enum: ["nam","nữ"], require: true},
})



module.exports = mongoose.model('users', userSchema )