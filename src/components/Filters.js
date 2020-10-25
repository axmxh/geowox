import React, { useState } from "react";
import "./styles.scss";

function Filters({
  properties,
  handleFilterChange,
  propertyTypes,
  bedrooms,
  bathrooms
}) {
  return (
    <div className="filters">
      <h4>Filters</h4>
      <div className="filters__body">
        <select
          onChange={handleFilterChange}
          defaultValue=""
          name="type"
          id="propertyType"
        >
          <option value="">Property Type</option>
          {propertyTypes.map((property, i) => {
            return (
              <option key={i} value={property}>
                {property.toLowerCase()}
              </option>
            );
          })}
        </select>

        <select
          onChange={handleFilterChange}
          defaultValue=""
          name="beds"
          id="bedrooms"
        >
          <option value="">Bedrooms</option>
          {bedrooms.map((bedroom, i) => {
            if (bedroom === "") bedroom = "N/A";
            return (
              <option key={i} value={bedroom}>
                {bedroom}
              </option>
            );
          })}
        </select>
        <select
          onChange={handleFilterChange}
          defaultValue=""
          name="baths"
          id="bathrooms"
        >
          <option value="">Bathrooms</option>
          {bathrooms.map((bathroom, i) => {
            if (bathroom === "") bathroom = "N/A";
            return (
              <option key={i} value={bathroom}>
                {bathroom}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Filters;
