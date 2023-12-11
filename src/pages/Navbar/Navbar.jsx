import React from 'react'
import  './Navbar.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menu from '../../images/menu-btn.png'
import logo from "../../images/logo.png" ; 
const Navbar = () => {
    const navigate=useNavigate();

    const TosignIn=()=>{
    navigate("/signin");
    }
    
    const [navSize,  setnavSize] = useState("10rem");
    const [navColor, setnavColor] = useState("transparent");
    const listenScrollEvent = () => {
      window.scrollY > 10 ? setnavColor("#42424a") : setnavColor("transparent");
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
            <li className='items'><a href="#about-us">Mobile</a></li>
            <li className='items'><a href="#pack">Packs</a></li>

             <button className='click5' onClick={TosignIn} > Se connecter </button> 

    </ul>

      )}

      <img src={menu} onClick={toggleNav} className="btn5" />
        </nav>
          

    
<section id="home "className="header">
<div className="overlay">
            <h1 className="subtitle">Découvrez le pouvoir de la géomatie avec</h1>
            <h1 className="titre">Géo-topo</h1>  
        </div>  
        <div className="shape">
            <svg viewBox="0 0 1500 200">
                <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z"/>
            </svg>
        </div>  
        <div className="mouse-icon"><div className="wheel"></div></div>
    </section>
</div>
</div>
  )
}

export default Navbar