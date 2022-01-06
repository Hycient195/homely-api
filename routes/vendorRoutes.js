const express = require('express');

const { sign_upVendor, sign_inVendor, updateVendorProfile, deleteVendorProfile,
    fetchVendorProperties
} = require('../controllers/vendorController.js')

const router = express.Router()

    /* Tested */
router.route('/sign_up')
    .post(sign_upVendor)

    /* Tested */
router.route('/sign_in')
    .post(sign_inVendor)

    /* Tested */
router.route('/update/:id')
    .patch(updateVendorProfile)

    /* Tested */
router.route('/delete')
    .delete(deleteVendorProfile)

router.route('/fetch_properties/:id')
    .get(fetchVendorProperties)

module.exports = router