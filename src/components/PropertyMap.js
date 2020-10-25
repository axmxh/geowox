import React, { useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { API_KEY } from "../config";
import "./styles.scss";

const mapStyles = {
  width: "100%",
  height: "80%"
};

function PropertyMap({ google, properties, mapCenter, setSelectedProperty }) {
  useEffect(() => {}, [properties]);
  console.log("properties Map", properties[0]?.lat);
  const renderMarkers = () => {
    if (properties.length === 0) {
      return;
    } else {
      return properties.map((property, i) => {
        return (
          <Marker
            key={i}
            id={i}
            position={{
              lat: property.lat,
              lng: property.lon
            }}
            onClick={() => setSelectedProperty(properties[i])}
          />
        );
      });
    }
  };

  return (
    <div className="property__map">
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={mapCenter}
      >
        {renderMarkers()}
      </Map>
    </div>
  );
}

// export default PropertyMap;

export default GoogleApiWrapper({
  apiKey: API_KEY
})(PropertyMap);
