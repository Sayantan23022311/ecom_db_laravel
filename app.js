const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

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
});
// Login route 1 sta api done by zomato project
app.post("/login", (req, res) => {
  console.log("Login route hit22", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or password missing for login" });
  }

  const query =
    "SELECT * FROM tbl_user_authenticate WHERE USER_NAME = ? AND PASSWORD = ?";

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

// {
//   "username":"NILAVO",
//   "password":"12345"
// }

// User list post api 2nd api
app.post("/add-user", (req, res) => {
  const {
    user_name,
    password,
    email_id,
    contact_no,
    address,
    system_role,
    code,
  } = req.body;

  // Validate input
  if (!user_name || !password || !system_role) {
    console.log("Username or password or system_role missing", req.body);
    return res.status(400).json({ message: "Missing required fields" });
  }

  // SQL queries
  const checkEmailQuery = `
    SELECT COUNT(*) AS count
    FROM tbl_user_information_detailes
    WHERE EMAIL_ID = ?
  `;
  const userQuery = `
    INSERT INTO tbl_user_information_detailes (USER_NAME, PASSWORD, EMAIL_ID, CONTACT_NO, ADDRESS, SYSTEM_ROLE, CODE)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const authQuery = `
    INSERT INTO tbl_user_authenticate (USER_NAME, PASSWORD, EMAIL_ID, SYSTEM_ROLE)
    VALUES (?, ?, ?, ?)
  `;

  // Start transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Check if email already exists
    connection.query(checkEmailQuery, [email_id], (error, results) => {
      if (error) {
        return connection.rollback(() => {
          console.error("Error checking email existence:", error);
          res.status(500).json({ message: "Internal server error" });
        });
      }

      if (results[0].count > 0) {
        // Email already exists
        return connection.rollback(() => {
          res.status(200).json({ message: "Email ID already exists" });
        });
      }

      // Proceed with inserting into tbl_user_information_detailes
      connection.query(
        userQuery,
        [user_name, password, email_id, contact_no, address, system_role, code],
        (error, userResults) => {
          if (error) {
            return connection.rollback(() => {
              console.error(
                "Error inserting into tbl_user_information_detailes:",
                error
              );
              res.status(500).json({ message: "Internal server error" });
            });
          }

          // Insert into tbl_user_authenticate
          connection.query(
            authQuery,
            [user_name, password, email_id, system_role],
            (error, authResults) => {
              if (error) {
                return connection.rollback(() => {
                  console.error(
                    "Error inserting into tbl_user_authenticate:",
                    error
                  );
                  res.status(500).json({ message: "Internal server error" });
                });
              }

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
                  message: "User added successfully",
                  userId: userResults.insertId,
                });
              });
            }
          );
        }
      );
    });
  });
});

// {

//   "user_name": "rahul22",
//   "password": "password123",
//   "email_id": "admin@example.com",
//   "contact_no": 1234567890,
//   "address": "123 Admin St",
//   "system_role": "driver",
//   "code": "admin001"
// }

//user list 3rd api get

//user list get api
app.get("/get-users", (req, res) => {
  const { ITEM, USER_SYS_ID } = req.query;

  if (ITEM === "VIEW_ALL") {
    const query = "SELECT * FROM tbl_user_information_detailes";

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
  } else if (ITEM === "SPECIFIC" && USER_SYS_ID) {
    const query = "SELECT * FROM tbl_user_information_detailes WHERE ID = ?";

    connection.query(query, [USER_SYS_ID], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user: results[0] });
    });
  } else {
    res.status(400).json({ message: "Invalid query parameters" });
  }
});
// city api
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

// resturant api
app.post("/add-user-with-orders", (req, res) => {
  const {
    user_name,
    password,
    email_id,
    contact_no,
    address,
    resturant_name,
    orders,
  } = req.body;

  if (!user_name || !password || !resturant_name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const userQuery = `
    INSERT INTO tbl_resturant_detailes (USER_NAME, PASSWORD, EMAIL_ID, CONTACT_NO, ADDRESS, RESTURNAN_NAME)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const authQuery = `
  INSERT INTO tbl_user_authenticate (USER_NAME, PASSWORD, EMAIL_ID,SYSTEM_ROLE,RESTURANT_SYS_ID)
  VALUES (?, ?, ?,?,?)
`;
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // Insert the user and retrieve the user_id
    connection.query(
      userQuery,
      [user_name, password, email_id, contact_no, address, resturant_name],
      (error, userResults) => {
        if (error) {
          return connection.rollback(() => {
            res
              .status(500)
              .json({ message: "Error inserting user information" });
          });
        }

        const RESTURANT_SYS_ID = userResults.insertId; // Get the newly inserted user ID

        const orderQuery = `
            INSERT INTO tbl_resturant_orders (RESTURANT_SYS_ID, FOOD_ITEMS, QTY,MAX_PRICE,MIN_PRICE)
            VALUES ?
          `;

        // Map orders to associate them with the userId
        const orderValues = orders.map((order) => [
          RESTURANT_SYS_ID,
          order.FOOD_ITEMS,
          order.QTY,
          order.MAX_PRICE,
          order.MIN_PRICE,
        ]);
        // Insert the orders
        connection.query(orderQuery, [orderValues], (error, orderResults) => {
          if (error) {
            return connection.rollback(() => {
              res.status(500).json({ message: "Error inserting orders" });
            });
          }
          connection.query(
            authQuery,
            [
              user_name,
              password,
              email_id,
              "RESTURANT_OWNER",
              RESTURANT_SYS_ID,
            ],
            (error) => {
              if (error) {
                return connection.rollback(() => {
                  console.error(
                    "Error inserting into tbl_user_authenticate:",
                    error
                  );
                  res.status(500).json({ message: "Internal server error" });
                });
              }
            }
          );

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ message: "Transaction commit failed" });
              });
            }

            res
              .status(200)
              .json({ response: "orders added successfully", status: "true" });
          });
        });
      }
    );
  });
});

// {
//   "user_name": "NILAVO",
//   "password": "12345",
//   "email_id": "mithi22@gmail.com",
//   "address": "durgapur",
//   "resturant_name": "Tatin2",
//   "orders": [
//       {
//           "FOOD_ITEMS": "Briyani2",
//           "QTY": "5",
//           "MAX_PRICE": "120",
//           "MIN_PRICE": "110"
//       },
//       {
//           "FOOD_ITEMS": "chilli2",
//           "QTY": "1",
//           "MAX_PRICE": "80",
//           "MIN_PRICE": "70"
//       }
//   ]
// }
// resturant get api call
app.get("/get-all-data", (req, res) => {
  const { ITEM, RESTURANT_SYS_ID } = req.query;
  // Query to join user information and orders
  if (ITEM === "VIEW_ALL") {
    const query = `
    SELECT u.RESTURANT_SYS_ID AS RESTURANT_SYS_ID, u.USER_NAME, u.PASSWORD, u.EMAIL_ID, u.CONTACT_NO, u.ADDRESS, u.RESTURNAN_NAME, 
           o.FOOD_ITEMS, o.QTY, o.MAX_PRICE, o.MIN_PRICE
    FROM tbl_resturant_detailes u
    LEFT JOIN tbl_resturant_orders o ON u.RESTURANT_SYS_ID = o.RESTURANT_SYS_ID
  `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Group results by USER_ID
      const groupedResults = results.reduce((acc, row) => {
        // Check if the user is already in the accumulator
        if (!acc[row.RESTURANT_SYS_ID]) {
          // Add the user details to the accumulator
          acc[row.RESTURANT_SYS_ID] = {
            RESTURANT_SYS_ID: row.RESTURANT_SYS_ID,
            USER_NAME: row.USER_NAME,
            PASSWORD: row.PASSWORD,
            EMAIL_ID: row.EMAIL_ID,
            CONTACT_NO: row.CONTACT_NO,
            ADDRESS: row.ADDRESS,
            RESTURNAN_NAME: row.RESTURNAN_NAME,
            orders: [], // Initialize orders array
          };
        }

        // If there are food items, push them to the orders array
        if (row.FOOD_ITEMS) {
          acc[row.RESTURANT_SYS_ID].orders.push({
            FOOD_ITEMS: row.FOOD_ITEMS,
            QTY: row.QTY,
            MAX_PRICE: row.MAX_PRICE,
            MIN_PRICE: row.MIN_PRICE,
          });
        }

        return acc;
      }, {});

      // Convert the grouped results object to an array of users
      const response = Object.values(groupedResults);

      // Send the final grouped response
      res.status(200).json(response);
    });
  } else if (ITEM === "SPECIFIC") {
    // const specificId = req.body.specificId ||"8" // Get the specific RESTURANT_SYS_ID from the request body
    // console.log('Specific ID:', specificId);
    const query = `
    SELECT u.RESTURANT_SYS_ID AS RESTURANT_SYS_ID, u.USER_NAME, u.PASSWORD, u.EMAIL_ID, u.CONTACT_NO, u.ADDRESS, u.RESTURNAN_NAME, 
           o.FOOD_ITEMS, o.QTY, o.MAX_PRICE, o.MIN_PRICE
    FROM tbl_resturant_detailes u
    LEFT JOIN tbl_resturant_orders o ON u.RESTURANT_SYS_ID = o.RESTURANT_SYS_ID
    WHERE u.RESTURANT_SYS_ID = ?
  `;

    connection.query(query, [RESTURANT_SYS_ID], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Group results for the specific restaurant
      const groupedResults = results.reduce((acc, row) => {
        if (!acc[row.RESTURANT_SYS_ID]) {
          acc[row.RESTURANT_SYS_ID] = {
            RESTURANT_SYS_ID: row.RESTURANT_SYS_ID,
            USER_NAME: row.USER_NAME,
            PASSWORD: row.PASSWORD,
            EMAIL_ID: row.EMAIL_ID,
            CONTACT_NO: row.CONTACT_NO,
            ADDRESS: row.ADDRESS,
            RESTURNAN_NAME: row.RESTURNAN_NAME,
            orders: [], // Initialize orders array
          };
        }

        if (row.FOOD_ITEMS) {
          acc[row.RESTURANT_SYS_ID].orders.push({
            FOOD_ITEMS: row.FOOD_ITEMS,
            QTY: row.QTY,
            MAX_PRICE: row.MAX_PRICE,
            MIN_PRICE: row.MIN_PRICE,
          });
        }

        return acc;
      }, {});

      const response = Object.values(groupedResults);
      res.status(200).json(response);
    });
  }
});

app.post("/api-post-create-add-resturant", (req, res) => {
  const {
   
    RESTURANT_NAME,
    USER_NAME,
    PASSWORD,
    EMAIL_ID,
  
    ADDRESS,
    PH_NO,
    RESTURANT_OPEN_TIME,
    RESTURANT_CLOSE_TIME,
  
  } = req.body;
  console.log(req.body);

  // if (!RESTURANT_SYS_ID || !RESTURANT_DATE || !RESTURNAT_QTY) {
  //   return res.status(400).json({ message: "Missing required fields" });
  // }

  const userQuery = `
  INSERT INTO tbl_resturant_detailes (
   RESTURANT_NAME,
    USER_NAME,
    PASSWORD,
    EMAIL_ID,
   
    ADDRESS,
    PH_NO,
    RESTURANT_OPEN_TIME,
    RESTURANT_CLOSE_TIME)
  VALUES (?,?,?,?,?,?,?,?)
`;


 
 const authQuery = `
    INSERT INTO tbl_user_authenticate (USER_NAME, PASSWORD, EMAIL_ID, SYSTEM_ROLE)
    VALUES (?, ?, ?, ?)
  `;

 
  
  connection.query(userQuery, [RESTURANT_NAME,
    USER_NAME,
    PASSWORD,
    EMAIL_ID,
    
    ADDRESS,
    PH_NO,
    RESTURANT_OPEN_TIME,
    RESTURANT_CLOSE_TIME], (error, orderResults) => {
    if (error) {
      console.log(error, "error");

      return connection.rollback(() => {
        res.status(500).json({ message: "Error inserting orders" });
      });
    }

    // Commit the transaction
    connection.commit((err) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ message: "Transaction commit failed" });
        });
      }

      res
        .status(200)
        .json({ response: "Resturant added successfully", status: "true" });
    });
  });
});

// {
//   "RESTURANT_NAME": "Dada Boudi Briyani",
//   "USER_NAME": "Riju Mukherjee",
//   "PASSWORD": "PASSWORD",
//   "EMAIL_ID": "rijumukherjee506@gmail.com",

//   "PH_NO":"9064145393",
//    "ADDRESS": "Kolkata",
//   "RESTURANT_OPEN_TIME":"10:00",
//    "RESTURANT_CLOSE_TIME":"12:25"
 

// }
app.get("/get-resturant-all-data", (req, res) => {
  const { ITEM, RESTURANT_SYS_ID, RESTURANT_DATE } = req.query;

  // if (ITEM === "SPECIFIC") {
  //   // const specificId = req.body.specificId ||"8" // Get the specific RESTURANT_SYS_ID from the request body
  //   // console.log('Specific ID:', specificId);

  //   const query =
  //     "SELECT * FROM tbl_resturant_data_entry WHERE RESTURANT_SYS_ID = ? AND RESTURANT_DATE=?";

  //   connection.query(
  //     query,
  //     [RESTURANT_SYS_ID, RESTURANT_DATE],
  //     (error, results) => {
  //       if (error) {
  //         console.error("Error executing query:", error);
  //         return res.status(500).json({ message: "Internal server error" });
  //       }

  //       if (results.length === 0) {
  //         return res.status(404).json({ message: "No Data Found" });
  //       }

  //       res.json({ response: results });
  //     }
  //   );
  // }  
   if (ITEM === "VIEW_ALL") {
    // const specificId = req.body.specificId ||"8" // Get the specific RESTURANT_SYS_ID from the request body
    // console.log('Specific ID:', specificId);

    const query =
      "SELECT * FROM tbl_resturant_detailes ";

    connection.query(
      query,
     
      (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "No Data Found" });
        }

        res.json({ response: results });
      }
    );
  }else {
    res.status(400).json({ message: "Invalid query parameters" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
