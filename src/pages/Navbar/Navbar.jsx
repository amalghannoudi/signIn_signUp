import React from 'react'
import  './Navbar.css'
import { useState, useEffect } from "react";
const Navbar = () => {
    
    
    const [navSize, setnavSize] = useState("10rem");
    const [navColor, setnavColor] = useState("transparent");
    const listenScrollEvent = () => {
      window.scrollY > 10 ? setnavColor("#ff3b2c") : setnavColor("transparent");
      window.scrollY > 10 ? setnavSize("5rem") : setnavSize("10rem");
    };
    useEffect(() => {
      window.addEventListener("scroll", listenScrollEvent);
      return () => {
        window.removeEventListener("scroll", listenScrollEvent);
      };
    }, []);
  
    return (
      <div>
        <nav
          style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 1s"
          }}
        >
          <ul>
            <li><a href="home">Home</a></li>
            <li><a href="#about">A propos</a></li>
            <li><a href="#pack">Packs</a></li>
            <li><a href="#contact">Contact</a></li>
             <button className='click'> Se connecter </button> 
         </ul>
        </nav>

    
<section id="home "className="header">
<div className="overlay">
            <h1 className="subtitle">LeadMark Landing Page</h1>
            <h1 className="title">We Are Creative</h1>  
        </div>  
        <div className="shape">
            <svg viewBox="0 0 1500 200">
                <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z"/>
            </svg>
        </div>  
        <div className="mouse-icon"><div className="wheel"></div></div>
    </section>
</div>
  )
}

export default Navbar
