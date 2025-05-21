const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    listData:{type:Object,default:{}}
},{minimise:false});
;
const userModel = mongoose.models.user || mongoose.model("user",userSchema);
module.exports = userModel;