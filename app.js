const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(cors());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A%bcd1290",
  database: "sys",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Simple GET route for testing
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Login route 1 sta pi done by zomato project
app.post("/login", (req, res) => {
  console.log("Login route hit22",req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Username or password missing");
    return res.status(400).json({ message: "Username or password missing" });
  }

  const query = "SELECT * FROM tbl_user_authenticate WHERE USER_NAME = ? AND PASSWORD = ?";

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
//     const user = results[0];
// console.log("mithi",results[0])
//     // Check if the password is correct
//     if (user.PASSWORD !== password) {
//       return res.status(200).json({ message: "Invalid password" });
//     }

    if (results.length === 0) {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Invalid username or password" });
    }
  
    console.log("Login successful");
    res.json({ message: "Login successful", user: results[0] });
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
