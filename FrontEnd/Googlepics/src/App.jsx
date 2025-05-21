import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddPhoto from './AddPhoto/AddPhoto'
import {Routes,Route} from "react-router-dom"
import Gallery from './Gallery/Gallery'
import Favourites from './Favourites/Favourites'
import SideBar from './Sidebar/SideBar'
import Loginpopup from './Loginpopup/Loginpopup'
import NavBar from './Navbar/NavBar'

function App() {
  const [count, setCount] = useState(0);
  const[showLogin,setShowLogin] =useState(false)

  const url = "http://localhost:4000"

  return (
    <>
  
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
      <NavBar setShowLogin={setShowLogin}/>
    
    
     <div className='app-content'>
       <SideBar/>
     <Routes>
      <Route path="/" element={ <AddPhoto url ={url}/> } />

      <Route path="/gallery" element={<Gallery url ={url}/>} />
      <Route path="/favourites" element={<Favourites/>}/>

     </Routes>
     </div>
    </>
  )
}

export default App


