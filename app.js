const express = require("express");
const app = express();
const port = 4444;
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoDb = require('./Confiq/Config')
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const UserRouter= require('./Routes/UserRouter')

app.use('/',UserRouter)

mongoDb().then(() => {
  try {
     app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
     });
  } catch (error) {
     console.log(error, "Server failed to start");
  }
 });