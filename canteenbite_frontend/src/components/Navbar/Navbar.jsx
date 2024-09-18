import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {getTotalCartAmout} = useContext(StoreContext);

  return (
    <div className='navbar'>
        <Link to='/'><h1>CanteenBites</h1></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu ("home" )} className={menu==="home" ?"active": ""}>Home</Link>
        <a href="#explore-menu" onClick={()=>setMenu ("menu" )} className={menu==="menu" ?"active": ""}>Menu</a>
        <a href="#footer" onClick={()=>setMenu ("contact-us" )} className={menu==="contact-us" ?"active": ""}>contact us</a>
        <li onClick={()=>setMenu ("mobile-app" )} className={menu==="mobile-app" ?"active": ""}>mobile app</li>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className="dot"></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}
<a href=""></a>
export default Navbar



