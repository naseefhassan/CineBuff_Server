const mongoose = require("mongoose");

const decisionTextSchema = new mongoose.Schema({
  DecisionText: String,
});

const decisionText = new mongoose.model("decisionlists", decisionTextSchema);

module.exports = decisionText;
