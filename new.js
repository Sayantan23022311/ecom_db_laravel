var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8081);


// ALTER TABLE sys.tbl_user_authenticate DROP COLUMN LOGOUT_TIME,DROP COLUMN SALT_KEY,DROP COLUMN PASSWORD_SEQUENCE; 
// ALTER TABLE tbl_user_information
// ADD COLUMN email VARCHAR(100);

app.get('/get-all-data', (req, res) => {
    // Query to join user information and orders
    const query = `
        SELECT u.id AS user_id, u.USER_NAME, u.PASSWORD, u.EMAIL_ID, u.CONTACT_NO, u.ADDRESS, u.SYSTEM_ROLE, u.CODE,
               o.FOOD_ITEMS, o.QTY
        FROM tbl_user_information_detailes u
        LEFT JOIN tbl_user_orders o ON u.id = o.user_id
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Group results by user
        const groupedResults = results.reduce((acc, row) => {
            if (!acc[row.user_id]) {
                acc[row.user_id] = {
                    USER_NAME: row.USER_NAME,
                    PASSWORD: row.PASSWORD,
                    EMAIL_ID: row.EMAIL_ID,
                    CONTACT_NO: row.CONTACT_NO,
                    ADDRESS: row.ADDRESS,
                    SYSTEM_ROLE: row.SYSTEM_ROLE,
                    CODE: row.CODE,
                    orders: []
                };
            }

            if (row.FOOD_ITEMS) {
                acc[row.user_id].orders.push({
                    FOOD_ITEMS: row.FOOD_ITEMS,
                    QTY: row.QTY
                });
            }

            return acc;
        }, {});

        // Convert to array format
        const response = Object.values(groupedResults);

        res.status(200).json(response);
    });
});