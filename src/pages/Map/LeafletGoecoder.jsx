import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletGoecoder = () => {
    const map = useMap();

    useEffect(() => {
      /* geocoder :utilisé pour rechercher et marquer une adresse spécifiée*/
      L.Control.geocoder({
        defaultMarkGeocode: false,
      })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
       /* ajout d'un marker et popup en cherchant une adr*/
        L.marker(latlng, {
          clickable: true 
        })
          .addTo(map)
          .bindPopup(`${e.geocode.name}<br>Lat: ${latlng.lat.toFixed(6)}, Lng: ${latlng.lng.toFixed(6)}`)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      console.log(latlng);
      /* Routing.control : r afficher un itinéraire entre deux points*/
      var control = L.Routing.control({
        lineOptions: {
          styles: [
            {
              color: "blue",
              opacity: 0.7,
            },
          ],
        },
              waypoints: [
                /* la 1er adr*/
            L.latLng( latlng.lat, latlng.lng),
            L.latLng(" string address")
            
        ],
        
        routeWhileDragging:false , 
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: true,/*en mode write */
        draggableWaypoints: false,
        fitSelectedRoutes: true, /*zoom*/
        showAlternatives: false,
        })
        .addTo(map)
        /* affichager du 2eme emp */
        .on('routeselected', function(e) {
          var waypoints = control.getWaypoints();
          var endPoint = waypoints[1];
          L.popup()
            .setLatLng(endPoint.latLng)
            .setContent(`${endPoint.name}<br>Lat: ${endPoint.latLng.lat.toFixed(6)}, Lng: ${endPoint.latLng.lng.toFixed(6)}`)
            .openOn(map);
        }).addTo(map)
       
   
  }
  
  ).addTo(map)
 

    }, []);
    
    return null;
  };
  

export default LeafletGoecoder;
