

import React, {useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { usePreviousProps } from "@mui/utils";
import { deletePack } from '../../services/packService'
import { deleteAbonn } from '../../services/abonnService';
import { deleteMsg } from '../../services/msgService';

function Delete(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

        const supprimer = (id) => {
           if (props.title=="Pack"){
            deletePack(id)
            .then((response) => {
              console.log(response);
              handleClose();
              props.onDeleteSuccess();


            })
            .catch((error) => {
              console.error(error);
            });
          }    else if (props.title=="message"){
            deleteMsg(id)
            .then((data) => {
              console.log(data);
              handleClose();
              props.onDeleteSuccess();
            })
            .catch((error) => {
              console.error(error);
            });
        }  else if (props.title=="Abonnement"){
          deleteAbonn(id)
          .then((response) => {
              console.log(response.data);
              handleClose(); 

              props.onDeleteSuccess();

            })
            .catch((error) => {
              console.error(error);
            });      
        }
    }
  return (
    <>
    <a href="#" onClick={handleShow} class="btn btn-link text-danger text-gradient px-3 mb-0"  data-toggle="tooltip" data-original-title="Edit user">
                          Supprimer
                        </a>
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Supprimer {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Attention ! Si vous supprimez ce {props.title} tous ces données seront supprimés .
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={()=>supprimer(props.id)  } >Supprimer</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Delete;