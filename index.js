const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = require('./db');


app.use(express.json())

//routes//

//get all todos

app.get("/todos", async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.log(error);
    }
})

//get all todo

app.get("/todos/:id", async (req,res)=>{
   const {id} = req.params
   try {
       const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
   } catch (error) {
       console.log(error);
   }
});

//create a todo

app.post("/todos", async (req, res) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
             [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//update a todo

//delete a todo


app.listen(3000, ()=>{
    console.log("running on port 3000");
});