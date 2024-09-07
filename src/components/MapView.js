import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke, Fill } from 'ol/style';
import { getColor, getWidth } from './MapUtils';

const MapView = forwardRef(({ geojsonData, isGrayscale, onSelectFeature, popupElement, selectedRoad }, ref) => {
  const mapRef = useRef(null);
  const mapElement = useRef(null);
  const vectorLayerRef = useRef(null);
  const popupOverlayRef = useRef(null);
  const selectedFeatureRef = useRef(null);

  useImperativeHandle(ref, () => ({
    zoomToFeature: (feature) => {
      if (mapRef.current && feature) {
        const geometry = new GeoJSON().readFeature(feature, {
          featureProjection: 'EPSG:3857'
        }).getGeometry();
        const extent = geometry.getExtent();
        mapRef.current.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          maxZoom: 19
        });
      }
    },
    panToFeature: (feature) => {
      if (mapRef.current && feature) {
        const geometry = new GeoJSON().readFeature(feature, {
          featureProjection: 'EPSG:3857'
        }).getGeometry();
        const center = geometry.getExtent();
        mapRef.current.getView().setCenter(center);
      }
    }
  }));

  const updateSelectedFeature = (feature) => {
    selectedFeatureRef.current = feature;
    vectorLayerRef.current.changed(); // Trigger a re-render of the vector layer
    
    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates();
      popupOverlayRef.current.setPosition(coordinates[0]);
    } else {
      popupOverlayRef.current.setPosition(undefined);
    }
  };

  useEffect(() => {
    if (!geojsonData || !mapElement.current) return;

    if (!mapRef.current) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData, {
          featureProjection: 'EPSG:3857'
        })
      });

      const styleFunction = (feature) => {
        const isSelected = feature === selectedFeatureRef.current;
        return new Style({
          stroke: new Stroke({
            color: isSelected ? '#000000' : getColor(feature),
            width: isSelected ? getWidth(feature) + 4 : getWidth(feature)
          }),
          fill: new Fill({
            color: isSelected ? 'rgba(0, 0, 255, 0.5)' : 'rgba(0, 0, 0, 0)'
          })
        });
      };

      vectorLayerRef.current = new VectorLayer({
        source: vectorSource,
        style: styleFunction
      });

      const osmLayer = new TileLayer({ 
        source: new OSM(),
        className: 'base-layer'
      });

      mapRef.current = new Map({
        target: mapElement.current,
        layers: [osmLayer, vectorLayerRef.current],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });

      popupOverlayRef.current = new Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -15]
      });
      mapRef.current.addOverlay(popupOverlayRef.current);

      mapRef.current.on('click', (event) => {
        const hitTolerance = 5;
        const feature = mapRef.current.forEachFeatureAtPixel(event.pixel, 
          (feature) => feature, 
          {
            hitTolerance: hitTolerance,
            layerFilter: (layer) => layer === vectorLayerRef.current
          }
        );

        updateSelectedFeature(feature);
        onSelectFeature(feature);
      });

      // Initial fit to show all features
      const extent = vectorSource.getExtent();
      mapRef.current.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 15
      });
    } else {
      // Update the vector layer with new data
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData, {
          featureProjection: 'EPSG:3857'
        })
      });
      vectorLayerRef.current.setSource(vectorSource);
    }
  }, [geojsonData, onSelectFeature, popupElement]);

  useEffect(() => {
    if (mapElement.current) {
      if (isGrayscale) {
        mapElement.current.classList.add('grayscale-base-layer');
      } else {
        mapElement.current.classList.remove('grayscale-base-layer');
      }
    }
  }, [isGrayscale]);

  useEffect(() => {
    if (selectedRoad && vectorLayerRef.current) {
      const features = vectorLayerRef.current.getSource().getFeatures();
      const selectedFeature = features.find(f => f.getProperties().track_id === selectedRoad.properties.track_id);
      updateSelectedFeature(selectedFeature);
    }
  }, [selectedRoad]);

  return <div ref={mapElement} style={{ width: '100%', height: '500px' }} />;
});

export default MapView;