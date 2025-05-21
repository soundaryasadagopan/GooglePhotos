import React,{useContext} from 'react'
import { StoreContext } from '../context/StoreContextProvider';

const Favourites = () => {
  const{list,value,url} =useContext(StoreContext);
    
  return (
    <div className='viewphoto'>
        <div className="photo-grid">

        {value.map((item,index)=>{
            if(list[item._id] >0){
            return(
              <div  className="photo-item">
              <div className='cart-items-title cart-items-item' key ={index}>
              <img src={url+"/image/"+item.image} className="photo-img"/>
              
              </div>
              <hr/>
              </div>
            )
          }
          })}
      </div>
    </div>
  )
}

export default Favourites
