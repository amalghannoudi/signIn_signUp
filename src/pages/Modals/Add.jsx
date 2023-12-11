

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { addPack } from '../../services/packService'

function Add(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [titre, setTitre] = useState("");
const [montant, setMontant] = useState("");
const [information, setInformation] = useState("");

const handleSubmit = async (event) => {

  event.preventDefault();
  let item={titre,montant,information};
  console.log(item);
  try {
    const response = addPack(item);
    console.log(response);
    props.onAddSuccess();
    handleClose();
  } catch (error) {
    console.error(error);
  }
}
  return (
    <>
                  <button  onClick={handleShow} className='add'>Noveau Pack</button>

     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Ajouter un Pack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="titre" class="form-label">
                Titre 
              </label>
              <input
                type="text"
                class="form-control"
                name="titre"
                value={titre}
                onChange={(event) => setTitre(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="montant" class="form-label">
                Montant
              </label>
              <input
                type="number"
                class="form-control"
                id="montant"
                name="montant"
                value={montant}
                onChange={(event) => setMontant(event.target.value)}
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
          <Button variant="primary" type="submit">  Ajouter         </Button>

          </form>
                   </Modal.Body>
        
      </Modal>
    </>
  );
}


export default Add;