import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { insertCalcul } from "../../services/calculService";

function CalculP(props) {

  const [show, setShow] = useState(false);
  const [perimetre, setDistance] = useState(0);
  const coordinates = props.coordinates;

  const idUser=localStorage.getItem("userId"); 
  const nomF= props.fileName ; 
  const calculatePerimetre = (coordinates) => {
    const R = 6378137; // Rayon de la Terre en mètres
    let perimetre = 0;
     // Calcul de la distance entre le premier et le dernier point en utilisant la formule de Haversine
  const dLat = ((coordinates[coordinates.length - 1].latitude - coordinates[0].latitude) * Math.PI) / 180;
  const dLon = ((coordinates[coordinates.length - 1].longitude - coordinates[0].longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coordinates[0].latitude * Math.PI) / 180) *
      Math.cos((coordinates[coordinates.length - 1].latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  perimetre += d;
  //parcourir les autres points et faire le calcul
    for (let i = 0; i < coordinates.length - 1; i++) {
      const p1 = coordinates[i];
      const p2 = coordinates[i + 1];
    //Cela calcule la différence de latitude en radians entre les points p1 et p2
      const dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180; 
      //Cela calcule la différence de longitude en radians entre les points p1 et p2
      const dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
      //Cette expression calcule la partie sous la racine carrée dans la formule de Haversine, 
      //qui est utilisée pour calculer la distance entre deux points sur une sphère
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.latitude * Math.PI) / 180) *
          Math.cos((p2.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
          // Cela calcule l'angle central entre les deux points
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;

      perimetre += d;
    }

    return (perimetre).toFixed(3);
  };
  
  const handleShow = () => {
    setDistance(calculatePerimetre(coordinates));
    setShow(true);
  };
  const addCalcul = async () => {
    const values = {
      idUser: idUser,
        operation: "Périmètre",
        nomF: nomF,
        resultat: perimetre,
    
    };
    try {
      insertCalcul (values);

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
      <a
        href="#"
        onClick={handleShow}
        className="btn btn-link text-dark text-gradient px-3 mb-0 btn-lg"
        data-toggle="tooltip"
        data-original-title="Edit user"
      >
       Calculer le périmètre
      </a>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Calcul du {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        La méthode employée pour calculer le périmètre consiste à utiliser la formule de Haversine
         pour calculer la distance entre deux points sur une sphère, comme la Terre.    
              <p>Le périmètre = {perimetre} en Kilo métres.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalculP;
