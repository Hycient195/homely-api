const mongoose = require('mongoose')

module.exports.dbConnection = () =>{

    let MONGO_STRING;
    process.env.NODE_ENV == 'development' ?
        MONGO_STRING = process.env.MONGO_DB_URI :
        MONGO_STRING = process.env.MONGO_DB_URL

        mongoose.connect(MONGO_STRING,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
        // useCreateIndex : true,
        // useFindAndModify : false
    })

    .then(()=>{
        console.log(`Connected suceccfuly to database`)
    })
    .catch((err)=>{
        console.log(`Error occoured in connection ${err}`)
        process.exit(1)
    })
}
