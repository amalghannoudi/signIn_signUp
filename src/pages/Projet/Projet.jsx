import React,{useEffect,useState} from 'react'
import '../Admin/Admin.css'

import admin from '../../images/admin.png'
import projet from '../../images/projet1.png'
import dash from '../../images/dash.png'
import payement from '../../images/payement.png'
import message from '../../images/email.png'
import empl from '../../images/R.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import pack from '../../images/pack.png'
import { getFiles } from '../../services/fileService'

const Projet = () => {
  const [fileData, setFileData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const navigate=useNavigate();
  const logOut=()=>{
    localStorage.clear();

    navigate("/signin");
   } 

   useEffect(() => {
    getFiles(searchText)
      .then((response) => {
        setFileData(response);
        console.log(fileData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchText]);

  
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
    <hr class="horizontal light mt-0 mb-2"/>
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
          <a class="nav-link text-white active bg-gradient-primary " href="/Projet">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={projet} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Fichier</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/Emplacement">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={empl} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Emplacement</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/Abonnement">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={payement} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Abonnements</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/message">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={message} class="navbar-brand-img h-100" alt="main_logo" />
            </div>
            <span class="nav-link-text ms-1">Messages</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="/pack">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <img src={pack} class="navbar-brand-img h-100" alt="main_logo" />

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
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Fichiers</li>
          </ol>
          <h6 class="font-weight-bolder mb-0">Fichiers</h6>
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


    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card1 my-4">
            <div class="card1-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">Table des Fichiers Convertis</h6>
              </div>
            </div>
            <div class="card1-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom du projet</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fichier à convertir</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fichier résultant</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {fileData && fileData.map(file => (

                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                         
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">Fichier {file.id}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{file.email}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{file.nomF1}</p>
                      </td>
                      <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{file.nomF2}</p>
                      </td>
                     
                       
                    </tr>
                   
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>




    </main>


</body>
    </div>
  )
}

export default Projet
