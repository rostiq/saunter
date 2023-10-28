import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { API_KEY } from "../services/googleMap";
import { Button } from "antd";
import { center } from "../utils/helpers";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MyMap = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  console.log("💅🏼 ~ destination:", destination)
  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [waypoints, setWaypoints] = useState([]);


  const handleMarkerDrag = (index, event) => {
    switch (index) {
      case 0:
        setOrigin(event.latLng);
        break;
      case 1:
        setDestination(event.latLng);
        break;
      default:
        setWaypoints(waypoints.map((w, i) => {
          if (i === index) {
            return event.latLng;
          }
          return w;
        }))
        break;
    }
  };

  useEffect(() => {
      calculateDirections();
  }, [origin, destination, waypoints,markers]);

  const AddMarker = (event) => {
    switch (markers.length) {
      case 0:
        setOrigin(event.latLng);
        break;
      case 1:
        setDestination(event.latLng);
        break;
      default:
        setWaypoints([...waypoints, event.latLng]);
        break;
    }
    setMarkers([...markers, event.latLng]);
  };

  const calculateDirections = () => {
    if (markers.length < 2) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(origin.lat(), origin.lng()),
        destination: new window.google.maps.LatLng(destination.lat(), destination.lng()),

        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setMarkers([]);
          setOrigin(null);
          setDestination(null);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      {/* <Button onClick={calculateDirections} type="primary">Calculate Directions</Button> */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onClick={AddMarker} >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            draggable={true}
            onDragEnd={(event) => handleMarkerDrag(index, event)}
          />
        ))}

            
            {directions && (
              <DirectionsRenderer
              directions={directions}
              options={{
                draggable: true,
              }}
              />
              )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
