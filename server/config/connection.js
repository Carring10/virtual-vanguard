require("dotenv").config();
const mysql = require('mysql2');

const pool = mysql.createPool(process.env.JAWSDB_URL || {
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
});

pool.on('connection', (connection) => {
  console.log('New connection established');
});

module.exports = pool.promise();

// let db;

// if (process.env.JAWSDB_URL) {
//   db = mysql.createConnection(process.env.JAWSDB_URL);
//   console.log('Connected to JawsDB database.');
// } else {
//   db = mysql.createConnection({
//     host: 'localhost',
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   });
//   console.log('Connected to the local database.');
// }

// db.connect((err) => {
//   if (err) throw err;
// });

// module.exports = db.promise();