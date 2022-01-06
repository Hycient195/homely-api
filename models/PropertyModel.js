const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    type: {
        type: String,
        required: [true, "Type of property is requird"]
    },
    location: {
        type: Object,
        required: [true, "Location is a is required."]
    },
    size: {
        type: String,
        required: [true, "Size of property is a is requird."]
    },
    noOfRooms: {
        type: Number
    },
    // images: {
    //     type: [String],
    //     required: "At least one image of property is requird."
    // },
    images : [],
    price: {
        type: Number,
        required: [true, "Price of property is requird."]
    },
    state: {
        type: String,
        required: [true, "State of location is requird."]
    },
    landmark: {
        type: String,
        required: [true, "A close landmark to property is required."]
    },
    description: {
        type: String
    },
    ownerId: {
        type: String,
        required:[true, "owner's Id is compulsory."]
    },
    furnishing: {
        type: String
    },
    bathrooms: {
        type: String
    },
    condition: {
        type: String
    },
    parkingSpace: {
        type : String
    },
    keywords:[]
},{
    timestamps : true
})

const PropertyModel = mongoose.models.property || mongoose.model('property', PropertySchema)
module.exports = PropertyModel;

