const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "database-1.cjiyeki48gaw.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "Cleiton1999",
  database: "my_app_db",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
