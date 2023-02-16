import React from 'react';
import './SingIn.css'; 

import user from "../../images/svg/user.svg";
import password from "../../images/svg/lock.svg";
import facebook from "../../images/svg/facebook.svg";
import linkedin from "../../images/svg/linkedin.svg";
import twitter from "../../images/svg/twitter.svg" ; 
import google from "../../images/svg/google.svg" ; 
import register from "../../images/register1.png";
import { Container,Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SingIn = () => {
   const navigate=useNavigate();
   const TosignUp=()=>{
    navigate("/signup");
   }
   const [Values,setValues]=useState({
    userName: '',
    password: ''

   });
   const [errors, setErrors] = useState({
    userName: '',
   
    password: ''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...Values, [name]: value });
    console.log(Values);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = Values;
    
     
    let newErrors = {};

    if (!userName) {
      newErrors.userName = 'UserName est obligatoire';
    }

    if (!password) {
      newErrors.password = 'Password est obligatoire';
    }

    setErrors(newErrors);
    
    
  };

  return (
    <div className="body">
      <div className="box">

      <Container>
<Row>

<Col xs={6}>
  <div className="right">
    <form onSubmit={handleSubmit}>
      <h2 className="title">Se connecter</h2>
      <div className="formulaire">
       <img className="svg" src={user} width="22" height="22"/>
        <input className="zone" type="text" name="userName"    placeholder="UserName or Mail"
        value={Values.userName} onChange={handleChange} />
        {errors.userName && <span>{errors.userName}</span>}
        <br></br>
        <br></br>

      </div>
      <div className="formulaire">
        <img className="svg" src={password} width="22" height="22" />

        <input className="zone" type="password" name="password"   placeholder="Your password " 
        value={Values.password} onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}

      </div>
      <br></br>
      <button  type="submit" className="main-button-slider">Sign In </button> 
      <br></br>


      <p className="social-text">Or Sign in with social platform</p>

      <div className="social-media">
        <a href="#" className="social-icon">    
               <img  className="icon" src={facebook}  width="20" height="20" />
        </a>
        <a href="#" className="social-icon">            
              <img  src={linkedin}  width="20" height="20" />
        </a>
        <a href="#" className="social-icon">          
               <img src={twitter} width="20" height="20" />
        </a>
        <a href="#" className="social-icon">
          <img src={google} width="20" height="20" />

        </a>

      </div>
    </form>
    </div>

    </Col>
    <Col xs={6}>
    <div className="left">
  <h3>Hello,Friend!</h3>
  <h4>Si vous n'avez pas un compte ,S'inscrire pour nous rejoindre</h4>
  <img src={register} height="80%" width="80%"/> 
  <br></br>
  <button  type="submit" className="main-button-slider" onClick={TosignUp}>S'inscrire </button> 


</div>
</Col>
</Row>
</Container>

</div>
    </div>

    
  )
}

export default SingIn
