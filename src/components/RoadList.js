import React from 'react';

const RoadList = ({ roads, onSelectRoad }) => {
  return (
    <div style={{ height: '500px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
      <h3>All Roads</h3>
      {roads.map((road, index) => (
        <div 
          key={index} 
          onClick={() => onSelectRoad(road)}
          style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #eee' }}
        >
          {road.properties.hwtype} - Intensity: {road.properties.intensity.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default RoadList;