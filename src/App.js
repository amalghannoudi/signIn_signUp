import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import SignIn from './pages/SingIn/SingIn';
import SignUp from './pages/SignUp/SignUp';
import {BrowserRouter ,Routes , Route} from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
   <BrowserRouter >
   <Routes>
    <Route path='signin' element={<SignIn />} />
    <Route path='signup' element={<SignUp />} />

   </Routes>
   </BrowserRouter> 
    );
}

export default App;
