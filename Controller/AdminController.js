const jwt = require("jsonwebtoken");

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
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
      res.status(200).json({ message: "Login sucess", token });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  },
};

module.exports = object;
