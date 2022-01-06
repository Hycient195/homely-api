const express = require('express');
const authenticate = require('../middleware/authenticate.js');
const 
    { getProperties, getSingleProperty, updateProperty, createNewProperty,
    sortByParameter, searchProperties
    } = 
    require('../controllers/propertyControllers.js');

const router  = express.Router()

    /* Tested */
router.route('/')
    .get(getProperties)

    /* Tested */
// router.route('/:property_name?_id=/:property_id')
router.route('/:property_name')
    .get(getSingleProperty)

    /* Tested */
router.route('/update/:id')
    .post(updateProperty)

    /* Tested */
router.route('/create')
    .post(authenticate, createNewProperty)

router.route('/sort')
    .post(sortByParameter)

router.route('/search')
    .post(searchProperties)

module.exports = router