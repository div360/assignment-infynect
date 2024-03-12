const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

router.post('/register', (req, res) => {
    // First, check if the username already exists
    let checkSql = `SELECT * FROM users WHERE user_name = ${db.escape(req.body.user_name)}`;
    db.query(checkSql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            // If the username already exists, send an error message
            res.status(400).send('Username already exists');
        }else{
            // If the username does not exist, hash the password and insert the new user
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if(err) throw err;
                let user = {
                    user_id: uuidv4(),
                    user_name: req.body.user_name,
                    password: hash
                };
                let sql = 'INSERT INTO users SET ?';
                db.query(sql, user, (err, result) => {
                    if(err) throw err;
                    console.log(result);
                    res.send('User registered...');
                });
            });
        }
    });
});


// Login a user
router.post('/login', (req, res) => {
    let sql = `SELECT * FROM users WHERE user_name = ${db.escape(req.body.user_name)}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            bcrypt.compare(req.body.password, result[0].password, function(err, result) {
                if(err) throw err;
                if(result){
                    res.send('User logged in...');
                }else{
                    res.status(401).send('Invalid password');
                }
            });
        }else{
            res.status(404).send('User not found');
        }
    });
});



module.exports = router;
