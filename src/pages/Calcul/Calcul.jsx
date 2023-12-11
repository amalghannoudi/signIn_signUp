import React from 'react';
import { useState,useEffect } from "react";
import { Container,Row,Col } from 'react-bootstrap'

import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import CalculS from '../Modals/CalculS'
import CalculP from '../Modals/CalculP'


            const Calcul = () => {
   
             
                  const [selectedFile, setSelectedFile] = useState(null);
                  const [coordinates, setCoordinates] = useState([]);
                  const [error, setError] = useState(null);
                  const [fileName, setFileName] = useState(""); 
                  const [showMap, setShowMap] = useState(false);

                  const handleSubmit = (event) => {
                    event.preventDefault();
                   
                  }
                    const handleFileInput = (event) => {
                        setSelectedFile(event.target.files[0]);
                        const file = event.target.files[0];
                        console.log(file.name)
                        setFileName(file.name)

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
                      } ; 
              
                  
                  return (

                    <div>
                      <Row>
                        <Col md={3}>
                      <SideBar activePage="Calcul"/>
                      </Col>
               <Col md={9}>
                    <div className="upload-box">
                    <form name="main" method="POST" enctype="multipart/form-data"  onSubmit={handleSubmit} >
                    <h3 >Effectuer des calculs Topographiques:</h3>
                    <div >
                        <input type="file" name="file-upload"  id="file-upload" onChange={handleFileInput}/>
                       <br></br>
                       <br></br>
                       </div>
                  
                                      <CalculS title="Surface" coordinates={coordinates} fileName={fileName} />
                                      <CalculP title="Périmètre" coordinates={coordinates} fileName={fileName}  />
                                      
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
                <h6 class="yas">Les coordonnées </h6>
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
    
  

     </div>
     </div>
     </div>
     </div>
     </div>
     </Col>
     </Row>
     </div>


            )};
                
                
                

export default Calcul
