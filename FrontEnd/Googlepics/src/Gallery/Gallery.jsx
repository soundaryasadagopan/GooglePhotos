import React,{useState,useEffect,useContext} from 'react'
import './Gallery.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContextProvider';
import { assets } from '../assets/assets';

const Gallery = ({url}) => {
  const [value,setValue] =useState([]);
  const{addTofavourite,list} = useContext(StoreContext);
  const[filterData,setFilterData] = useState("");
  

     const fetchPhoto = async()=>{
        console.log(url,"url")
    const response = await axios.get(`${url}/api/photo/viewphoto`);
    if(response.data.success){
      setValue(response.data.data)
    }else{
      toast.error("Error")
    }
  }
   useEffect(()=>{
      fetchPhoto();
    },[])

const handleSearch = async () => {
  try {
    const res = await axios.get(`${url}/api/photo/search?q=${filterData}`);
    if (res.data.success) {
      setValue(res.data.data); 
    }
  } catch (err) {
    toast.error("Search failed");
  }
};

useEffect(() => {
  const delay = setTimeout(() => {
    if (filterData.trim()) {
      handleSearch();
    } else {
      fetchPhoto(); 
    }
  }, 500);

  return () => clearTimeout(delay);
}, [filterData]);

  return (
    <div className='viewphoto'>
      <div className='search-box'>
        <input type="text" onChange={(e)=>setFilterData(e.target.value)} placeholder='search'/>
        <button onClick={handleSearch}>Search</button>

      </div>
        <div className="photo-grid">
        {value.map((item,index)=>{
          return(
        <div key={index} className="photo-item">
        
             <img src={`${url}/image/${item.image}`}  className="photo-img"alt="Uploaded" />
            
          <img
        className="add-icon"
        onClick={() => addTofavourite(item._id)}
        src={list[item._id] ? assets.love: assets.heart}
        alt={list[item._id] ? "Remove from Favorites" : "Add to Favorites"}
        title={list[item._id] ? "Remove from Favorites" : "Add to Favorites"}
        />
        
        </div>
        
          )}
        )}
        </div>
    </div>
  )
}

export default Gallery
