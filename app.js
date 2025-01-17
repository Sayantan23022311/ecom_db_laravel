const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
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
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Login route
app.post("/auth/login", (req, res) => {
console.log("call")

  const { USER_NAME, PASSWORD } = req.body;

  if (!USER_NAME || !PASSWORD) {
    return res
      .status(400)
      .json({ message: "Username or password missing for login" });
  }

  const query =
    "SELECT * FROM tbl_user_authenticate WHERE USER_NAME = ? AND PASSWORD = ?";

  connection.query(query, [USER_NAME, PASSWORD], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
        const user = results[0];
        console.log(user,"user");
        
        
        // if (!user.PASSWORD !== PASSWORD) {
        //   return res.status(200).json({ message: "Invalid password" });
        // }else{
          
        // }

    if (results.length === 0) {
      console.log("Invalid username or password",results);
     
      return res
        .status(200)
        .json({ message: "" });
    }
    console.log(results[0],'re56sukt');
    
   

    res.json({ message: "Login successful", user: results[0] });
  });
  
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});

