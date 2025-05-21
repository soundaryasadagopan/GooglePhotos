const mongoose = require("mongoose");

 const photoSchema =  new mongoose.Schema({
    image:{type:String,required:true},
    title:{type:String,required:true},
    favorite: { type: Boolean, default: false },
   description:{type:String,required:true},
    uploadTime: { type: Date, default: Date.now},
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
    required: true
  }
 })
 
 photoSchema.index({ title: 'text', description: 'text' });


 const photoModel = mongoose.models.photo || mongoose.model("photo",photoSchema)

 module.exports = photoModel;