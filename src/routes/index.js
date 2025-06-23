const { Router } = require('express')
const { register, login,logout, forgotPassword } = require('../controller/auth')
const { authChecker } = require('../middleware')

const routes = Router()

// ======== auth routes ===================
routes.post('/auth/register', register)
routes.post('/auth/login', login)
routes.get ('/auth/logout', authChecker, logout)
routes.post('/auth/forgottenpassword', forgotPassword)



module.exports = routes