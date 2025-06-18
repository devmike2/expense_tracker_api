const { default: mongoose } = require('mongoose')

require('dotenv').config()
const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS
    }
})

const connection = async() =>{
    try {
        const connect  = await mongoose.connect(process.env.MONGO_URI)
        if(connect) return connect
    } catch (error) {
        console.log(error)

    }
}


module.exports = {
    port : process.env.PORT,
    node_env : process.env.NODE_ENV,
    jwt_secret : process.env.SECRET_KEY,
    email_sender: process.env.EMAIL_SENDER,
    frontrnd_uri: process.env.FRONTEND_URI,
    db_connect: connection,
    transporter
}