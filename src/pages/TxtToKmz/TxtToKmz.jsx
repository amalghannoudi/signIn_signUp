import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { useState,useEffect } from "react";
import { Container,Row,Col } from 'react-bootstrap'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { faMap,faCalculator,faFile } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import MapDisplay from "../MapDisplay/MapDisplay";
import { saveFile } from '../../services/fileService';




            const TxtToKmz = () => {
   
             
                  const [selectedFile, setSelectedFile] = useState(null);
                  const [coordinates, setCoordinates] = useState([]) ; 
                  const [showMap, setShowMap] = useState(false);

                  const handleSubmit = (event) => {
                    event.preventDefault();

                  }
                    const handleFileInput = (event) => {
                      const formData = new FormData();

                      setSelectedFile(event.target.files[0]);
                
                        const file = event.target.files[0];
                        /* lire du fichier importé et affichier les cordonnées dans le tableau */
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const fileData = e.target.result;
                         
                          const lines = fileData.trim().split('\n');
                          const coordinates = lines.slice(1).map(line => {
                            const [latitude, longitude] = line.split(',');
                            return { 

                              latitude: latitude, 
                              longitude: longitude 
                            };
                          });
                          setCoordinates(coordinates);
                        };
                        reader.readAsText(file);

                    formData.append("file", file);
                    const userId=localStorage.getItem("userId");
                    formData.append("userId", userId);
                  
                      };

                      const handleToMapClick = () => {
                        setShowMap(true);
                        handleUpload();

                      };
                    
                       /* creer le fichier kmz o le save it */
                      const handleUpload = () => {
                        const formData = new FormData();
                        formData.append("userId", localStorage.getItem("userId"));
                    
                        formData.append("file", selectedFile);
                        
                          const kmzData = coordinates;
                          console.log("kmz",kmzData);
                          const kmzFile = new Blob([kmzData], { type: "application/vnd.google-earth.kmz" });
                          formData.append("file2", kmzFile);
                          formData.append("filename2", "TXT_KMZ.kmz");
                         
                          saveFile(formData);

                      };
                    
                    
                    
                    
                    
                    
                    
                    
                  return (

                    <div>
                      <Row>
                        <Col md={3}>
                      <SideBar activePage="TxtToKmz"/>
                      </Col>
               <Col md={9}>
                    <div className="upload-box">
                    <form name="main" method="POST" enctype="multipart/form-data"  onSubmit={handleSubmit} >
                    <h3 >Télécharger un fichier TXT:</h3>
                    <div >
                        <input type="file" name="file-upload"  id="file-upload" onChange={handleFileInput}/>
                       <br></br>
                       <br></br>
                       </div>
                    
                        <Stack className="button" direction="row" spacing={2}>

                          
                                      <Button variant="contained" disabled={!selectedFile} onClick={handleToMapClick}>
                           <FontAwesomeIcon icon={faMap} />
                                      To_Map</Button>
                      
                             </Stack>


                             </form>
                    </div> 
                             
                  
                    <br></br>
                  
                    <div style={{ overflowX: 'auto' }}>
                    <div>
    
 <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="yas">Convertir TXT en KMZ</h6>
              </div>
            </div>
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th colSpan={6} class="aa" >WGS(84)</th>
                   
                    </tr>

          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
        {coordinates.map((coord, index) => (
              <tr key={index}>
                <td>{coord.latitude}</td>
                <td>{coord.longitude}</td>
              </tr>
            ))}

        
      </tbody>

         
      </table>
  
    </div>
    </div>
    
    {showMap && <MapDisplay coordinates={coordinates} />}

     </div>
     </div>
     </div>
     </div>
     </div>
     </Col>
     </Row>
     </div>


            )};
                
                
                

export default TxtToKmz
