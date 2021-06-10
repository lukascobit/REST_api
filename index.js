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

//get a todo

app.get("/todos/:id", async (req,res)=>{
   const {id} = req.params
   try {
       const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
       res.json(todo.rows[0])
   } catch (error) {
       console.log(error);
   }
});

//create a todo

app.post("/todos", async (req, res) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            `INSERT INTO todo (description) VALUES (${description}) RETURNING *`
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//update a todo

app.put("/todos/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(`UPDATE todo SET description = ${description} WHERE todo_id = ${id}`);
        res.json("todo was updated")
    } catch (error) {
        console.log(error.message);
    }
});

//delete a todo

app.delete("todos/:id", async(req, res)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`);
        res.json("Todo was deleted");
        console.log("todo was deleted");
    } catch (error) {
        console.log(error.message);
    }
});


app.listen(3000, ()=>{
    console.log("running on port 3000");
});