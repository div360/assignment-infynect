const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todo',
    timezone : 'utc'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected...');
});

module.exports = db;