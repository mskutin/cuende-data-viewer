import React from 'react';

const SelectedRoadInfo = ({ road, onPrevious, onNext, onCenter }) => {
  if (!road) return null;

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
      <h3>Selected Road</h3>
      <p>Type: {road.properties.hwtype}</p>
      <p>Intensity: {road.properties.intensity.toFixed(2)}</p>
      <p>Score: {road.properties.score}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onCenter}>Center on Map</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default SelectedRoadInfo;