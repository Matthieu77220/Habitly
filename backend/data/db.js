require('dotenv').config()

let mysql = require('mysql2');


let db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 10
});

db.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Connected");
    }
})

module.exports = db