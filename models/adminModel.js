const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    firstName : {
        type : String,
        minlength : 1,
        required : true
    },
    lastName : {
        type : String,
        minlength : 1,
        required : [true, 'Lastname field is empty']
    },
    email : {
        type : String,
        unique : true,
        required : [true, 'No email provided']
    },
    phoneNumber : {
        type : String,
        required : [true, 'No phone number provided']
    },
    password : {
        type : String,
        required : [true, 'No password provided']
    },
})

const AdminModel = mongoose.model('admin', AdminSchema);
module.exports = AdminModel;