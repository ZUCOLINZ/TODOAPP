const express = require(`express`);
const mysql = require(`mysql`);
const app = express();

//create connection to database


const sqlCon = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "TodoApp"
});


// create routes to insert data

app.post("insertData", (req, res) => {

// this will come from the frontend

    let todo = req.body.todo;
    let time = req.body.time;

    // Now send data to mysql database

sqlCon.query("INSERT INTO todoTable values(?,?)",[todo,time],
(error, result) =>{
    if(error) {
        console.log(error);
    }
    if(result) {
        res.send(`Record Inserted Successfully`);
    }


})

})

// create route to  retrieve data

app.get("RetrieveData", (req, res) =>{

    sqlCon.query("SELECT * FROM todoTable", (error, result) =>{
       if(error) {
        console.log(error);
       }
       
       if(result) {
        console.log(result);
        res.send(result);
       }
    })
})

// create route to edit data

app.post("EditData", (req, res) =>{
    let newTodo = req.body.newTodo;
    let newTime = req.body.newTime;


    //edit data from database
    
    sqlCon.query("UPDATE todoTable set Todo = ? and Time = ?", 
    [newTodo,newTime], (error ,result) => {
        if(error) {
            console.log(error);
        }
        if(result){
            res.send("Details Updated Successfully");
        }
    })
})

// create route to delete data

app.post("DeleteData", (req, res) => {
    // get value from the client side
    
    let Time = req.body.Time;

    sqlCon.query("DELETE FROM todoTable WHERE Time = ?",Time, 
    (error, result) => {
        if(error){
        console.log(error);
        }
        if(result){
            res.send("Details Deleted Successfully");
            console.log(result);
        }

    })
})

app.listen(5000, () => {console.log(`server running on port: 5000`)} );