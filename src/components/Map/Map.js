import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import Location from "./Location";

function Map({ users }) {
  const defaultProps = {
    center: {
      lat: 29.733504,
      lng: -95.390053,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      // Uncomment this code below to render the Google Map
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {users.map((user) => (
          <Location key={user.id} user={user} lat={user.lat} lng={user.lng} />
        ))}
      </GoogleMapReact> */}
    </div>
  );
}

export default Map;
