const { hashPassword, generateToken, saveToken, comparePassord, sendEmail, siteName } = require("../helper/utils")
const { Reset } = require("../model")
const User = require("../model/userModel")
const fs = require('fs')

let registerEmail = fs.readFileSync('./src/assets/emails/signupEmail.html', 'utf-8')

const register = async (req,res) =>{
    try {
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
            const token = generateToken(userDetails)
            await saveToken(token, userDetails._id,expires, true )
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const expire_in = new Date(Date.now() + 60*60*1000)
            await Reset.create({
                otp,
                expire_in,
                email: userDetails.email
            })
            const signupEmail = registerEmail.replace('{{code}}', otp)
            .replace('{{name}}', userDetails.firstname)
            .replaceAll('{{siteName}}', siteName)
            await sendEmail(userDetails.email, 'Verify account',signupEmail )
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
    try {
        const payload = req.body
        if(!payload) return res.status(400).json({status:false, message: 'Invalid payload'})
        const user = await User.findOne({email: payload.email})
        if(!user)return res.status(400).json({status: false, message: 'Email is not registered'})
        const auth = comparePassord(payload.password, user.password)
        if(!auth) return res.status(403).json({status: false, message: 'invalid password'})
        const userDetails = {}
        userDetails.email = user.email,
        userDetails.lastname = user.lastname,
        userDetails.firstname = user.firstname,
        userDetails._id = user._id,
        userDetails.verified = user.verfied
        const expires = new Date(Date.now() +  3*30*24*60*60*1000)
        const token  = generateToken(userDetails)
        await saveToken(token, userDetails._id,expires, true)

        return res.status(200).json({
            status: true,
            message: 'Login successful',
            data: {userDetails, token}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Internal server error'
        })
    }
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