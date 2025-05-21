import React,{useState} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import './Addphoto.css'
const AddPhoto = ({url}) => {
    const[image,setImage] = useState(false);
    const[data,setData] =useState({
      title:"",
      description:"",
    
    })

    const handleChange=(event)=>{
        const value =event.target.value;
        const name = event.target.name;
        setData((prev)=>({...prev,[name]:value}))
    }

    const handlerSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",data.title)
        formData.append("description",data.description)

        formData.append("image",image)
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}/api/photo/addphoto`,formData,
        );
        if(response.data.success){
          console.log("response",response.data.success)
           setData({
               title:"",
                description:""
              })
            setImage(false)
            console.log(response.data.message)
         toast.success(response.data.message);
        }else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
         <form className='form-element' onSubmit={handlerSubmit}>
            <div className='add-image-upload flex-col'>
                <p>Upload image</p>
                <label htmlFor='image'><img src={image ? URL.createObjectURL(image) : assets.add_icon} alt=""/></label>     
                <input type="file" id="image"onChange={(e)=>setImage(e.target.files[0])} hidden required/> 
                <input type="text" name= "title" onChange={handleChange} placeholder='title'/>
                <input type="text" name= "description" onChange={handleChange} placeholder='description'/>

                <button className='add-btn' type="submit">Submit</button>
            </div>
            </form>
      
    </div>
  )
}

export default AddPhoto;
