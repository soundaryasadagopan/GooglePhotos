
import React,{useState,useEffect} from 'react';
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000"

const[list,setList] =useState({});
const[value,setValue] =useState([]);

  const addTofavourite = async (id) => {
  try {
    const res = await axios.put(`${url}/api/photo/togglephoto/${id}`);
    if (res.data.success) {
      setList(prev => ({ ...prev, [id]: res.data.favorite }));
    }
  } catch (err) {
    toast.error("Failed to update favorite");
  }
};

   const fetchList = async()=>{
            const response = await axios.get(url+"/api/photo/viewphoto")
        setValue(response.data.data)

        }

         useEffect(()=>{
        async function loadData(){
            await fetchList();
        }
        loadData();
      
    },[])

    useEffect(() => {
  
  const newList = {};
  value.forEach(photo => {
    newList[photo._id] = photo.favorite;
  });
  setList(newList);
}, [value]);

        const contextValue = {addTofavourite,list,fetchList,value,url}

      return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
    
  
}

export default StoreContextProvider
