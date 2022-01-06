const { Document } = require('mongoose')
const PropertyModel = require('../models/PropertyModel.js')
const JSONStream = require('JSONStream');


module.exports.createNewProperty = async (req, res) =>{
    const { 
        title, type, location, size, noOfRooms, images, price, state, landmark, 
        description, ownerId, furnishing, bathrooms, condition, parkingSpace, keywords 
    } = req.body

    try {
        const property =  await new PropertyModel({
            title, type, location, size, noOfRooms, images, price, state, landmark, 
            description, ownerId, furnishing, bathrooms, condition, parkingSpace, keywords 
        })
        const newProperty = await property.save()
        res.status(200).json(newProperty)
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Unable to create new property'})
    }

}

module.exports.getProperties = async (req, res) =>{
    try {
        const allProperties = await PropertyModel.find({})
        res.status(200).json(allProperties)


        // res.set('Content-Type', 'application/json');
        // await PropertyModel.find().stream().pipe(JSONStream.stringify()).pipe(res)

      
    } catch (error) {
        console.log(`Error occoured in fetching all properties`)
        res.status(404).json({message : 'Error occoured in fetching all properties'})
    }
}

module.exports.getSingleProperty = async (req, res) =>{
    const { property_name } = req.params
    const { _id } = req.query
    console.log(property_name, _id)

    try {
        const property = await PropertyModel.findById({ _id });
        res.status(200).json(property)
    } catch (error) {
        console.log(`Error occoured in fetching property`)
        res.status(400).json({message : 'Error occoured in fetching property'})
    }
}

module.exports.updateProperty = async (req, res) =>{
    const { id } = req.params
    const propertyDetails = req.body
    
    try {
        await PropertyModel.findByIdAndUpdate(id, propertyDetails)

        const property = await PropertyModel.findById(id)

        console.log(property)

        res.status(200).json(property)

    } catch (error) {
        console.log(`Error occoured in updating property`)
        res.status(404).json({message : 'Error occoured in updating property'})
    }
}

module.exports.sortByParameter = async (req, res) =>{
    const { parameter, value } = req.body
    console.log(req.body)
    try {
        const property = await PropertyModel.find({ [parameter] : value })
        console.log(property)
        res.status(200).json(property)
    } catch (error) {
        console.log(`Unable to sort ${value} according to ${parameter}`)
        res.status(400).json({message : `Unable to sort ${value} according to ${parameter}`})
    }
}

module.exports.searchProperties = async (req, res) =>{
    const  { query }  = req.body
    const queryString = query.toLowerCase()
    console.log(queryString)

    try {
        const properties = await PropertyModel.find({})
        const arr = []
        properties.map((property)=>{
            if(property.title.toLowerCase().includes(queryString) | 
                property.location.toLowerCase().includes(queryString) | 
                property.type.toLowerCase().includes(queryString) 
                // property.description.toLowerCase().includes(queryString)
            ){
                arr.push(property)
            }
        })
        res.status(200).json(arr)
    } catch (error) {
        console.log('Property Does not exist')
        res.status(400).json({message : 'Property does not exist'})
    }
}