const express = require("express");
const {addphoto,getPhoto, removePhoto, togglephoto,searchPhoto} = require("../Controller/photoContoller");
const multer = require("multer");

const photoRouter = express.Router();
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})


photoRouter.post("/addphoto",upload.single("image"),addphoto);

photoRouter.get("/viewphoto",getPhoto);

photoRouter.get("/search",searchPhoto);


photoRouter.put("/togglephoto/:id",togglephoto);


photoRouter.delete("/removephoto/:id",removePhoto);



module.exports = photoRouter;