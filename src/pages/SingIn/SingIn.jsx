import React from 'react';
import './SingIn.css'; 
import axios from 'axios';

import user from "../../images/svg/user.svg";
import password from "../../images/svg/lock.svg";
import facebook from "../../images/facebook (2).png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/svg/twitter.svg" ; 
import google from "../../images/google.png" ; 
import register from "../../images/register1.png";
import { Container,Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar1 from '../NavBar1/NavBar1';
import Footer from '../Footer/Footer';
import { signIn } from '../../services/cnxService';
const SingIn = () => {

   const navigate=useNavigate();
   const TosignUp=()=>{
    navigate("/signup");
   }
   const [Values,setValues]=useState({
    email: '',
    password: ''

   });
   const [error, setError] = useState(null);

   const [errors, setErrors] = useState({
    email: '',
   
    password: ''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...Values, [name]: value });
    console.log(Values);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = Values;
    
     
    let newErrors = {};

    if (!email) {
      newErrors.email = 'email est obligatoire';
    }

    if (!password) {
      newErrors.password = 'Password est obligatoire';
    }

    setErrors(newErrors);
    signIn(Values)
    .then((response) => {
      if (response.success) {
        if (response.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/map');
        }
      } else {
        setError(response.message);
        console.log(response.message);
      }
    })
    .catch((error) => {
      console.error(error);
    }); 
    
  };

  return (<div>
    <NavBar1 />
    <body>

    <div class="container">
      
        <div class="form-container sign-in-container">
            <form className='form'  onSubmit={handleSubmit}>
            <div className="part1">

                <h3>Se connecter</h3>
                </div>
              
                <input className="input" type="text" name="email"    placeholder="Votre mail"
        value={Values.email} onChange={handleChange} />
        <br></br>   
        <input className="input" type="password" name="password"   placeholder="Your password " 
        value={Values.password} onChange={handleChange} />
                <a href="#">Mot de passe oublié?</a>
                <button class="ghost1">Se connecter</button>
                <br></br>
                {error && <div className="error"> {error} </div>}


            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
               
                <div class="overlay-panel overlay-right">
                    <h3 className='part2'>Rejoindez-nous !</h3>
                    <img className="image"src={register}  /> 

                    <p className="para">Si vous n'avez pas un compte ,Veuillez s'inscrire pour nous rejoindre</p>
                    <button class="ghost" id="signUp" onClick={TosignUp}>S'inscrire</button>

                </div>
            </div>
        </div>
    </div>
    </body>
   <Footer />
    </div>
  )
}

export default SingIn