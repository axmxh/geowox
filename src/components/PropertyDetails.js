import React from "react";
import "./styles.scss";
import StreetView from "./StreetView";

function PropertyDetails({ property }) {
  console.log("property.price, ", property?.price);
  return (
    <div className="property__details">
      {property ? (
        <>
          <h4>Property Details</h4>
          <div className="property__details-img">
            <StreetView property={property} />
          </div>
          <div className="property__details-rooms">
            <div className="beds">
              <h6>Beds</h6>
              <p>{property.beds || "N/A"}</p>
            </div>
            <div className="baths">
              <h6>Baths</h6>
              <p>{property.baths || "N/A"}</p>
            </div>
          </div>
          <div className="property__details-info">
            <div className="property__type">
              <h6>Property Type</h6>
              <p>{property.type.toLowerCase()}</p>
            </div>
            <div className="property__address">
              <h6>Address</h6>
              <p>{property.address.toLowerCase() || "N/A"}</p>
            </div>
            <div className="property__sqm">
              <h6>Sqm</h6>
              <p>{property.sqm || "N/A"}</p>
            </div>
            <div className="property__price">
              <h6>Price</h6>
              <p>
                {(property.price !== "" &&
                  "€" +
                    property.price
                      ?.toFixed(2)
                      ?.replace(/\d(?=(\d{3})+\.)/g, "$&,")) ||
                  "N/A"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="no__details">
          Please use filters and select from map to see the details here
        </p>
      )}
    </div>
  );
}

export default PropertyDetails;
