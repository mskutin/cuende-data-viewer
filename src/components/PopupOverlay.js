import React from 'react';

const PopupOverlay = ({ selectedRoad }) => {
  if (!selectedRoad) return null;

  return (
    <div style={{
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ddd',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      whiteSpace: 'nowrap'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Road Info</h3>
      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Type:</strong> {selectedRoad.properties.hwtype}</p>
      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Intensity:</strong> {selectedRoad.properties.intensity.toFixed(2)}</p>
      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Score:</strong> {selectedRoad.properties.score}</p>
      <div style={{
        position: 'absolute',
        bottom: '-140px',
        left: '50%',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid rgba(255, 255, 255, 0.9)',
        transform: 'translateX(-50%)'
      }}></div>
    </div>
  );
};

export default PopupOverlay;