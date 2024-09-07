import React, { useState, useCallback, useRef } from 'react';
import MapView from './MapView';
import PopupOverlay from './PopupOverlay';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { calculateStats } from './MapUtils';

const GeoJSONMap = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [stats, setStats] = useState(null);
  const [isGrayscale, setIsGrayscale] = useState(true);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const popupRef = useRef(null);
  const mapViewRef = useRef(null);

  const handleDataLoaded = useCallback((data) => {
    setGeojsonData(data);
    setStats(calculateStats(data.features));
  }, []);

  const handleGrayscaleToggle = useCallback(() => {
    setIsGrayscale(prev => !prev);
  }, []);

  const handleSelectRoad = useCallback((road, index) => {
    setSelectedRoad(road);
    setSelectedIndex(index);
    if (mapViewRef.current && road) {
      mapViewRef.current.panToFeature(road);
    }
  }, []);

  const handlePrevious = useCallback(() => {
    if (selectedIndex > 0) {
      handleSelectRoad(geojsonData.features[selectedIndex - 1], selectedIndex - 1);
    }
  }, [geojsonData, selectedIndex, handleSelectRoad]);

  const handleNext = useCallback(() => {
    if (geojsonData && selectedIndex < geojsonData.features.length - 1) {
      handleSelectRoad(geojsonData.features[selectedIndex + 1], selectedIndex + 1);
    }
  }, [geojsonData, selectedIndex, handleSelectRoad]);

  const handleZoom = useCallback(() => {
    if (mapViewRef.current && selectedRoad) {
      mapViewRef.current.zoomToFeature(selectedRoad);
    }
  }, [selectedRoad]);

  return (
    <div style={{ display: 'flex' }}>
      <style>
        {`
          .grayscale-base-layer .base-layer {
            filter: grayscale(100%);
          }
        `}
      </style>
      <LeftPanel 
        onDataLoaded={handleDataLoaded}
        isGrayscale={isGrayscale}
        onGrayscaleToggle={handleGrayscaleToggle}
        selectedRoad={selectedRoad}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onZoom={handleZoom}
        stats={stats}
      />
      <div style={{ width: '50%', position: 'relative' }}>
        <MapView 
          ref={mapViewRef}
          geojsonData={geojsonData}
          isGrayscale={isGrayscale}
          onSelectFeature={(feature) => {
            if (feature) {
              const index = geojsonData.features.findIndex(f => f.properties.track_id === feature.getProperties().track_id);
              handleSelectRoad(geojsonData.features[index], index);
            } else {
              setSelectedRoad(null);
              setSelectedIndex(-1);
            }
          }}
          popupElement={popupRef.current}
        />
        <div ref={popupRef} style={{ position: 'absolute', zIndex: 1 }}>
          <PopupOverlay selectedRoad={selectedRoad} />
        </div>
      </div>
      <RightPanel 
        geojsonData={geojsonData}
        onSelectRoad={(road) => handleSelectRoad(road, geojsonData.features.indexOf(road))}
      />
    </div>
  );
};

export default GeoJSONMap;