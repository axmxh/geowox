import React, { useState, useEffect } from "react";
import "./App.scss";
import data from "./sample_data.json";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import Details from "./components/Details";
import PropertyDetails from "./components/PropertyDetails";
import PropertyMap from "./components/PropertyMap";

function App() {
  const [properties] = useState(data);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [filters, setFilters] = useState({});

  const [propertyTypes] = useState([
    ...new Set(properties.map((property) => property.type))
  ]);
  const [bedrooms] = useState([
    ...new Set(properties.map((property) => property.beds))
  ]);

  const [bathrooms] = useState([
    ...new Set(properties.map((property) => property.baths))
  ]);

  const filterProperties = (properties, name, value) => {
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    const result = properties.filter((property) => {
      return keys.every((key) => {
        if (!filters[key].length) {
          return true; // passing an empty filter  ===  filter is ignored.
        }
        return filters[key].includes(property[key]);
      });
    });

    console.log("result", result);

    return result;
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setSelectedProperty(null);
    filterProperties(properties);
  };
  console.log("filters", filters);

  const calcMapCenter = () => {
    // debugger;
    let avaLat = 0;
    let avaLon = 0;
    const length = properties?.length;

    if (length > 0) {
      properties.forEach((property) => {
        avaLat += property.lat;
        avaLon += property.lon;
      });
      avaLat = avaLat / length;
      avaLon = avaLon / length;
      return { lat: avaLat, lng: avaLon };
    }
  };

  const generateChartData = () => {
    return propertyTypes.map((type) => {
      const typeLength = properties.filter((property) => property.type === type)
        .length;
      const typePercentage = (typeLength / properties.length) * 100;
      return { x: type, y: typeLength };
    });
  };

  useEffect(() => {
    // console.log("properties", properties);
    if (mapCenter === null) setMapCenter(calcMapCenter());

    if (filteredProperties.length === 0) {
      setSelectedProperty(null);
    }
    if (filters.type || filters.beds || filters.baths) {
      setFilteredProperties(filterProperties(properties));
    }
  }, [mapCenter, filters]);

  //   console.log("filteredProperties", filteredProperties);

  return (
    <div className="app">
      <div className="app__top">
        <Filters
          handleFilterChange={handleFilterChange}
          properties={properties}
          propertyTypes={propertyTypes}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
        />
        <Stats data={generateChartData()} />
      </div>
      <div className="app__bottom">
        <Details>
          <PropertyDetails property={selectedProperty} />
          <PropertyMap
            mapCenter={mapCenter}
            properties={filteredProperties}
            setSelectedProperty={setSelectedProperty}
          />
        </Details>
      </div>
    </div>
  );
}

export default App;
