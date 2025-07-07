const { Router } = require('express')
const { register, login,logout, forgotPassword,verifyEmailCode } = require('../controller/auth')
const { authChecker } = require('../middleware')
const {me, setProfile, updateProfile, deleteProfile} = require('../controller/user.js')
const { incomeGet, incomeIdGet, incomePost, incomeDelete, incomePut } = require('../controller/income.js')


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
routes.put('/user/update', authChecker, updateProfile)
routes.delete('user/delete', authChecker, deleteProfile)

// ================ income Routes ================
routes.get('/income/:limit/:page', authChecker, incomeGet)
routes.get('/income/:incomeId', authChecker, incomeIdGet)
routes.post('/income', authChecker, incomePost)
routes.put('/income/:incomeId', authChecker,incomePut)
routes.delete('/income/:incomeId', authChecker, incomeDelete)



module.exports = routes