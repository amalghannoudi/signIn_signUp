import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { addMsg } from '../../services/msgService';

const Replay = (props) => {

    const [show, setShow] = useState(false);
    const { msg } = props;
    const [userName,setUserName]=useState("admin");
    const [email,setEmail]=useState("admin")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [destinataire, setDestinataire] = useState(msg.email);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let item={userName,email,destinataire,message};
        console.log(item);
        addMsg(item)
        .then((data) => {
          console.log(data);
          handleClose();
          props.onUpdateSuccess();
        })
        .catch((error) => {
          console.error(error);
        });
      }
  return (
        <>
    <a href="#" onClick={handleShow}   
      class="btn btn-link text-dark text-gradient px-3 mb-0"
 data-toggle="tooltip" data-original-title="Edit user">
Répondre                  </a>
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Répondre </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="destinataire" class="form-label">
                Destinataire 
              </label>
              <input
                type="text"
                class="form-control"
                name="destinataire"
                value={destinataire}
                onChange={(event) => setDestinataire(event.target.value)}
              />
            </div>
            
            <div class="mb-3">
              <label for="message" class="form-label">
                Message
              </label>
              <textarea
                class="form-control"
                id="message"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
            <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
                Répondre</Button>
          </form>
        </Modal.Body>
       
      </Modal>
    </>
 

  )
}

export default Replay
