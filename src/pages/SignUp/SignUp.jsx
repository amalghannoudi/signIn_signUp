import React from 'react'
import './SignUp.css';
import register from "../../images/login.png";
import { Container,Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer';
import NavBar1 from '../NavBar1/NavBar1';
import { signUp } from '../../services/cnxService';
const SignUp = () => {
  
  const navigate=useNavigate();

  const TosignIn=()=>{
   navigate("/signin");
  }
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
      phone:'',
      userName: '',
      adresse:'',
      email: '',
      password: '',
      profession :'',
      information:'',
      dateNaissance:'',
    });

   
    const handleChange = (event) => {
      const { name, value } = event.target;
     
      setValues({ ...values, [name]: value });
      console.log(values);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
    
      console.log(values);
      signUp(values)
      .then(( response) => {
        if (response.success) {
          console.log(response.message);
          navigate('/signin');
        } else {
          setError(response.message);
          console.log(response.message);
        }
      

        
      })
      .catch((error) => {
        console.error(error);
      });     
    
    };

 
  return (
    <div>
      <NavBar1 />
   <body>
  
    <div class="container">
   
    <div class="overlay-container">

    <form onSubmit={handleSubmit}>
              <div className='part1'>
                <h3 className='h3'>Créer un compte</h3>
                </div>
   <div className='block'>
  
    <input className="text-input" id="userNname" type="text" name="userName" placeholder='Votre nom' 
    value={values.userName} onChange={handleChange}/>
    <input className="text-input" id="email" type="email" name="email" placeholder='Votre email' value={values.email} onChange={handleChange} />
    <input className="text-input" id="adresse" type="text" name="adresse" placeholder='Votre adresse'value={values.adresse} onChange={handleChange} />

    <input className="text-input" id="phone" type="phone" name="phone" placeholder='Votre numéro' value={values.phone} onChange={handleChange}/>
    <input className="text-input" id="profession" type="text" name="profession" placeholder='Votre profession'value={values.profession} onChange={handleChange} />
    <input className="text-input" id="dateNaissance" type="text" name="dateNaissance" placeholder='AAAA/MM/JJ'value={values.dateNaissance} onChange={handleChange} />

    <div>
  
</div>
 

     
  <textarea id="information" name="information"placeholder='Pourquoi vous voulez nous rejoindre ...' value={values.information} onChange={handleChange}></textarea>
  <input className="password" id="password" type="password" name="password" placeholder='Mot de passe'value={values.password} onChange={handleChange} />
  
  <button class="ghost1" id="signIn">S'inscrire</button>    
  {error && <div className="error"> {error} </div>}

        </div>
            </form>
            </div>
        <div class="form-container sign-in-container">

            <div class="overlay">
               
                <div class="overlay-panel overlay-right">
                    <h3 className='part2'>Bienvenue</h3>
                    <img className="image"src={register}  /> 

                    <p className="para">Si vous avez déja un compte vous pouvez se connecter</p>
                    <button class="ghost" id="signUp" onClick={TosignIn}>Se connecter </button>
                </div>
            </div>
        </div>
    </div>
    </body>
    <Footer />
    </div>
 
  

  )
}


export default SignUp