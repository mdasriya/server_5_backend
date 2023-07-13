const express = require("express")
require("dotenv").config()
const {connection} = require("./db")
const {UserRouter} = require("./routes/user.router")
var cors = require('cors')
const { EmployeeRouter } = require("./routes/employee.router")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", UserRouter)
app.use("/empolyee", EmployeeRouter)


app.listen(8080, async()=> {
    try {
        await connection;
        console.log(`server is running at port 8080`);
        console.log("DB is connected");  
    } catch (error) {
       console.log(error); 
    }
   
})