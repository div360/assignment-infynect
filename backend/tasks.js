const express = require('express');
const router = express.Router();
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

// Routes
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM tasks';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

router.post('/task', (req, res) => {
    let task = {
        task_id: uuidv4(),
        task_name: req.body.task_name,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };
    let sql = 'INSERT INTO tasks SET ?';
    db.query(sql, task, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Task added...');
    });
});

router.post('/task/bulk_add', (req, res) => {
    let tasks = req.body;
    let sql = 'INSERT INTO tasks (task_id, task_name, description, priority, status, start_date, end_date) VALUES ?';
    let values = tasks.map(task => [uuidv4(), task.task_name, task.description, task.priority, task.status, task.start_date, task.end_date]);
    db.query(sql, [values], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tasks added...');
    });
});

router.get('/task/:taskId', (req, res) => {
    let sql = `SELECT * FROM tasks WHERE task_id = ${db.escape(req.params.taskId)}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.send(result);
        }else{
            res.status(404).send('Task Not found');
        }
    });
});

router.put('/task/:taskId', (req, res) => {
    let updateQuery = '';
    for (let field in req.body) {
        if (req.body.hasOwnProperty(field)) {
            updateQuery += `${field} = '${req.body[field]}',`;
        }
    }
    // remove the last comma
    updateQuery = updateQuery.slice(0, -1);
    
    let sql = `UPDATE tasks SET ${updateQuery} WHERE task_id = ${db.escape(req.params.taskId)}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Task updated...');
    });
});

router.delete('/task/:taskId', (req, res) => {
    let sql = `DELETE FROM tasks WHERE task_id = ${db.escape(req.params.taskId)}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Task removed...');
    });
});

module.exports = router;
