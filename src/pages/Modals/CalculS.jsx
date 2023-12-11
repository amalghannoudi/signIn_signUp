

import React, {useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { usePreviousProps } from "@mui/utils";
import { insertCalcul } from '../../services/calculService';

function CalculS(props) {
  const [show, setShow] = useState(false);
   const coordinates=props.coordinates ; 
    const [surface,setSurface]=useState(0) ; 
    const idUser=localStorage.getItem("userId"); 
     const nomF = props.fileName ;  
  /* fonction calcul surface basée sur methode du triangles */
  const calculateSurface = (coordinates) => {
    const R = 6378137; // Rayon de la Terre en mètres
    let surface = 0;
  
    // Boucle sur tous les triangles formés par les coordonnées géodésiques
    for (let i = 0; i < coordinates.length - 2; i++) {
      const p1 = coordinates[i];
      const p2 = coordinates[i + 1];
      const p3 = coordinates[i + 2];
  
      // Calcul de la distance entre deux points en utilisant la formule de Haversine
      const distance = (lat1, lon1, lat2, lon2) => {
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
      };
  
      // Calcul de la surface du triangle en utilisant la formule de Héron
      const a = distance(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
      const b = distance(p2.latitude, p2.longitude, p3.latitude, p3.longitude);
      const c = distance(p3.latitude, p3.longitude, p1.latitude, p1.longitude);
      const s = (a + b + c) / 2;
      const triangleSurface = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  
      // Ajout de la surface du triangle à la surface totale
      surface += triangleSurface;
    }
  
    // Conversion de la surface en kilomètres carrés
    const roundedSurface = (surface/100).toFixed(3);
  
    return roundedSurface;
  };
  const handleShow = () => {
    setSurface (calculateSurface(coordinates));
    setShow(true);
  };
  const addCalcul = async () => {
    const values = {
      idUser: idUser,
        operation: "Surface",
        nomF: nomF,
        resultat: surface,
    
    };
    try {
      insertCalcul(values);

    } catch (error) {
      console.error(error);
    }

  }
  const handleClose = () => {
    addCalcul(); 
    setShow(false);
  };
 
    return (
    <>
    <a href="#" onClick={handleShow} class="btn btn-link text-dark text-gradient px-3 mb-0 btn-lg" data-toggle="tooltip" data-original-title="Edit user">
                          Calculer la Surface
                        </a>
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Calcul du {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        La méthode utilisée pour calculer la surface d'un lot de terrain est la triangulation.
        <br></br>
        <p> Le surface = {surface} en Kilo métres carées.</p>
              </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default CalculS;