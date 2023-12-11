import React from 'react'
import '../Admin/Admin.css'
import calcul from '../../images/calcul.png'
import profil from '../../images/profil.png'
import search from '../../images/search.png'

import dessiner from '../../images/dessiner.png'
import chercher from '../../images/sakhta.png'
import txt from '../../images/txt.png'
import kml from '../../images/kml.png'
import kmz from '../../images/kmz.png'
import { useNavigate } from "react-router-dom";

const SideBar = ({ activePage }) => {
  const navigate=useNavigate();
  const logOut=()=>{
    localStorage.clear();

    navigate("/signin");
   } 
    return (
    <div>
 <body class="g-sidenav-show  bg-gray-200">
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main " >
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
        <span class="ms-1 font-weight-bold text-white">Les Services proposées</span>
      </a>
    </div>
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class={`nav-link text-white ${activePage === 'Map' ? 'active bg-gradient-primary' : ''}`} href="Map">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={search} class="navbar-brand-img h-100" alt="main_logo" />

            </div>
            <span class="nav-link-text ms-1">Chercher une localisation</span>
          </a>
        </li>
        <li class="nav-item">
          <a class={`nav-link text-white ${activePage === 'DrawMap' ? 'active bg-gradient-primary' : ''}`} href="/DrawMap">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={dessiner} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Dessiner sur la carte</span>
          </a>
        </li>
        <li class="nav-item">
          <a class={`nav-link text-white ${activePage === 'Add2D' ? 'active bg-gradient-primary' : ''}`} href="/Add2d">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={kml} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Convertir KML en TXT</span>
          </a>
        </li>
        <li class="nav-item">
          <a class={`nav-link text-white ${activePage === 'Add3D' ? 'active bg-gradient-primary' : ''}`} href="/Add3D">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={kmz} class="navbar-brand-img h-100" alt="main_logo" width={1000}/>
            </div>
            <span class="nav-link-text ms-1">Convertir KMZ en TXT</span>
          </a>
        </li>
        <li class="nav-item">
          <a class={`nav-link text-white ${activePage === 'TxtToKmz' ? 'active bg-gradient-primary' : ''}`} href="/TxtToKmz">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={txt} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Convertir TXT en KMZ</span>
          </a>
        </li>
        
        
       
        <li class="nav-item">
        <a class={`nav-link text-white ${activePage === 'Calcul' ? 'active bg-gradient-primary' : ''}`} href="/Calcul">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={calcul} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Calcul Topographique</span>
          </a>
        </li>
        
        <li class="nav-item">
        <a class={`nav-link text-white ${activePage === 'Profil' ? 'active bg-gradient-primary' : ''}`} href="/Profil">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={profil} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Consulter profile</span>
          </a>
        </li>
        
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0 ">
      <div class="mx-3">
        <a class="btn bg-gradient-primary mt-4 w-100" onClick={logOut} type="button">Se déconnecter</a>
      </div>
    </div>
  </aside>
</body>

    </div>
  )
}

export default SideBar
