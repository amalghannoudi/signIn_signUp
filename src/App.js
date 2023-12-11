import React , {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';


import SignIn from './pages/SingIn/SingIn';
import SignUp from './pages/SignUp/SignUp';
import {BrowserRouter ,Routes , Route} from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import Add2D from './pages/Add2D/Add2D';
import Navbar from './pages/Navbar/Navbar';
import Footer from './pages/Footer/Footer';
import Home from './pages/Home/Home';
import SideBar from './pages/SideBar/SideBar';
import Add3D from './pages/Add3D/Add3D';
import Calcul from './pages/Calcul/Calcul';
import Admin from './pages/Admin/Admin';
import Abonnement from './pages/Abonnement/Abonnement';
import Profil from './pages/Profil/Profil';
import Projet from './pages/Projet/Projet';
import DrawMap from './pages/DrawMap/DrawMap';
import TxtToKmz from './pages/TxtToKmz/TxtToKmz';
import MapDisplay from './pages/MapDisplay/MapDisplay';
import NavBar1 from './pages/NavBar1/NavBar1';
import Map from './pages/Map/Map';
import Message from './pages/Messages/Message';
import Pack from './pages/Pack/Pack';
import Emplacement from './pages/Emplacement/Emplacement';
import Compte from './pages/Comptes/Compte';


function App() {

  return (
   <BrowserRouter >
   <Routes>
    <Route path='signin' element={<SignIn />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='add2d' element={<Add2D />} />
    <Route path='' element={<Home />} />
    <Route path='sidebar' element={<SideBar />} />
    <Route path='add3d' element={<Add3D />} />
    <Route path='calcul' element={<Calcul />} />
    <Route path='admin' element={<Admin />} />
    <Route path='abonnement' element={<Abonnement />} />
    <Route path='profil' element={<Profil />} />
 
          <Route path='projet' element={<Projet />} />
    <Route path='Compte' element={<Compte />} />
    <Route path='footer' element={<Footer />} />
    <Route path='drawmap' element={<DrawMap />} />
    <Route path='txttokmz' element={<TxtToKmz />} />
    <Route path='mapDisplay' element={<MapDisplay />} />
    <Route path='NavBar1' element={<NavBar1 />}  />
    <Route path='map' element={<Map />}  />
    <Route path='message' element={<Message />}  />
    <Route path='pack' element={<Pack />}  />
    <Route path='emplacement' element={<Emplacement />}  />

    <Route path='Navbar' element={<Navbar />}  />






    



   </Routes>
   </BrowserRouter> 
    );
}

export default App;
