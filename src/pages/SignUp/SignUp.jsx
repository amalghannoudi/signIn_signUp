import React from 'react'
import './SignUp.css';
import register from "../../images/login.png";
import { Container,Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  
  const navigate=useNavigate();

  const TosignIn=()=>{
   navigate("/signin");
  }
    const [values, setValues] = useState({
      phone:'',
      userName: '',
      adresse:'',
      email: '',
      password: '',
    });
  
    const [errors, setErrors] = useState({
      phone:'',
      userName: '',
      adresse:'',
      email: '',
      password: '',
    });
    const handleClick=()=>{
      this.props.history.push("/signin") ;
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
      console.log(values);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const { userName,phone,adresse, email, password } = values;
      
       
      let newErrors = {};
  
      if (!userName) {
        newErrors.userName = 'UserName est obligatoire';
      }
      if (!adresse) {
        newErrors.Name = 'adresse est obligatoire';
      }
      if (!phone) {
        newErrors.phone = 'phone est obligatoire';
      } else if (isNaN(phone)){
        newErrors.phone = 'phone incorrete';
      } else if  (phone.length < 8){
        newErrors.phone = 'phone incorrecte';

      }
  
      if (!email) {
        newErrors.email = 'Email est obligatoire';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email incorrecte';
      }
  
      if (!password) {
        newErrors.password = 'Password est obligatoire';
      } else if (password.length < 6) {
        newErrors.password = 'longeur au moins 6 caracteres';
      }
  
      setErrors(newErrors);
     
        const config = {
          headers: {
            'Content-Type': 'application/json',
            mode: 'cors',

          }
        };
      axios.post('http://localhost/pfe_backend/signup.php',values,config)
      .then((result)=>{
        if(result.data.Statues=='Invalid')
        alert('invalid user');
        else 
        navigate("/signin");
      })
    
    };
    /*
    const form =new FormData();
    form.append('userName',values.userName);
    form.append('Name',values.Name);
    form.append('phone',values.phone);
    form.append('email',values.email);
    form.append('password',values.password);
    axios.post("http://localhost/pfe_backend/compte.php",form)
    .then(response=>alert(response.data))
    .catch(error=> alert(error));
*/
 
  return (
      <div className="body">
        
    
  <div className="box">
  <Container>
        <Row>
        <Col xs={6}>

      <div className="img">
    
        <h3>Welcome Back!</h3>
        <h4>Si vous avez déja un compte vous pouvez connecter</h4>
        <img src={register} /> 
        <br>
        </br>

        <button type="submit" className="main-button-slider" onClick={TosignIn} >Se connecter</button> 
        
       </div>
       </Col>

       <Col xs={6}>

    <div className="signup">
      <form  onSubmit={handleSubmit} >
        <h2 className="title">S'inscrire</h2>

        <div className="input-field">
        <input type="text" name="userName"  placeholder="Your userName"
        value={values.userName} onChange={handleChange} />
           {errors.userName && <span>{errors.userName}</span>}

          </div>
      
      <div className="input-field">

      <input type="email" name="email"  placeholder="Your email"
        value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}

          </div>
          <div className="input-field">

<input type="text" name="adresse"  placeholder="Your adresse"
value={values.adresse} onChange={handleChange} />
 {errors.adresse && <span>{errors.adresse}</span>}

</div>
        <div className="input-field">

        <input type="text" name="phone"  placeholder="Your Phone"
         value={values.phone} onChange={handleChange} />
         {errors.phone && <span>{errors.phone}</span>}
      
        </div>

      

         <div className="input-field">

       <input type="password" name="password"   placeholder="Your password"
         value={values.password} onChange={handleChange} />
         {errors.password && <span>{errors.password}</span>}
     
         </div>
       
      <br></br>
        <button type="submit" disabled={Object.keys(errors).some((key) => errors[key])} className=" main-button-slider" name="signUp">S'inscrire</button> <br></br>
        
      </form>

    </div>
    </Col>

    </Row>

  </Container>
  </div>
  
</div>
 
  

  )
}


export default SignUp
