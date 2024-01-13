import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { getAllShops } from '../sevices/shops';
import { Icon } from 'leaflet';
import { useSelector } from 'react-redux';

const Map = () => {
    const shops = useSelector((state)=>state.shops)
    const customIcon = new Icon({
        iconUrl: require('../assets/images/placeholder.png'),
        iconSize: [38, 38], // size of the icon
      });

    return (
        <MapContainer center={[30.0444, 31.2357]} zoom={12}>
            <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {
                shops.length && shops.map((shop,index)=>{
                    return <Marker position={[shop.Location[0],shop.Location[1]]} key={index} icon={customIcon}>
                        <Popup>
                            {shop.Name}
                        </Popup>
                    </Marker>
                })
            }
        </MapContainer>
    )

};

export default Map;