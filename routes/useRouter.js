const router = require('express').Router()
const userCtrl = require('../controllers/useCtrl')
const auth = require('../middleware/auth')

router.post('/register',userCtrl.register)

router.post('/login',userCtrl.login)

router.get('/logout',userCtrl.logout)

router.get('/refresh_token',userCtrl.refreshToken)

router.get('/infor', auth,userCtrl.getUser)

router.patch('/addcart', auth,userCtrl.addCart)

router.get('/history', auth, userCtrl.history)

router.get('/contact', auth, userCtrl.contact)




    


module.exports = router