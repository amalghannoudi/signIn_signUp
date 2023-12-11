import React from 'react'
import  './NavBar1.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menu from '../../images/menu-btn.png'
import logo from "../../images/logo.png";
const Navbar = () => {
    const navigate=useNavigate();

    const TosignIn=()=>{
    navigate("/signin");
    }
    
    const [navSize,  setnavSize] = useState("10rem");
    const [navColor, setnavColor] = useState("#42424a");
    const listenScrollEvent = () => {
      window.scrollY > 10 ? setnavColor("#42424a") : setnavColor("#42424a");
      window.scrollY > 10 ? setnavSize("5rem") : setnavSize("10rem");
    };
    useEffect(() => {
      window.addEventListener("scroll", listenScrollEvent);
      return () => {
        window.removeEventListener("scroll", listenScrollEvent);
      };
    }, []);
 
        
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  
  
    const toggleNav = () => {
      setToggleMenu(!toggleMenu)
    }
  
    useEffect(() => {
  
      const changeWidth = () => {
        setScreenWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', changeWidth)
  
      return () => {
          window.removeEventListener('resize', changeWidth)
      }
  
    }, [])

    return (
      <div>
        <div className='body5'>
        <nav className='nav'
          style={{
            backgroundColor: navColor,
            transition: "all 1s"
          }}
        >
                            <img src={logo} alt="Logo" className="logo" />

          {(toggleMenu || screenWidth > 500) && (
      <ul className="list">
     <li className='items'><a href="/">Home</a></li>
            <li className='items'><a href="#about">A propos</a></li>
            <li className='items'><a href="/#about-us">Mobile</a></li>

            <li className='items'><a href="/#pack">Packs</a></li>
             <button className='click5' onClick={TosignIn} > Se connecter </button> 
    </ul>
      )}

      <img src={menu} onClick={toggleNav} className="btn5" />
        </nav>
          

    

</div>
</div>
  )
}

export default Navbar