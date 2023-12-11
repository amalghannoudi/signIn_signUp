import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { updateUser } from '../../services/userService';

const Edit_profil = ({ show, handleClose, userData , onUpdateSuccess }) => {

  console.log("profil", userData);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [phone, setPhone] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [profession, setProfession] = useState('');
  const [information, setInformation] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (userData) {
      setUserName(userData.userName || '');
      setEmail(userData.email || '');
      setAdresse(userData.adresse || '');
      setPhone(userData.phone || '');
      setDateNaissance(userData.dateNaissance || '');
      setProfession(userData.profession || '');
      setInformation(userData.information || '');
      setId(userData.id || '');
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updated = {
      id: id,
      userName: userName,
      email: email,
      adresse: adresse,
      phone: phone,
      dateNaissance: dateNaissance,
      profession: profession,
      information: information,
    };

    try {
      const response = await updateUser(updated);

      console.log(response);
   /*copie du l'objet*/
      const updatedUserData = {
        ...userData,
        userName: userName,
        email: email,
        adresse: adresse,
        phone: phone,
        dateNaissance: dateNaissance,
        profession: profession,
        information: information,
      };
      onUpdateSuccess(updatedUserData);
            handleClose();
      const formValues = {
        userName: userName,
        email: email,
        adresse: adresse,
        phone: phone,
        dateNaissance: dateNaissance,
        profession: profession,
        information: information,
      };
      localStorage.setItem('formValues', JSON.stringify(formValues));
    } catch (error) {
      console.error(error);
    }
  };






    return (
        <>
         
    
         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >            <Modal.Header closeButton>
              <Modal.Title>Modifier Votre Profil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="userName" class="form-label">
                    userName 
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="userName"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    email 
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="adresse" class="form-label">
                    adresse
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="adresse"
                    value={adresse}
                    onChange={(event) => setAdresse(event.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">
                  phone
                  </label>
                  <input
                    type="phone"
                    class="form-control"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  
                  />
                </div>
                <div class="mb-3">
                  <label for="dateNaissance" class="form-label">
                  dateNaissance
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="dateNaissance"
                    value={dateNaissance}
                    onChange={(event) => setDateNaissance(event.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="profession" class="form-label">
                    profession                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="profession"
                    value={profession}
                    onChange={(event) => setProfession(event.target.value)}
                  
                  />
                </div>
                <div class="mb-3">
                  <label for="information" class="form-label">
                    Informations
                  </label>
                  <textarea
                    class="form-control"
                    id="information"
                    name="information"
                    value={information}
                    onChange={(event) => setInformation(event.target.value)}
                                    ></textarea>
                </div>
                <Button variant="secondary" onClick={handleClose}>
                  Annuler
                </Button>
                <Button variant="primary" type="submit">
                  Modifier
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      );
    }


export default Edit_profil
