export const getColor = (feature) => {
    const { hwtype } = feature.getProperties();
    if (hwtype === 'primary') return 'red';
    if (hwtype === 'secondary') return 'orange';
    if (hwtype === 'tertiary') return 'yellow';
    if (hwtype === 'residential') return 'green';
    return 'white';
  };
  
  export const getWidth = (feature) => {
    const { intensity } = feature.getProperties();
    return Math.max(2, Math.min(8, intensity / 500));
  };
  
  export const calculateStats = (features) => {
    let totalLength = 0;
    let totalIntensity = 0;
    let roadTypes = {};
  
    features.forEach(feature => {
      const { hwtype, intensity } = feature.properties;
      const coordinates = feature.geometry.coordinates;
      
      // Rough estimation of road length
      for (let i = 1; i < coordinates.length; i++) {
        const dx = coordinates[i][0] - coordinates[i-1][0];
        const dy = coordinates[i][1] - coordinates[i-1][1];
        totalLength += Math.sqrt(dx*dx + dy*dy);
      }
  
      totalIntensity += intensity;
      roadTypes[hwtype] = (roadTypes[hwtype] || 0) + 1;
    });
  
    return {
      totalRoads: features.length,
      averageIntensity: totalIntensity / features.length,
      totalLength: totalLength.toFixed(2),
      roadTypes
    };
  };