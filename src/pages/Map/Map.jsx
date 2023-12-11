import React , {useEffect,useState} from 'react'
import '../Admin/Admin.css'
import SideBar from '../SideBar/SideBar';
import { MapContainer, TileLayer, Marker, Popup,Polyline,ZoomControl } from 'react-leaflet';
import LeafletGoecoder from './LeafletGoecoder';


const Map = () => {
  
  const position = [36.8065, 10.1815]
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);

  return (
    <div>
 <SideBar activePage="Map" />
        
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LeafletGoecoder/>
            <ZoomControl className="zoom" position='bottomright' />

          </MapContainer>
        

    </div>
  )
}

export default Map
