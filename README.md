# CUENDE Road Network Visualization

## Overview

This project demonstrates how to visualize and analyze road network data using AWS partner data, specifically showcasing data from CUENDE. It provides an interactive map of Nairobi's road network, allowing users to explore traffic patterns, road types, and other relevant information.

<img width="480" alt="SCR-20240908-bxme" src="https://github.com/user-attachments/assets/5f0bafb9-0380-43b5-9ef7-6c53ea6971a0">

## Features

- Interactive map of Nairobi's road network using OpenLayers and OpenStreetMap
- Color-coded roads based on road types (primary, secondary, tertiary, residential)
- Road width visualization based on traffic intensity
- Popup information on road segments (type, intensity, score)
- Statistical summary of the road network
- Data feed upload functionality for custom GeoJSON files via a dedicated `MapLoader` component

## Data Source

The road network data used in this project is provided by CUENDE, an AWS partner specializing in traffic and mobility data.

## How It Works

1. **Data Integration**: The project uses a dedicated `MapLoader` component that allows users to upload GeoJSON data, which includes information about road segments, their types, traffic intensity, and other attributes.

2. **Visualization**: Using OpenLayers, the data is rendered on an interactive map. Roads are color-coded based on their types, and their widths are adjusted according to traffic intensity.

3. **User Interaction**: Users can click on road segments to view detailed information about each road, including its type, traffic intensity, and score.

4. **Statistical Analysis**: The application calculates and displays overall basic statistics about the road network, providing insights into the distribution of road types and average traffic intensity.

5. **Base Layer Customization**: Users can toggle between a color and grayscale base map layer. The grayscale effect is applied only to the OpenStreetMap base layer, while the road data remains in full color. This feature allows for better contrast and visibility of the road data when needed.

## Technology Stack

- React: Front-end framework
- OpenLayers: Map rendering library
- OpenStreetMap: Base map provider

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open `http://localhost:3000` in your browser

## Using the MapLoader

1. The `MapLoader` component is displayed at the top of the page.
2. Click on the "Choose File" button in the `MapLoader` to upload a GeoJSON file.
3. Use the "Grayscale Base Layer" checkbox to toggle the base map between color and grayscale. Note that this only affects the base map, not the road data.
4. The map will automatically update to display the new data, and statistics will be recalculated.

## Extending the Project

This project serves as a starting point for working with AWS partner data in mapping applications. Here are some ways you could extend it:

- Integrate real-time traffic data
- Add time-based visualizations to show traffic patterns over different periods
- Implement routing capabilities using the road network data
- Incorporate additional layers of data (e.g., points of interest, public transport)
- Enhance the `MapLoader` component to support multiple file formats or remote data sources
- Add more base layer customization options

## Acknowledgments

- Special thanks to CUENDE for providing the road network data used in this demonstration.
- Thanks to [Mohit Sindhwani](https://github.com/mohits) for the [hint](https://notepad.onghu.com/2024/open-layers-greyscale-maps-more-with-css-filters/) to work with greyscale, otherwise I would have ended up using something like a MapTiler.
