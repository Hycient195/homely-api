const mongoose = require('mongoose');

const VendorSchema = mongoose.Schema({
    firstName : {
        type : String,
        minlength : 1,
        required : [true, 'FirstName field is empty']
    },
    lastName : {
        type : String,
        minlength : 1,
        required : [true, 'Lastname field is empty']
    },
    email : {
        type : String,
        unique : true,
        required : [true, 'No email provided'],
        validator: (value) =>
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            value
        ),
    },
    phoneNumber : {
        type : String,
        unique : true,
        required : [true, 'No phone number provided']
    },
    password : {
        type : String,
        minlength : [4, 'Password must be more than 4 characters long'],
        required : [true, 'No password provided']
    },
    avatar : {
        type : String,
        required : [true, 'No profile Picture provided']
    }
},{
    timestamps : true
})

const VendorModel = mongoose.model('vendor', VendorSchema)
module.exports = VendorModel