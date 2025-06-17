const { Router } = require('express')
const { register } = require('../controller/auth')

const routes = Router()

routes.post('/auth/register', register)



module.exports = routes