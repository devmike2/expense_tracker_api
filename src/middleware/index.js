const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../../config')
const { Oauth } = require('../model')

const authChecker = async (req,res,next) =>{
    try {
        const {authorization} = req.headers
        if(!authorization) return res.status(401).json({status:false, message: 'Token not found'})
        const token = authorization.split(' ')[1]
        const exist = await Oauth.findOne({token})
        
        if(!exist) return res.status(401).json({status: false, message: 'Invalid token'})
        const now = new Date(Date.now())
        if(exist.expire_in < now) return res.status(401).json({status: false, message: 'Expired token'})
        const decoded = jwt.verify(token, jwt_secret)
        if(!decoded) return res.status(401).json({status:false, message: 'Invalid token'})
        req.user_id = decoded._id
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Internal server error '
        })
    }
}


module.exports = {
    authChecker
}