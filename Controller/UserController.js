const Userschema = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const xlsx = require('xlsx');
const fs = require('fs');
const mongoose = require('mongoose');

const object = {
  // Signup function
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await Userschema.findOne({ email });

      if (existingUser) {
        res.status(400).json({ message: "Email is already in use" });
      } else {
        //bcryting password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new Userschema({
          username,
          email,
          password: hashPassword,
        });
        await newUser.save();

        //Token generation
        const token = jwt.sign({ email }, process.env.JWT_KEY, {
          expiresIn: 1 * 24 * 60 * 60, // 1 day
        });
        res.status(200).json({ message: "Signup success", token });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // Login function
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await Userschema.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({ message: `User not found with email ${email}` });
      }

      const passCheck = bcrypt.compareSync(password, existingUser.password);
      if (!passCheck) {
        return res.status(400).json({ message: "Password does not match" });
      }

      const token = jwt.sign({ email }, process.env.JWT_KEY, {
        expiresIn: 1 * 24 * 60 * 60, 
      });
      return res.status(200).json({ message: "Login Success", token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // XLSX  function
  xlsx: async (req, res) => {
    const filePath = 'C:\\Users\\User\\Downloads\\Rationale List Manager - Data (1).xlsx';
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error('File not found');
        }

        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;

        // Loop through each sheet in the workbook
        for (const sheetName of sheetNames) {
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

            // Define the collection name by removing spaces
            const collectionName = sheetName.replace(/\s/g, '');

            // Check if the collection already exists, otherwise create it
            if (mongoose.connection.models[collectionName]) {
                console.log(`Collection '${collectionName}' already exists Please use another.`);
            } else {
                // Create a dynamic schema for each collection
                const schema = new mongoose.Schema({}, { strict: false });
                const collection = mongoose.connection.model(collectionName, schema);

                // Insert data into the collection
                const insertedData = await collection.insertMany(sheetData);
                console.log(`Inserted ${insertedData.length} documents into '${collectionName}' collection.`);
            }
        }

        console.log('All sheets Added successfully into database.');
        res.status(200).json({ message: 'All sheets Added successfully into database' });

    } catch (error) {
        console.error('Error in adding Excel file:', error.message);
        res.status(500).json({ error: 'Failed to add Excel file' });
    } finally {
        console.log('All files added successfully.');
    }
  },
};

module.exports = object;
