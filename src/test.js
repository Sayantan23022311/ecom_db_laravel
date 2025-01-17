app.post("/add-city", (req, res) => {
    const {
     city
    } = req.body;
  
    // Validate input
    
  
    // SQL queries
    
    const userQuery = `
      INSERT INTO tbl_master_city (CITY)
      VALUES (?)
    `;
   
  
    // Start transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      // Check if email already exists
      connection.query(userQuery,[city], (error, results) => {
        if (error) {
          return connection.rollback(() => {
          console.log(error);
          
            res.status(500).json({ message: "Internal server error" });
          });
        }
  
      
        // Proceed with inserting into tbl_user_information_detailes
      
         
  
            // Insert into tbl_user_authenticate
        
             
              
  
                // Commit transaction
                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      console.error("Error committing transaction:", err);
                      res.status(500).json({ message: "Internal server error" });
                    });
                  }
  
                  res.status(200).json({
                    status: "True",
                    message: "City added successfully",
                  
                  });
                });
              
            
          }
        );
      });
    });