import React, { useState } from 'react'
import '../Admin/Admin.css'
import SideBar from '../SideBar/SideBar';
import { MapContainer, TileLayer, FeatureGroup,ZoomControl } from 'react-leaflet';
import {EditControl} from "react-leaflet-draw";
import {useRef, useEffect} from "react";
import { Container,Row,Col } from 'react-bootstrap'
import osm from "./osm-provider";
import './DrawMap.css';
import "../SideBar/SideBar";
import L from "leaflet"; 
import fileDownload from 'react-file-download';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload,faFile } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { shape } from '@mui/system';
import "../Map/LeafletGoecoder"
import LeafletGoecoder from '../Map/LeafletGoecoder';
import axios from 'axios';
import { addEmp, deleteEmp, updateEmp } from '../../services/emplService';

delete L.Icon.Default.prototype._getIconUrl ; 
L.Icon.Default.mergeOptions({
 
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DrawMap = () => {
  const [center,setCenter]=useState({lat :36.806389,lng:10.181667});
  const ZOOM_LEVEL=12 ; 
  const mapRef=useRef() ;
  const [shapes, setShapes] = useState([]);
  const [Shapecoordinates, setShapeCoordinates] = useState([]);
  const userId=localStorage.getItem("userId");
  
  /* la creation du emplacement */
  const _onCreated = (e) => {
    const layer = e.layer;
    console.log("layer",layer);
    const layerId=e.layer._leaflet_id ; 
    if (layer instanceof L.Marker) {
      const coordinates = [layer.getLatLng().lat, layer.getLatLng().lng];
      const shape = {
        layerId: layerId ,
        type: "Point",
        coordinates: coordinates

      };
      setShapes([...shapes, { layer, shape }]);
      setShapeCoordinates([...Shapecoordinates, coordinates]); 

    } else {
      const coordinates = layer.getLatLngs()[0].map((latLng) => {
        return [latLng.lat, latLng.lng];
      });
      const shape = {
        layerId: layerId ,
        type: "Polygon",
        coordinates: coordinates

      };
      setShapes([...shapes, { layer, shape }]);
      setShapeCoordinates([...Shapecoordinates, coordinates]); 

      console.log("id",e.layer._leaflet_id)
      console.log("shape",shape);

      /* construire l'objet et l'envoyé dans BD*/
      const formData = new FormData();
      formData.append("shape", JSON.stringify(shape));
      formData.append("userId", userId);
      addEmp(formData)
      .then((message) => {
        alert(message);
      })
      .catch((error) => {
        console.error(error);
      });
    }
 
  };

  /*mofider emplacement*/
  const _onEdited = (e) => {
    const editedLayer = e.layers.getLayers()[0]; // Get the edited layer
    const layerId = editedLayer._leaflet_id;
  console.log(layerId);
  const new_coordinates = editedLayer.getLatLngs()[0].map((latlng) => [latlng.lat, latlng.lng]);
  console.log("coordinates",new_coordinates)

 /* crée le noveau shape modifé et l'envoyé dans BD*/
const shape = {
  layerId: editedLayer._leaflet_id,
  type: "Polygon",
  coordinates:new_coordinates 
};

console.log("edited", shape);
updateEmp(shape)
.then((message) => {
  alert(message);
})
.catch((error) => {
  console.error(error);
});
  
};

  
  
  /* supp un emp*/
    const _onDeleted = (e) => {
        const deletedLayer = e.layers.getLayers()[0];
        if (deletedLayer) {
          const layerId = deletedLayer._leaflet_id;
          console.log("Deleted layer ID:", layerId);
          
  deleteEmp(layerId)
  .then((message) => {
    alert(message);
  })
  .catch((error) => {
    console.error(error);
  });
        } else {
          console.log("No layer has been deleted.");
        }
      };
           
     
        
    useEffect(() => {
      console.log("updated",shapes ) ; 
    }, [shapes]); 
 

    const downloadShapeTXT = () => {
      /* extraire les coordonnées du shape */
      const data = shapes.map((shape, index) => {
        const coords = shape.shape.type === "Polygon" ? 
        shape.shape.coordinates : shape.shape.coordinates.flat();
        const shapeData = coords.map(coord => [
          coord.join(",")
        ].join("\t"));
        return shapeData.join("\n");
      }).join("\n");
/* construire un fihicer TXT  */
      const filename = "Resultat_TXT.txt";
      const header = "latitude\t,\tlongitude\t\n";
  
      const file = new Blob([header+data], {type: "text/plain"});
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("filename", filename);
      formData.append("userId", userId);
      formData.append("file", file);
                
    /* telecharge le fichier */
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    };

    const downloadShapeKML = () => {
      /* la structure un fichier KML*/
      const kmlStart = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document>';
      const kmlEnd = '</Document></kml>';
    
      const placemarks = shapes.map((shape, index) => {
        let placemark = '<Placemark>';
        placemark += `<name>Shape ${index + 1}</name>`;
        placemark += '<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><color>7f0000ff</color></PolyStyle></Style>';
        placemark += '<LineString><coordinates>';
        placemark += shape.shape.coordinates.map(c => c.join(',')).join(',0 ');
        placemark += '</coordinates></LineString>';
        placemark += '</Placemark>';
        return placemark;
      }).join('');
    
      const data = kmlStart + placemarks + kmlEnd;
      /*construire le fichier*/
      const filename = "Resulat_KML.kml";
      const file = new Blob([data], {type: "application/vnd.google-earth.kml+xml"});
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("filename", filename);

      formData.append("userId", userId);
      formData.append("file", file);
                
              /* le telechargement*/
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    };
  
    
    
  return (
    <div>
     <SideBar activePage="DrawMap"/>
      <Col className='leaflet-container' >

      
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
      <div className="file-bar">
      <ul>
        <li className="nav-item dropdown">
         
          <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <Button type="sumbit" variant="contained" >
                        <FontAwesomeIcon icon={faDownload} />

                                  </Button>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#" onClick={downloadShapeKML} >KML</a></li>

            <li><a className="dropdown-item" href="#" onClick={downloadShapeTXT}>TXT </a></li>

          </ul>
        </li>
       
      </ul>
      </div>
     <FeatureGroup>

      <EditControl position="topright"  onCreated={_onCreated}
        onDeleted={_onDeleted} onEdited={_onEdited}
         draw ={{rectangle : false , circle : false , circlemarker:false , polyline:false }}/>
   
     </FeatureGroup>
      <TileLayer url={osm.maptlier.url}  />
      <ZoomControl position='topright' />
    </MapContainer>
      </Col>

    </div>
  )
}

export default DrawMap