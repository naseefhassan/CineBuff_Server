const express = require('express')
const router = express.Router()
const {signup,login,xlsxToDb,addrationale,showRationale}= require('../Controller/UserController')

router.post('/signup',signup)
router.post('/login',login)
router.post('/addrationale',addrationale)
router.get('/showRationale',showRationale)

router.get('/xlsxToDb',xlsxToDb)

module.exports = router