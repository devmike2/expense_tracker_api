const {Schema, default: mongoose} = require('mongoose')

const oauthSchema = new Schema ({
    token: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true,
        unique: true,
    },
    expire_in:{
        type: Date,
        required: true
    }
}, {timestamps: true})

const resetModel = new Schema({
    email:{
        required: true,
        type: String,
        lowercase: true
    },
    otp: {
        required: true,
        type:String,
        minlength: 6,
        maxlength: 6
    },
    expire_in:{
        required: true,
        type:Date
    }
}, {timestamps: true})

const Oauth = mongoose.model('Oauth_access_token', oauthSchema)
const Reset = mongoose.model('reset', resetModel)





module.exports = {Oauth, Reset}

