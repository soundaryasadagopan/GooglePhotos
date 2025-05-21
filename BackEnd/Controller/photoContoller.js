const photoModel = require("../Models/photoModel");
const fs= require("fs")
const addphoto = async(req,res)=>{
    const imageFile = `${req.file.filename}`
console.log(imageFile)
const{title,description} = req.body
    const photo = new photoModel({
        image:imageFile,
        title,
        description,
        userId: req.user._id ,
        UploadTime : new Date()
    })

    try{
        await photo.save();
        res.json({success:true,message:"photo added"})
    
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error})
    }
    }
    const getPhoto = async(req,res)=>{
        try{
            const viewPhoto = await photoModel.find({});
            if(!viewPhoto){
                res.json({success:false,message:"photo not found"})
            }
            res.json({success:true,data:viewPhoto})

            }catch(error){
            console.log(error)
            res.json({success:false,message:error})
        }
        }
    
     const removePhoto =async(req,res)=>{
        try{
        const photo =await photoModel.findById(req.params.id);
        fs.unlink(`uploads/${photo.image}`,()=>{})
        
        await photoModel.findByIdAndDelete(photo._id)
            res.json({success:true,message:"image removed"})
        }catch(error){
            console.log(error);
            res.json({success:false,message:error})
        }
    }
    const togglephoto =async(req,res)=>{
        try {
    const photo = await photoModel.findById(req.params.id);
    if (!photo) return res.status(404).json({ success: false, message: "Photo not found" });

    photo.favorite = !photo.favorite;
    await photo.save();

    res.json({ success: true, favorite: photo.favorite });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    }
    }

    const searchPhoto =async(req,res)=>{
         try {
    const query = req.query.q;

    const result = await photoModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    // $text: { $search: query }
    });

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

    }
    

    module.exports = {addphoto,getPhoto,removePhoto,togglephoto,searchPhoto};
