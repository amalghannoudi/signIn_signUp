import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { updateAbonn } from '../../services/abonnService';
function Edit_abonn(props) {
  const [show, setShow] = useState(false);
  const { abonn } = props;
  const [titre, setTitre] = useState(abonn.titre);
  const [userName, setUserName] = useState(abonn.userName);
  const [email, setEmail] = useState(abonn.email);
  const [id, setId] = useState(abonn.id);
  const [dateF, setDateF] = useState(abonn.dateF);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedAbonn = {
        id:id , 
        dateF: dateF,
      
      };
      console.log("update",updatedAbonn);
      try {
        const response = updateAbonn (updatedAbonn);
        console.log("response", response);
        props.onUpdateSuccess();

        handleClose();
      } catch (error) {
        console.error("error", error);
      }
   
  };

  return (
    <>
      <a
        href="#"
        onClick={handleShow}
        class="btn btn-link text-dark text-gradient px-3 mb-0"
        data-toggle="tooltip"
        data-original-title="Edit user"
      >
        Modifier
      </a>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Abonnement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          <div class="mb-3">
              <label for="userName" class="form-label">
                UserName 
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
              <label for="titre" class="form-label">
                Titre
              </label>
              <input
                type="text"
                class="form-control"
                id="titre"
                name="titre"
                value={titre}
                onChange={(event) => setTitre(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="dateF" class="form-label">
                Date Fin
              </label>
              <input
                type="text"
                class="form-control"
                id="dateF"
                name="dateF"
                value={dateF}
                onChange={(event) => setDateF(event.target.value)}
              />
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

export default Edit_abonn;
