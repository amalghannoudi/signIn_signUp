import React from 'react';
import './Add3D.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from "react";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { faCoffee,faCalculator,faFile } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../SideBar/SideBar';
import { Container,Row,Col } from 'react-bootstrap'
import { saveFile } from '../../services/fileService';
import { convertKMZ } from '../../services/convertService';


            const Add3D = () => {
   
                  const [selectedFile, setSelectedFile] = useState(null);
                  const [coordinates, setCoordinates] = useState([]);
                  const [error, setError] = useState(null);

                  const handleFileInput = (event) => {
                    setSelectedFile(event.target.files[0]);
                  };
                 
                  const handleSubmit = (event) => {
                    event.preventDefault();

                    const userId=localStorage.getItem("userId");

                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    formData.append("userId", userId);
                  
                    
                    /* la conversion du kmz en txt */
                    convertKMZ(formData)
                    .then((data) => {
                      setCoordinates(data);
                      console.log(coordinates);

                      /* construire le fichier TXT*/
                      const filename = "KMZ_TXT.txt";
                      const header = "latitude\t,longitude\t,elevation\n";
                      const content = data.map((item) => `${item.latitude}\t,${item.longitude}\t,${item.elevation}\n`).join("");
                      const file2 = new Blob([header, content], {type: "text/plain"});
                    
                      formData.append("filename2", filename);
                      formData.append("file2", file2);

                      saveFile(formData);
                                     
                      /*telecharger le fichier dans pc*/
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
                    .catch((error) => console.log(error));
                  };
                  
                    if (error) {
                      return <div>Error: {error}</div>;
                    }
              
                  return (
                    <div>
                    <Row>
                    <Col md={3} >
                  <SideBar activePage="Add3D"  />
                  </Col>
                   <Col md={9}>
                    <div className="upload-box">
                    <form name="main" method="POST" enctype="multipart/form-data"  onSubmit={handleSubmit}>
                    <h3 >Télécharger un fichier KMZ:</h3>
                    <div >
                        <input type="file" name="file-upload"  id="file-upload" onChange={handleFileInput}/>
                       <br></br>
                       <br></br>
                       </div>
                    
                        <Stack className="button" direction="row" spacing={2}>

                        <Button type="sumbit" variant="contained" disabled={!selectedFile}>
                        <FontAwesomeIcon icon={faFile} />

                                  Convertir</Button>
                         

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
                <h6 class="yas">Convertir KMZ en TXT</h6>
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
            <th>Atitude</th>

            </tr>
        </thead>
        <TableBody>
        {coordinates.map((coordinate, index) => {
         

          return (
            <TableRow key={index}>
              <TableCell>{coordinate.latitude}</TableCell>
              <TableCell>{coordinate.longitude}</TableCell>
              <TableCell>{coordinate.elevation}</TableCell>

             
            </TableRow>
          );
        })}
      </TableBody>

         
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
                
                

export default Add3D