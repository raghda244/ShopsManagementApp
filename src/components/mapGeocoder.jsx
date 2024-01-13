import { useMap } from "react-leaflet";
import L from 'leaflet'
import { useEffect } from "react";
import { Icon } from "leaflet";

const MapGeoCoder = (props) => {
    const map = useMap();
    const geocoder = L.Control.Geocoder.nominatim();
    const customIcon = new Icon({
        iconUrl: require('../assets/images/placeholder.png'),
        iconSize: [38, 38], // size of the icon
    });

    L.Marker.prototype.options.icon = customIcon;

    let marker = null;

    useEffect(() => {
        if (props.isEdit) {
            marker = L.marker(props.latlng).addTo(map);
            map.setView(props.latlng, 13)
        }
        else {
            map.setView([30.0444, 31.2357], 13)
        }

        map.on('click', (event) => {
            if (marker !== null) {
                map.removeLayer(marker);
            }
            marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map)
            props.setLatLng([marker._latlng.lat, marker._latlng.lng])
        });
        
        L.Control.geocoder({
            defaultMarkGeocode: false
        }).on('markgeocode', function (e) {
            const latlng = e.geocode.center;
            if (marker !== null) {
                map.removeLayer(marker);
            }
            marker = L.marker(latlng).addTo(map);
            props.setLatLng([marker._latlng.lat, marker._latlng.lng])
            map.fitBounds(e.geocode.bbox)
        }).addTo(map);
    }, [])

    return (
        <></>
    );
};

export default MapGeoCoder;