import React from 'react'
import './NavBar.css'
import { assets } from '../assets/assets'
const NavBar = ({setShowLogin}) => {
  return (
    <div className='nav'>
     <div className="nav-left">
    <p>Google Photos</p>
  </div>
  <div className="nav-right">
    
     {!token? <button onClick={()=>{setShowLogin(true)}}>signin</button> :
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt= ""/>
        </div>}
  </div>
    </div>
  )
}

export default NavBar;
