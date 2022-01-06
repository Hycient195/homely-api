const AdminModel = require('../models/adminModel.js');
const VendorModel = require('../models/VendorModel.js');
const PropertyModel = require('../models/PropertyModel.js')


/* Method POST - localhost:7000/api/admin/create */
module.exports.createNewAdmin = async (req, res) =>{
    const adminDetails = req.body

    try {
        const adminExists = await AdminModel.findOne({ email : adminDetails.email })

        if(adminExists)res.status(404).json({ message : 'Email is already registered' })

        const newAdmin = await AdminModel.create(adminDetails)

        res.status(200).json(newAdmin)
    } catch (error) {
        console.log('Error occoured in creating new admin')
        res.status(200).json('Error occoured in creating new admin')
    }
}

/* Method GET - localhost:7000/api/admin/vendors */
module.exports.fetchAllVendorProfiles = async (req, res) =>{
    try {
        const allVendors = await VendorModel.find({})
        res.status(200).json(allVendors)
    } catch (error) {
        console.log('Unable to fetch vendor prodiles')
        res.status(404).json({message : 'Unable to fetch vendor prodiles'})
    }
}

/* Method GET - localhost:7000/api/admin/vendors/61215e58f003b4bb246a2906 */
module.exports.fetchVendorDetails = async (req, res) =>{
    const vendorId = req.params.id

    try {
        const vendor = await VendorModel.findById(vendorId)
        res.status(200).json(vendor)
    } catch (error) {
        console.log('Unable to fetch vendor details')
        res.status(404).json({ message : `Unable to fetch vendor details`})
    }
}

/* Method GET - localhost:7000/api/admin/vendor/61215e58f003b4bb246a2906 */
module.exports.fetchSingleVendorProperties = async (req, res) =>{
    const vendorId = req.params.id
    // const singleVendorProperties = req

    try {
        const singleVendorProperties = await PropertyModel.find({ownerId : vendorId})
        res.status(200).json(singleVendorProperties)
    } catch (error) {
        console.log(`Unable to fetch the single vendor's product`)
        res.status(404).json({message : `Unable to fetch the single vendor's product`})
    }
}

/* Method DELETE - localhost:7000/api/admin/delete_vendor */
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