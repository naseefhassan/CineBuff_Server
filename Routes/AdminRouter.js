const express = require("express");
const router = express.Router();
const {login} = require('../Controller/AdminController');

router.post('/login',login)

module.exports = router