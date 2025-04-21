import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

function MapView({ geoData, selectedFeatures, onFeatureClick }) {
  const center = [48.857, 2.295]; // Paris

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoData.features.map((feature, idx) => {
        const isSelected = selectedFeatures.includes(idx);

        const style = {
          color: isSelected ? '#1976d2' : '#666',
          weight: isSelected ? 4 : 2,
          fillOpacity: isSelected ? 0.5 : 0.2
        };

        const onEachFeature = (_, layer) =>
          layer.on('click', () => onFeatureClick(idx));

        return (
          <GeoJSON
            key={idx}
            data={feature}
            style={style}
            onEachFeature={onEachFeature}
          />
        );
      })}
    </MapContainer>
  );
}

export default MapView;
