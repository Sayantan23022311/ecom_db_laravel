import login from './login'
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


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


