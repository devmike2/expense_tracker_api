const { Router } = require('express')
const { register, login,logout, forgotPassword,verifyEmailCode } = require('../controller/auth')
const { authChecker } = require('../middleware')
const {me, setProfile} = require('../controller/user.js')


const routes = Router()

// ======== auth routes ===================
routes.post('/auth/register', register)
routes.post('/auth/login', login)
routes.get ('/auth/logout', authChecker, logout)
routes.post('/auth/forgottenpassword', forgotPassword)
routes.post('/auth/verify-account', verifyEmailCode)

//============ user routes ==============
routes.get('/user/me',authChecker, me)
routes.post('/user/add', authChecker, setProfile)



module.exports = routes