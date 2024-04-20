// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_DEV_ECOM_DB_USER',
  password: 'Bb#3&6Kv2zHyZW$',
  database: 'freedb_DEV_ECOM'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
