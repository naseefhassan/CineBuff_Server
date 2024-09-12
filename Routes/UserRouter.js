const express = require('express')
const router = express.Router()
const {signup,login,xlsx}= require('../Controller/UserController')

router.post('/signup',signup)
router.post('/login',login)
router.get('/xlsx',xlsx)

module.exports = router