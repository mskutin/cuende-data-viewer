import React from 'react';

const MapLoader = ({ onDataLoaded, isGrayscale, onGrayscaleToggle }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onDataLoaded(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Error parsing the uploaded file. Please ensure it\'s a valid GeoJSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <input 
          type="file" 
          accept=".json,.geojson" 
          onChange={handleFileUpload} 
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f8f8f8'
          }}
        />
        <p style={{ fontSize: '0.9em', color: '#666', margin: '5px 0' }}>
          Upload a GeoJSON file to visualize road network data.
        </p>
      </div>
      <div>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isGrayscale}
            onChange={onGrayscaleToggle}
            style={{ marginRight: '5px' }}
          />
          Grayscale Base Layer
        </label>
      </div>
    </div>
  );
};

export default MapLoader;