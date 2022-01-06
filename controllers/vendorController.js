const VendorModel = require('../models/VendorModel');
const PropertyModel = require('../models/PropertyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


/* Method POST - localhost:7000/api/vendor/sign_up */
module.exports.sign_upVendor = async (req, res) =>{
    const vendor = req.body
    console.log(vendor)
    try {
        const emailExists = await VendorModel.findOne({ email : vendor.email})

        if(emailExists) res.status(400).json({message : 'This email already exists'})

        const phoneNoExists = await VendorModel.findOne({ phoneNumber : vendor.phoneNumber})

        if(phoneNoExists) res.status(400).json({message : 'This phone number is already in use'})

        const hashedPassword = await bcrypt.hash(vendor.password, 12)
        
        const newVendor = await VendorModel.create({
            firstName : vendor.firstName,
            lastName : vendor.lastName,
            email : vendor.email,
            phoneNumber : vendor.phoneNumber,
            password : hashedPassword,
            avatar : vendor.avatar
        })

        const token = jwt.sign({newVendor : newVendor.email, id : newVendor._id}, process.env.JWT_SECRET_STRING,{
            expiresIn : '1d'
        })
        res.status(200).json({ result : newVendor, token : token })
        
    } catch (error) {
        console.log(`Unable to create new vendor ${error}`)
        res.status(404).json({message : 'Unable to create new vendor'})
    }
}


/* Method POST - localhost:7000/api/vendor/sign_in */
module.exports.sign_inVendor = async (req, res) =>{
    const { email, password } = req.body

    try {
        const existingUser = await VendorModel.findOne({ email });

        if(!existingUser) res.status(404).json({message : `Email does not exist`});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) res.status(404).json({message : `Invalid Password`});
        console.log(isPasswordCorrect)
        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.JWT_SECRET_STRING,{
            expiresIn : '1d'
        });

        res.status(200).json({ result : existingUser, token : token });
        
    } catch (error) {
        console.log('Unable to sign in vendor', error)
        res.status(404).json({message : 'Unable to sign in vendor'})
    }
}


/* Method PATCH - localhost:7000/api/vendor/update/6121198cc38d8db3c000d57e */
module.exports.updateVendorProfile = async (req, res) =>{
    const vendorId = req.params.id;
    const updatedVendor = req.body;
    console.log(updatedVendor);
    try {
        const vendor = await VendorModel.findOne({ _id : updatedVendor._id});

        let hashedPassword = '';

        if(updatedVendor.password !== ''){
            hashedPassword = await bcrypt.hash(updatedVendor.password, 12)
        }

        const update = {
            _id : vendor._id,
            firstName : updatedVendor.firstName || vendor.firstName,
            lastName : updatedVendor.lastName || vendor.lastName,
            email : updatedVendor.email || vendor.email,
            password : hashedPassword || vendor.password,
            avatar : updatedVendor.avatar || vendor.avatar
        }

        await VendorModel.findByIdAndUpdate(vendorId, update);

        const newUpdatedVendor = await VendorModel.findById(vendorId);

        res.status(200).json({ result : newUpdatedVendor });

    } catch (error) {
        console.log(`Unable to update profile ${error}`);
        res.status(400).json({message : `Unable to update profile ${error}`});
    }
}

/* Method DELETE - localhost:7000/api/vendor/delete */
module.exports.deleteVendorProfile = async (req, res) =>{
    const { vendorId } = req.body

    try {
        await VendorModel.findByIdAndDelete(vendorId)
        await PropertyModel.deleteMany({ ownerId : vendorId})
        console.log('User account and properties deleted sucessfully')
        res.status(200).json({message : 'User account and properties deleted sucussfully'})
    } catch (error) {
        console.log('Unable to delete user account')
        res.status(404).json({message : 'Unable to delete user account'})
    }
}

/* Method GET - localhost:7000/api/vendor/:id */
module.exports.fetchVendorProperties = async (req, res) =>{
    const vendorId = req.params.id
    console.log(vendorId)

    try {
        const vendorProperties = await PropertyModel.find({ownerId : vendorId})
        // console.log(vendorProperties)
        res.status(200).json(vendorProperties)
    } catch (error) {
        console.log('Unable to fetch vendor properties')
        res.status(404).json({message : 'Unable to fetch vendor properties'})
    }
}
