import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { updatePack } from '../../services/packService'

function Edit_pack(props) {
  const [show, setShow] = useState(false);
  const { pack } = props;
const [titre, setTitre] = useState(pack.titre);
const [montant, setMontant] = useState(pack.montant);
const [information, setInformation] = useState(pack.information);
const [id, setId] = useState(pack.id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPack = {
      id:id , 
      titre: titre,
      montant: montant,
      information: information,
    };
    console.log(updatedPack);
  
    try {
      const response = updatePack(updatedPack);
      console.log(response);
      handleClose();
      props.onUpdateSuccess();
    } catch (error) {
      console.error(error);
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
          <Modal.Title>Modifier {props.title}</Modal.Title>
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
                type="text"
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
            <Button variant="primary" type="submit">
              Modifier
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Edit_pack;
