const mongoose = require("mongoose");
const connectDb = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB connected"))
    }catch(error){
        console.log(error);
    }
}
module.exports = connectDb;