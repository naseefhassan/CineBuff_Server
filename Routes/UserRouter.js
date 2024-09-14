const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  xlsxToDb,
  addrationale,
  showRationale,
  getRationale,
  editRationale,
  deleteRationale
} = require("../Controller/UserController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/addrationale", addrationale);
router.get("/showRationale", showRationale);
router.get("/getRationale/:rationaleID", getRationale);
router.put('/editRationale/:rationaleID',editRationale)
router.delete('/deleteRationale/:delId',deleteRationale)

router.get("/xlsxToDb", xlsxToDb);

module.exports = router;
