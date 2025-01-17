app.get("/get-city", (req, res) => {
    const { ITEM, USER_SYS_ID } = req.query;
  
    if (ITEM === "VIEW_ALL") {
      const query = "SELECT * FROM tbl_master_city";
  
      connection.query(query, (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "No users found" });
        }
  
        res.json({ response: results });
      });
    }
    else {
      res.status(400).json({ message: "Invalid query parameters" });
    }
  });