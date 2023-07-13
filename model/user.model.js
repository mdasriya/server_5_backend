const mongoose = require("mongoose")


// schema
const userSchema = mongoose.Schema({

  "email":{type:String, required:true},
  "password":{type:String, required:true},
  "confirm_password":{type:String, required:true}
},{
    versionKey:false
})
// model

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}