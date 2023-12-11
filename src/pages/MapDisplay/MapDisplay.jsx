import React from 'react';
import { MapContainer, TileLayer, Marker, Popup,Polyline } from 'react-leaflet';
import {useState} from "react";


const MapDisplay = ({ coordinates }) => {

  const [center,setCenter]=useState({lat :coordinates[0].latitude,lng :coordinates[0].longitude});

    const validCoordinates = coordinates.filter(coord => coord.latitude && coord.longitude);

    if (validCoordinates.length === 0) {
      return <div>No valid coordinates found.</div>;
    }
      console.log(validCoordinates);

        return (
          <MapContainer center={center} zoom={8}>
            <TileLayer url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=VQxar9jkEXi8I7H7RK07" />

            {validCoordinates.map((coord, index) => (
              <Marker key={index} position={[coord.latitude, coord.longitude]}>
                <Popup>
                  Latitude: {coord.latitude} <br />
                  Longitude: {coord.longitude}
                </Popup>
              </Marker>
            ))}

              <Polyline positions={validCoordinates.map(coord => [coord.latitude, coord.longitude])} />

          </MapContainer>
        );
      };
      

export default MapDisplay;
