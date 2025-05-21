import React,{useState,useContext} from 'react'
import './Loginpopup.css'
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContextProvider';
import axios from 'axios'

const Loginpopup = ({setShowLogin}) => {
    const{url,token,setToken} = useContext(StoreContext);
      
    
    const[currentState,setCurrentState] = useState("Login");
    const[item,setItem] =useState("");
    
    const[data,setData] =useState({
        email:"",
        password:""
    })

    const handleChange=(event)=>{
        const name =event.target.name;
        const value = event.target.value;
        setData((data)=>({...data,[name]:value}))
    }
    const onLogin=async(event)=>{
        event.preventDefault();
        let newUrl=url ;
        console.log(url,"url")
        if(currentState === 'Login'){
            newUrl +="/api/user/login"
        }else{
            newUrl +="/api/user/register"
        }
    
        const response = await axios.post(newUrl,data);
        if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
        }else{
            alert(response.data.message)
        }
        
    
    }
    return(
  <div className="login-popup">
        <form className='login-popup-form' onSubmit={onLogin}>
            <div className = "login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
            </div>
            <div className="login-input">
                <input type="email"  name="email" onChange={handleChange} value={data.email} placeholder='Enter email' required/>
                <input type="password" name="password" onChange = {handleChange}  value={data.password} placeholder='Enter password' required/>
            </div>
            <button className='login-button'>{currentState ==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-check">
                <input type="checkbox" required/>
                <p>By continuing ,I agree to the terms and condition</p>
                </div>
        
                {currentState =="Login"?
                <p>Create a new account?<span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>:
                <p>Already have an account?<span onClick={()=>setCurrentState("Login")}>Login</span></p>
                }
        </form>
      
    </div>
    )
}

export default Loginpopup
