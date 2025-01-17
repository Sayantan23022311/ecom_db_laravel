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
        
   
        if (!user.PASSWORD !== PASSWORD) {
          return res.status(200).json({ message: "Invalid password" });
        }else{
          
        }

    if (results.length === 0) {
      console.log("Invalid username or password");
      return res
        .status(200)
        .json({ message: "Invalid username or password for login" });
    }

    res.json({ message: "Login successful", user: results[0] });
  });
  //   const userQuery = `
  //   SELECT * FROM tbl_user_information WHERE USER_NAME = ?
  // `;

  // connection.query(userQuery, [username], (error, userResults) => {
  //   if (error) {
  //     console.error('Error fetching user information:', error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }

  //   if (userResults.length === 0) {
  //     return res.status(404).json({ message: 'User information not found' });
  //   }

  //   res.json({
  //     message: 'Login successful',
  //     user: userResults[0],
  //   });
  // });
});

// Start the server
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //console.log(`Server listening on port ${PORT}`);
//});

// Define a route for GET requests
// app.get('/get-master-name', (req, res) => {
//     // Query to fetch data from the database
//     const query = 'SELECT * FROM TBL_MASTER_NAME';

//     // Execute the query
//     connection.query(query, (err, MASTER_NAME_SYS_ID , MASTER_NAME) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }

//         // Send the fetched data as the response
//         res.json(MASTER_NAME_SYS_ID , MASTER_NAME);
//     });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});

