import React from 'react'
import './SideBar.css'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'


const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className = "sidebar-options">
        <NavLink to="/" className='sidebar-option'>
          <img src={assets.add_icon} alt=""/>
          <p>upload</p>
        </NavLink>

        <NavLink  to="/gallery"className='sidebar-option'>
          <img src={assets.add_icon} alt=""/>
          <p>Gallery</p>
        </NavLink>

        <NavLink to="/favourites" className='sidebar-option'>
          <img src={assets.add_icon}  alt=""/>
          <p>Favourites</p>
        </NavLink>

      </div>
      
    </div>
  )
}

export default SideBar
