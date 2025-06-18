const { Router } = require('express')
const { register, login } = require('../controller/auth')

const routes = Router()

// ======== auth routes ===================
routes.post('/auth/register', register)
routes.post('/auth/login', login)



module.exports = routes