import React from 'react';
import './Add2D.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { useState,useEffect } from "react";
import { Container,Row,Col } from 'react-bootstrap'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { faCoffee,faCalculator,faFile } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../SideBar/SideBar';
import { saveFile } from '../../services/fileService';
import { convertKML } from '../../services/convertService';

            const Add2D = () => {
   
                  const [selectedFile, setSelectedFile] = useState(null);
                  const [coordinates, setCoordinates] = useState([{ point: "0,0" }]);
                  const [errorMessage, setErrorMessage] = useState("");
                  const [error, setError] = useState(null);
                  const [fileName, setFileName] = useState(""); 

                  const userId = localStorage.getItem("userId");

                  const handleFileInput = (event) => {
                    setSelectedFile(event.target.files[0]);
                  };
                 
                  const handleSubmit = (event) => {
                    event.preventDefault();
                  
                    if (selectedFile.type !== "application/vnd.google-earth.kml+xml") {
                      setErrorMessage("Invalid file type. Only KML files are allowed.");
                      return;
                    }
                  
                    /* la conversion du KML en TXT */
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    formData.append("userId", userId);

                       convertKML(formData)
                      .then((data) => {
                        console.log("data",data);
                        const coordinates = data
                          .trim()
                          .split("\n")
                          .map((point) => ({ point }));
                        setCoordinates(coordinates);
                        console.log(coordinates);

                        /* construire un noveau fichier Txt */
                        const filename = "KML_TXT.txt";
                        const header = "latitude\t,\tlongitude\t\t\n";
                        const file2 = new Blob([header + data], { type: "text/plain" });
                  
                        formData.append("filename2", filename);
                        formData.append("file2", file2);

                        saveFile(formData);

                         /* le telechargement dans pc*/
                        if (window.navigator.msSaveOrOpenBlob) {
                          window.navigator.msSaveOrOpenBlob(file2, filename);
                        } else {
                          const a = document.createElement("a");
                          const url = URL.createObjectURL(file2);
                          a.href = url;
                          a.download = filename;
                          document.body.appendChild(a);
                          a.click();
                          setTimeout(() => {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                          }, 0);
                        }
                      })
                      .catch((error) => setError(error.message));
                  };
                       
         

                  return (
                    <div>
                      <Row>
                        <Col md={3}>
                      <SideBar activePage="Add2D"/>
                      </Col>
               <Col md={9}>
                    <div className="upload-box">
                    <form name="main" method="POST" enctype="multipart/form-data"  onSubmit={handleSubmit}>
                    <h3 >Télécharger un fichier KML:</h3>
                    <div >
                        <input type="file" name="file-upload"  id="file-upload" onChange={handleFileInput}/>
                       <br></br>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        
                       <br></br>
                       </div>
                    
                        <Stack className="button" direction="row" spacing={4}>

                        <Button type="sumbit" variant="contained" disabled={!selectedFile}>
                        <FontAwesomeIcon icon={faFile} />

                                  Convertir</Button>
                         

                             </Stack>

      {fileName && ( // afficher le lien de téléchargement s'il y a un nom de fichier
                  <a href={`http://localhost/projet/api/${fileName}`}
                             download={fileName}>{fileName}</a>
)}
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
                <h6 class="yas">Convertir KML en TXT</h6>
              </div>
            </div>
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th colSpan={8} className="aa">WGS(84)</th>
                    </tr>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
          
          </tr>
        </thead>
        <tbody>
        {coordinates.map((coordinate, index) => {
         


          return (
            <tr key={index}>
              <td>{coordinate.point.split(',')[0]}</td>
              <td>{coordinate.point.split(',')[1]}</td>
            
            </tr>
          );
        })}
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
                  );
                }
                
                

export default Add2D