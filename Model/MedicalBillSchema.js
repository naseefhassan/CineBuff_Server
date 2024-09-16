const mongoose = require("mongoose");

const medicalBillSchema = new mongoose.Schema({
  PatientName: { type: String, required: true },
  DoctorName: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  ProcedureCode: { type: String, required: true },
  ProcedureDescription: { type: String, required: true },
  Amount: { type: String, required: true },
  DateOfService: { type: String, required: true },
  SpecialityCode: { type: String, required: true },
  BillStatus: { default: "Pending", type: String, required: true },
});

const MedicalBill = new mongoose.model("medicalbills", medicalBillSchema);
module.exports = MedicalBill;
