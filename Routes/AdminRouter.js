const express = require("express");
const router = express.Router();
const {
  login,
  getBillings,
  ApproveBills,
  decisionText,
  billStatus,
  getAllUser,
} = require("../Controller/AdminController");

router.post("/login", login);
router.get("/getBillings", getBillings);
router.put("/ApproveBills/:billId", ApproveBills);
router.get("/decisionText", decisionText);
router.put("/billStatus/:billId", billStatus);
router.get("/getAllUser", getAllUser);

module.exports = router;
