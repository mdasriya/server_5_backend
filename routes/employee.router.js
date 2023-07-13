
 const express = require("express")

const {auth} = require("../middleware/auth")
var jwt = require('jsonwebtoken');
const { EmpolyeeModel } = require("../model/employee.model");
 const EmployeeRouter = express.Router()
 

 
 EmployeeRouter.post("/employees",async(req,res)=> {
   const data = req.body
   try {
      const employee = new EmpolyeeModel(data)
      await employee.save()
      res.status(200).json({msg:"employee added", addedEmployee:data})
   } catch (error) {
    res.status(400).json({err:error.message})
   }
 })

 EmployeeRouter.get("/", async(req,res)=> {
  try {
    const data = await EmpolyeeModel.find({authorID:req.body.authorID})
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({err:error.message})
  }
})


EmployeeRouter.patch("/update/:id",auth, async(req,res)=> {
const {id} = req.params;
const employee = await EmpolyeeModel.findOne({_id:id})
try {
  if(req.body.authorID!==employee.authorID){
    res.status(200).json({msg:"you are mot authorized to do this action"})
  }else{
    await EmpolyeeModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).json({msg:"Employee has been updated"})
  }
} catch (error) {
  res.status(400).json({err:error.message})
  
}
})

EmployeeRouter.delete("/delete/:id",auth, async(req,res)=> {
  const {id} = req.params;
const employee = await EmpolyeeModel.findOne({_id:id})

  try {
    if(req.body.authorID!==employee.authorID){
      res.status(200).json({msg:"you are mot authorized to do this action"})
    }else{
      await EmpolyeeModel.findByIdAndDelete({_id:id})
      res.status(200).json({msg:"employee has been deleted"})
    }
  } catch (error) {
    res.status(400).json({err:error.message})
  }
})
 module.exports = {
  EmployeeRouter
 }


