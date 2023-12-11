import React from 'react'
import '../Admin/Admin.css'
import logo_ct from '../../images/logo-ct.png'
import team_1 from '../../images/team-1.jpg'
import team_2 from '../../images/team-2.jpg'
import team_3 from '../../images/team-3.jpg'

import projet3 from '../../images/projet3.webp'
import projet4 from '../../images/projet4.webp'
import SideBar from '../SideBar/SideBar';
import admin from '../../images/admin.png'

import {useEffect,useState} from 'react'
import edit from '../../images/edit.png'
import compte from '../../images/compte.jpg'
import dash from '../../images/dash.png'
import payement from '../../images/payement.png'
import axios from 'axios';
import { Container,Row,Col } from 'react-bootstrap'
import Edit_profil from '../Modals/Edit_profil'
import { getUserById } from '../../services/userService'
import { addMsg, getByEmail } from '../../services/msgService'
import { getFileByUserId } from '../../services/fileService'
 
const Profil  = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [file,setFile]=useState([]);
  const [msg,setMsg]=useState([]);
  const [calcul,setCalcul]=useState([]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };


  useEffect(() => {
    const userId = localStorage.getItem('userId');
  
    getUserById(userId)
      .then((response) => {
        console.log(response);
        setUserData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Run only once when the component mounts
  
  useEffect(() => {
    if (userData) {
      const email = userData.email;
      console.log("emaaail", email);
      getByEmail(email)
    .then((data) => {
      console.log("message", data);
      setMsg(data);
    })
    .catch((error) => {
      console.error(error);
    });
  
      const userId = localStorage.getItem('userId');
      getFileByUserId(userId)
      .then((data) => {
        console.log("file", data);
        setFile(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [userData]); 
  
   const [values, setValues] = useState({
    userName: '',
    email: '',
    destinataire: '',
    message :''


  });


  const handleChange = (event) => {
    const { name, value } = event.target;
   
    setValues({ ...values, [name]: value, userName: userData?.userName, email: userData?.email });
    console.log(values);
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log("msg",values);
    addMsg(values)
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log("message envoyé");
        alert("Message envoyé!")
        setValues({
          userName: '',
          email: '',
          destinataire: '',
          message: ''
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });

    getByEmail(userData.email)
    .then((data) => {
      console.log("message", data);
      setMsg(data);
    })
    .catch((error) => {
      console.error(error);
    });

  };
  const handleUpdate = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  if (!userData) {
    return <p>Loading user information...</p>;
  }
  
return (
 <div>
    <Row>
                        <Col md={2}>
                      <SideBar activePage="Profil"/>
                      </Col>
               <Col md={10}>
                  <body class="g-sidenav-show  bg-gray-200">

<div class="main-content position-relative max-height-vh-100 h-100 bg-gray-200">
  
  
  <div class="container-fluid px-2 px-md-4 bg-gray-200">
  <div class="page-header min-height-300 border-radius-xl mt-4 background-image:  url(../../images/profil.png);" >
      <span class="mask  bg-gradient-primary  opacity-6"></span>
    </div>
  <div class="card1 card1-body mx-3 mx-md-4 mt-n6">
  <div class="row gx-4 mb-2">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src={team_3} alt="profile_image" class="w-100 border-radius-lg shadow-sm" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h2 class="mb-1">
              {userData.profession}
            </h2>
            <p class="mb-0 font-weight-normal text-sm">
                      {userData.userName}
            </p>
          </div>

        </div>

        <img className="profil_edit" src={edit} alt="edit"  onClick={handleShowEditModal}
                    />
                  <Edit_profil
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    title="profil" userData={userData} 
                    onUpdateSuccess={handleUpdate}
                     />


      </div>
      <div class="row">
        <div class="row">
          
          <div class="col-12 col-xl-8">
            <div class="card1 card1-plain h-100">
              <div class="card1-header pb-0 p-3">
                <div class="row">
                  <div class="col-md-8 d-flex align-items-center">
                    <h4 class="mb-0">Informations Personnelles</h4>
                  </div>
                  <div class="col-md-4 text-end">
                    <a href="javascript:;">
                      <i class="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card1-body p-3">
                <p class="text-sm">
                {userData.information}
                </p>
                <hr class="horizontal gray-light my-4"/>
                <ul class="list-group">
                  <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Nom:</strong> &nbsp; {userData.userName}</li>
                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp;{userData.email} </li>

                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Numéro de téléphone:</strong> &nbsp; (+216){userData.phone} </li>
                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Adresse:</strong> &nbsp;{userData.adresse} </li>
                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Date de naissance:</strong> &nbsp;{userData.dateNaissance}</li>

                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-4">
            <div class="card1 card1-plain h-100">
            <h4 className="mb-0">Vos Message(s)</h4>
<br></br>
{msg.length > 0 ? (
  msg.map((msg) => (
    <div key={msg.id}>
      <strong className={msg.destinataire === userData.email ? "text-dark" : "text-primary"}>
        {msg.destinataire === userData.email ? `From ${msg.userName}:` : `Vous:`}
      </strong>
     
      <p className="gray-light text-sm">
        <strong className="text-small">Message: </strong>
        <span className="text-small">{msg.message}</span>
      </p>
      <p className="gray-light text-sm">
        <strong className="text-small">Date: </strong>
        <span className="text-small">{msg.date}</span>
      </p>
      <br />
    </div>
  ))
) : (
  <p className="gray-light text-sm">Il n'y a pas de messages.</p>
)}


              <div class="card1-header pb-0 p-3">
                <h4 class="mb-0">Envoyer Message</h4>
              </div>
              <div class="card1-body p-3">
              <form id="message"  onSubmit={handleSubmit} wow fadeInRight data-wow-duration="0.5s" data-wow-delay="0.25s">
              
              <fieldset>
                <input type="text" name="destinataire" placeholder='Destinataire'  required value={values.destinataire} onChange={handleChange}/>
              </fieldset>
              <fieldset>
              <textarea name="message" placeholder='New message'  required value={values.message} onChange={handleChange}></textarea>
              <button type='sumbit'>Envoyer</button>
              </fieldset>
           
            </form>
              
              </div>
            </div>
          </div>
          <div class="col-12 mt-4" >
            <div class="mb-5 ps-3">
              <h4 class="mb-1">Les conversions</h4>
            </div>
            <div class="row">
            {file && file.map(file => (

              <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
                <div class="card1 card1-blog card1-plain">
                  <div class="card1-header p-0 mt-n4 mx-3">
                    <a class="d-block shadow-xl border-radius-xl">
                      <img src={projet3} alt="img-blur-shadow" class="img-fluid shadow border-radius-xl"/>
                    </a>
                  </div>
                  <div class="card1-body p-3">
                    <p class="mb-0 text-sm">Fichier #{file.id}</p>
                    <a href="javascript:;">
                      <h5>
                        Conversion {file.nomF1}
                      </h5>
                    </a>
                    <p class="mb-4 text-sm">
                        conversion un fichier du type {file.typeF1} à fichier de type {file.typeF2}
                      </p>
                  
                  </div>
                </div>
              </div>
            ))}
            
            

            </div>
              </div>
          </div>
          </div>
  </div>
  </div>




  </div>
</body>
</Col>
</Row>

        </div>
  )
}

export default Profil
