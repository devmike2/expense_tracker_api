const { hashPassword, generateToken, saveToken } = require("../helper/utils")
const User = require("../model/userModel")

const register = async (req,res) =>{
    try {
        console.log(req.body)
        const payload = req.body
        if(!payload) return res.status(400).json({status: false, message: 'Invalid payload'})
        const emailExist = await User.findOne({email: payload.email})
        if(emailExist) return res.status(409).json({status: false, message: 'email is already registered'})
        const encrypedPassword = await hashPassword(payload.password)
        const userData = {}
        userData.firstname = payload.firstname
        userData.lastname = payload.lastname
        userData.password = encrypedPassword
        userData.email = payload.email

        const user = await User.create(userData)
        const userDetails = {} 
        userDetails.email = user.email,
        userDetails.lastname = user.lastname,
        userDetails.firstname = user.firstname,
        userDetails._id = user._id,
        userDetails.verified = user.verfied
       
        const expires = new Date(Date.now() +  3*30*24*60*60*1000)
        if(user){
            console.log(userDetails)
            const token = await generateToken(userDetails)
            await saveToken(token, userDetails._id,expires, true )


            //email
            return res.status(200).json({
                status: true, 
                message: 'user created, chek email for verification',
                data: {userDetails, token}
            })
        }
        return res.status(500).json({
            status: false,
            message: 'User could not be created'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message || 'Internal server error'
        })
    }
}

const login = async (req, res) =>{

}

const logout = async (req, res) =>{

} 

const veriryEmailCode = async (req,res) =>{

}
const forgotPassword = async(req, res) =>{

}

module.exports ={
    register,
    login,
    logout,
    veriryEmailCode,
    forgotPassword
}