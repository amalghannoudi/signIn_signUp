import React,{useState, useEffect} from 'react'
import '../Admin/Admin.css'

import admin from '../../images/admin.png'
import projet from '../../images/projet1.png'
import dash from '../../images/dash.png'
import payement from '../../images/payement.png'

import axios from "axios"
import { useNavigate } from "react-router-dom";
import Delete from '../Modals/Delete'; 
import Add from '../Modals/Add'
import Edit_pack from '../Modals/Edit_pack.jsx'
import message from '../../images/email.png'
import empl from '../../images/R.png';
import packI from '../../images/pack.png'
import { getPacks } from '../../services/packService'
const Pack = () => {
    const navigate=useNavigate();
    const logOut=()=>{
      localStorage.clear();
  
      navigate("/signin");
     } 
    const [pack, setPack] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
    fetchPacks();
    }, [searchText]);
    const fetchPacks = () => {
      getPacks(searchText)
        .then((filteredPacks) => {
          setPack(filteredPacks);
          console.log(filteredPacks);
        })
        .catch((error) => {
          console.error(error);
        });
    };
      const handleDelete = (id) => {
        fetchPacks();
      }
      const handleUpdate = (id) => {
        fetchPacks();
      }
      const handleAdd= (id) => {
        fetchPacks();
      }
  
    if (!pack) {
      return <p>Loading packs information...</p>;
    }
   
  return (
    <div>
       <body class="g-sidenav-show  bg-gray-200">
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
      <span class="ms-1 font-weight-bold text-white btn-lg">Dashboard De l'Administrateur </span>
      </a>
    </div>
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-white " href="Admin">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={dash} class="navbar-brand-img h-100" alt="main_logo" />

            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/Compte">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={admin} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Comptes</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/Projet">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={projet} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Fichier</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white "  href="/Emplacement">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={empl} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Emplacement</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="/Abonnement">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={payement} class="navbar-brand-img h-100" alt="main_logo" />

            </div>
            <span class="nav-link-text ms-1">Abonnement</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="/message">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={message} class="navbar-brand-img h-100" alt="main_logo" />

            </div>
            <span class="nav-link-text ms-1">Messages</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white    active bg-gradient-primary" href="/pack">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={packI} class="navbar-brand-img h-100" alt="main_logo" />

            </div>
            <span class="nav-link-text ms-1">Packs</span>
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
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Dashboard</a></li>
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Packs</li>
          </ol>
          <h6 class="font-weight-bolder mb-0">Packs</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            <div class="input-group input-group-outline">
            <label class="form-label"></label>
              <input type="text" placeholder='Type here...' class="form-control" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
          </div>

            
        </div>
      </div>
    </nav>




    <div class="container-fluid py-4 bg-gray-200">
    
    <div class="row">
        <div class="col-md-2 mt-4">
        </div>
        <div class="col-md-8 mt-4">
          <div class="card1">
            <div class="card1-header pb-0 px-3">
              <h6 class="mb-0">Informations sur les Packs</h6>
                  <Add onAddSuccess={handleAdd} />
            </div>

            <div class="card1-body pt-4 p-3">
            {pack.map(pack => (

              <ul class="list-group"  key={pack.id}>

                <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">Pack #{pack.id}</h6>
                    <span class="mb-2 text-xs">Titre d'abonnement: <span class="text-dark font-weight-bold ms-sm-2">{pack.titre}</span></span>
                    <span class="mb-2 text-xs">Montant: <span class="text-dark ms-sm-2 font-weight-bold">{pack.montant}DT</span></span>
                    <span className="text-xs">Informations: <span className="text-dark ms-sm-2 font-weight-bold">{pack.information.split('/').map((item, key) => {
    return <span key={key}>{item}<br/></span>
})}</span></span>
                  </div>
                  <div class="ms-auto text-end">
                  <Edit_pack title="Pack" pack={pack} onUpdateSuccess={handleUpdate} />
                  <Delete title="Pack" id={pack.id}   onDeleteSuccess={handleDelete}/>
                  </div>
                </li>
               
                
              
               
              </ul>
                              ))} 

            </div>
          </div>
        </div>
        <div class="col-md-2 mt-4">
        </div>

      </div>



          








    </div>














    </main>
</body>

    </div>
  )
}

export default Pack
