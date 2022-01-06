const mongoose = require('mongoose')

module.exports.dbConnection = () =>{
    // console.log(process.env.MONGO_DB_URL)
    mongoose.connect(process.env.MONGO_DB_URI,{
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
