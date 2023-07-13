
  const mongoose = require("mongoose")


// schema
const bookSchema = mongoose.Schema({
  "first_name":{type:String, required:true},
  "last_name":{type:String, required:true},
  "email":{type:String, required:true},
  "author":{type:String},
  "authorID":{type :String},
  "department":{type:String, required:true},
  "salary":{type:Number, required:true}
},{
    versionKey:false
})
// model

const EmpolyeeModel = mongoose.model("employee",bookSchema)

module.exports = {
  EmpolyeeModel
}