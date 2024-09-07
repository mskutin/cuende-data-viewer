import React from 'react';
import HelpSection from './HelpSection';
import MapLoader from './MapLoader';
import SelectedRoadInfo from './SelectedRoadInfo';
import StatsTable from './StatsTable';

const LeftPanel = ({ 
  onDataLoaded, 
  isGrayscale, 
  onGrayscaleToggle, 
  selectedRoad, 
  onPrevious, 
  onNext, 
  onZoom,
  stats 
}) => {
  return (
    <div style={{ width: '25%', padding: '10px' }}>
      <HelpSection />
      <MapLoader 
        onDataLoaded={onDataLoaded} 
        isGrayscale={isGrayscale}
        onGrayscaleToggle={onGrayscaleToggle}
      />
      <SelectedRoadInfo 
        road={selectedRoad} 
        onPrevious={onPrevious}
        onNext={onNext}
      />
      <button 
        onClick={onZoom} 
        disabled={!selectedRoad}
        style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: selectedRoad ? '#4CAF50' : '#ddd',
          color: selectedRoad ? 'white' : '#666',
          border: 'none',
          borderRadius: '5px',
          cursor: selectedRoad ? 'pointer' : 'not-allowed'
        }}
      >
        Zoom to Selected Road
      </button>
      <StatsTable stats={stats} />
    </div>
  );
};

export default LeftPanel;