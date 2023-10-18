import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAY6ckNC8L_v0U5NeyXm5O2qKqajNJ67R8',
    });

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = {
        lat: -3.745,
        lng: -38.523,
    };

    if (!isLoaded) {
        return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    }

    const markers = [
        { lat: 18.5204, lng: 73.8567 },
        { lat: 18.5314, lng: 73.8446 },
        { lat: 18.5642, lng: 73.7769 },
      ];

      const onLoad = (map:any) => {
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
      };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
            onLoad={onLoad}
        >
                      {markers.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}
        </GoogleMap>
    )
}

export default Map;