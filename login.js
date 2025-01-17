app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database for user authentication
    const query = 'SELECT * FROM user_auth WHERE username = ? AND password = ?';
    
    connection.query(query, [username, password], (error, results) => {
      if (error) {
        //console.error('Error querying database:', error);//
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      console.log('Query results:', results); // Log the query results
  
    if (results.length === 0) {
      console.log('No matching records found'); // Log when no records are found
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Authentication successful
    res.json({ message: 'Login successful', user: results[0] });
    });
  });