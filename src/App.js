import React from 'react';
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

function App() {
  return (
   <BrowserRouter >
       <Navbar/>
      <Home/>
      <Footer/>
   </BrowserRouter> 
    );
}

export default App;
