const jwt = require("jsonwebtoken");
const MedicalBillSchema = require("../Model/MedicalBillSchema");
const DecisionListsSchema = require("../Model/DecisionTextSchema");
const Userschema = require("../Model/userSchema");
const UserSchema = require("../Model/userSchema");


const object = {
  login: async (req, res) => {
    const predefinedEmail = "admin@gmail.com";
    const predefinedPassword = "password123";
    const { email, password } = req.body;

    if (email === predefinedEmail && password === predefinedPassword) {
      const payload = {
        email: email,
        role: "admin",
      };
      // Generate a JWT
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "24h",
      });
      res.status(200).json({ message: "Login sucess", token });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  },
  getBillings: async (req, res) => {
    try {
      const billings = await MedicalBillSchema.find();
      res
        .status(200)
        .json({ message: "medical bills fetched successfully", billings });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "failed to fetch medical bills" });
    }
  },
  ApproveBills: async (req, res) => {
    try {
      const { billId } = req.params;
      const ApproveBill = await MedicalBillSchema.findByIdAndUpdate(
        { _id: billId },
        { BillStatus: "Approved" },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "bill status changed into Approved", ApproveBill });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "failed to updated billstatus" });
    }
  },
  decisionText: async (req, res) => {
    try {
      const DecisionLists = await DecisionListsSchema.find();
      res
        .status(200)
        .json({ message: "decision list fetched successfully", DecisionLists });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "failed to fetch decision lists" });
    }
  },
  billStatus: async (req, res) => {
    try {
      const { decisionId } = req.body;
      const { billId } = req.params;

      const rejectReason = await DecisionListsSchema.find({ _id: decisionId });
      const reason = rejectReason[0].DecisionText
      await MedicalBillSchema.findByIdAndUpdate(
        { _id: billId },
        { BillStatus: "Rejected", RejectReason: reason },

        { new: true }
      );
      res.status(200).json({ message: "billstatus updated to rejected" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "failed to reject the bill" });
    }
  },
  getAllUser:async(req,res)=>{
    try {
      const User = await UserSchema.find()
      res.status(200).json({message:'user details fetched successfully',User})
    } catch (error) {
     console.error(error);
     res.status(400).json({ message: "failed to fetch the user details" });
    }
  },
};

module.exports = object;
