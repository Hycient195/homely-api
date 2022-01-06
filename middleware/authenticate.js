const jwt = require('jsonwebtoken');

module.exports = authenticate = (req, res, next)=>{  

    try {
       const token = req.headers.authorization.split(' ')[1]
       const isCustomToken = token.length < 500
        let decodedData;

        if(token && isCustomToken){
            decodedData = jwt.verify(token, process.env.JWT_SECRET_STRING)
            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log('Unable to verify user token')
        res.status(400).json({ message : 'Unable to verify user token'})
    }
    
}
