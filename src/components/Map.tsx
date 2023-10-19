import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useAppDispatch } from '../app/hooks';
import { updateMarkers, updateTotalLength } from '../features/routes/distanceSlice';

const containerStyle = {
  width: '100%',
  minWidth: '360px',
  minHeight: '360px',
  height: '100%',
};

interface MarkerType {
  position: any;
  isDraggable: boolean;
}

const Map: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAY6ckNC8L_v0U5NeyXm5O2qKqajNJ67R8',
  });

  const center = { lat: 50.4501, lng: 30.5234 };

  const [myMap, setMyMap] = useState<any>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [directions, setDirections] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded) {
      const mapBounds = new google.maps.LatLngBounds();
      markers.forEach(({ position }) => {
        mapBounds.extend(position);
      });
      if (myMap) {
        myMap.fitBounds(mapBounds);
      }
    }
  }, [isLoaded, markers, myMap]);

  useEffect(() => {
    if (markers.length >= 2) {
      calculateDistance();
    }
  }, [markers]);

  useEffect(() => {
    dispatch(updateTotalLength(totalDistance / 1000));
  }, [totalDistance]);

  useEffect(() => {
    dispatch(updateMarkers(markers));
  },[markers]);

  const addMarker = (event: google.maps.MapMouseEvent) => {
    const newMarkers = [...markers];
    newMarkers.push({
      position: event.latLng?.toJSON() || center,
      isDraggable: true,
    });
    setMarkers(newMarkers);
  };

  const onMarkerDragEnd = (markerIndex: number, event: google.maps.MapMouseEvent) => {
    const newMarkers = [...markers];
    newMarkers[markerIndex].position = event.latLng?.toJSON() || center;
    setMarkers(newMarkers);
  };

  const calculateDistance = () => {
    if (markers.length >= 2) {
      const directionsService = new google.maps.DirectionsService();
      const waypoints = markers.map((marker) => ({
        location: marker.position,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints.slice(1, -1),
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
            let totalDistance = 0;
            result?.routes[0].legs.forEach((leg) => {
              totalDistance += leg?.distance?.value || 0;
            });
            setTotalDistance(totalDistance);
          }
        }
      );
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={19}
      onLoad={(map) => setMyMap(map)}
      onClick={addMarker}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          draggable={marker.isDraggable}
          onDragEnd={(event) => onMarkerDragEnd(index, event)}
        />
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
