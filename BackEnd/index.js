const express= require("express");
require("dotenv").config();
const cors =require("cors");
const connectDb = require("./config/db")
const photoRouter = require("./Router/photoRouter");
const userRouter = require("./Router/userRouter");


const app = express();
const port = 4000;

app.use(express.json());

app.use(cors());
connectDb();
app.use('/image',express.static('uploads'))

app.use('/api/photo',photoRouter);
app.use('/api/user',userRouter);



app.listen(port,()=>{
    console.log(`Server is listening to port http://localhost:${port}`)
})