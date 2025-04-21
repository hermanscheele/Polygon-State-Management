import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

/**
 * MapView
 *
 * Displays a Leaflet map with GeoJSON polygons.
 *
 * Props:
 *  - geoData: FeatureCollection containing polygon features
 *  - selectedFeatures: array of indices for highlighted features
 *  - onFeatureClick: callback when a polygon is clicked (receives index)
 */
export default function MapView({
  geoData,
  selectedFeatures,
  onFeatureClick,
}) {
  // Fixed map center (Paris coordinates)
  const center = [48.857, 2.295];

  return (
    // Full‑screen Leaflet map container
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      {/* Base tile layer from OpenStreetMap */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render each GeoJSON feature as a layer */}
      {geoData.features.map((feature, idx) => {
        // Determine if this polygon is currently selected
        const isSelected = selectedFeatures.includes(idx);

        // Styling: thicker border and higher opacity for selected
        const style = {
          color: isSelected ? '#1976d2' : '#666',
          weight: isSelected ? 4 : 2,
          fillOpacity: isSelected ? 0.5 : 0.2,
        };

        return (
          <GeoJSON
            key={idx}
            data={feature}
            style={style}
            // Attach click handler to each feature's layer
            onEachFeature={(_, layer) =>
              layer.on('click', () => onFeatureClick(idx))
            }
          />
        );
      })}
    </MapContainer>
  );
}
