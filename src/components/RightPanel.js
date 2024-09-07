import React from 'react';
import RoadList from './RoadList';

const RightPanel = ({ geojsonData, onSelectRoad }) => {
  return (
    <div style={{ width: '25%', padding: '10px' }}>
      {geojsonData && (
        <RoadList 
          roads={geojsonData.features} 
          onSelectRoad={onSelectRoad} 
        />
      )}
    </div>
  );
};

export default RightPanel;