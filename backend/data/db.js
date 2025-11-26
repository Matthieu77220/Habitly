require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createPool({
    database : process.env.DB_NAME,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    port : process.env.PORT
})

db.getConnection(function(err, connection){
    if(err){
        console.error('error', err)
    } else{
        console.log("DB connected")
        connection.release();
    }
})