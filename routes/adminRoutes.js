const express = require('express');

const  { createNewAdmin, fetchAllVendorProfiles, fetchSingleVendorProperties,
    fetchVendorDetails, deleteVendorProfile }
    = require('../controllers/adminController');
const router = express.Router('../controllers/adminController.js')

    /* Tested */
router.route('/create')
    .post(createNewAdmin)

    /* Tested */
router.route('/vendors')
    .get(fetchAllVendorProfiles)

    /* Tested */
router.route('/vendors/:id')
    .get(fetchVendorDetails)

    /* Tested */
router.route('/vendor/:id')
    .get(fetchSingleVendorProperties)

    /* Tested */
router.route('/delete_vendor')
    .delete(deleteVendorProfile)


module.exports = router