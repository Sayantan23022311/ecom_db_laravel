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
  host: 'sql.freedb.tech',
  user: 'freedb_DEV_ECOM_DB_USER',
  password: 'Bb#3&6Kv2zHyZW$',
  database: 'freedb_DEV_ECOM'
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
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database for user authentication
  const query = 'SELECT * FROM user_auth WHERE username = ? AND password = ?';
  
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // if (results.length === 0) {
    //   return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // Authentication successful
    res.json({ message: 'Login successful', user: results[0] });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
