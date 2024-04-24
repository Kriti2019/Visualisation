import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const IndiaChoroplethMap = () => {
  const [geoJson, setGeoJson] = useState(null);
  const geoJsonPath = 'india_state.geojson'; 

  useEffect(() => {
    fetch(geoJsonPath)
      .then(response => response.json())
      .then(data => setGeoJson(data))
      .catch(error => console.error('Error fetching GeoJSON:', error));
  }, [geoJsonPath]);



  // The population data is hardcoded here but could also be loaded from an API or file
  const populationData = {
    'Uttar Pradesh': { population: 199812341, abbreviation: 'UP' },
    'Maharashtra': { population: 112374333, abbreviation: 'MH' },
    'Bihar': { population: 104099452, abbreviation: 'BR' },
    'West Bengal': { population: 91276115, abbreviation: 'WB' },
    'Madhya Pradesh': { population: 72626809, abbreviation: 'MP' },
    'Tamil Nadu': { population: 72147030, abbreviation: 'TN' },
    'Rajasthan': { population: 68548437, abbreviation: 'RJ' },
    'Karnataka': { population: 61095297, abbreviation: 'KA' },
    'Gujarat': { population: 60439692, abbreviation: 'GJ' },
    'Andhra Pradesh': { population: 49577103, abbreviation: 'AP' },
    'Orissa': { population: 41974219, abbreviation: 'OR' },
    'Telangana': { population: 35003674, abbreviation: 'TG' },
    'Kerala': { population: 33406061, abbreviation: 'KL' },
    'Jharkhand': { population: 32988134, abbreviation: 'JH' },
    'Assam': { population: 31205576, abbreviation: 'AS' },
    'Punjab': { population: 27743338, abbreviation: 'PB' },
    'Chhattisgarh': { population: 25545198, abbreviation: 'CT' },
    'Haryana': { population: 25351462, abbreviation: 'HR' },
    'NCT of Delhi': { population: 16787941, abbreviation: 'DL' },
    'Jammu and Kashmir': { population: 12267032, abbreviation: 'JK' },
    'Uttaranchal': { population: 10086292, abbreviation: 'UT' },
    'Himachal Pradesh': { population: 6864602, abbreviation: 'HP' },
    'Tripura': { population: 3673917, abbreviation: 'TR' },
    'Meghalaya': { population: 2966889, abbreviation: 'ML' },
    'Manipur': { population: 2570390, abbreviation: 'MN' },
    'Nagaland': { population: 1978502, abbreviation: 'NL' },
    'Goa': { population: 1458545, abbreviation: 'GA' },
    'Arunachal Pradesh': { population: 1383727, abbreviation: 'AR' },
    'Puducherry': { population: 1247953, abbreviation: 'PY' },
    'Mizoram': { population: 1097206, abbreviation: 'MZ' },
    'Chandigarh': { population: 1055450, abbreviation: 'CH' },
    'Sikkim': { population: 610577, abbreviation: 'SK' },
    'Daman & Diu': { population: 585764, abbreviation: 'DN' },
    'Andaman & Nicobar Island': { population: 380581, abbreviation: 'AN' },
    'Ladakh': { population: 274000, abbreviation: 'LA' },
    'Lakshadweep': { population: 64473, abbreviation: 'LD' }
  };
  

  const getLocationData = (geoJsonFeatures) => {
    return geoJsonFeatures.map((feature) => {
      const stateName = feature.properties.NAME_1;
      const stateData = populationData[stateName];
      return {
        id: feature.properties.ID_1, // Using 'ID_1' as the unique identifier for each feature
        value: stateData ? stateData.population : null
      };
    }).filter(location => location.value !== null);
  };

  const mapData = [{
    type: 'choropleth',
    locations: geoJson ? getLocationData(geoJson.features).map(d => d.id) : [],
    z: geoJson ? getLocationData(geoJson.features).map(d => d.value) : [],
    geojson: geoJson,
    featureidkey: 'properties.ID_1',
    colorbar: {
      title: 'Population',
      thickness: 10
    },
    colorscale: 'Viridis',
    autocolorscale: false,
    reversescale: true,
    marker: {
      line: {
        color: 'black',
        width: 0.5
      }
    }
  }];

  const layout = {
    title: 'Population Choropleth Map of India',
    geo: {
      scope: 'asia',
      center: { lon: 82.5, lat: 22 }, // Adjusted center of the map
      projection: { type: 'mercator' },
      showframe: false,
      showcoastlines: false,
      showcountries: false,
      showland: true,
      landcolor: 'rgba(0,0,0,0)',
      bgcolor: 'rgba(0,0,0,0)', 
      countrywidth: 0,
      subunitwidth: 0,
      lonaxis: { range: [68, 98] }, 
      lataxis: { range: [6, 38] }  
    },
    width: 960,
    height: 720
  };
  
  
  
  

  return (
    <Plot
      data={mapData}
      layout={layout}
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default IndiaChoroplethMap;