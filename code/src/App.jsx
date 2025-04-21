// src/App.jsx
import { useState } from 'react';
import { CssBaseline, Box, List, ListItemButton, ListItemText, Divider, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import MapView from './components/MapView';
import PolygonList from './components/PolygonList';
import StatsPanel from './components/StatsPanel';

import {
  area as turfArea,
  union as turfUnion,
  intersect as turfIntersect
} from '@turf/turf';

import solution1 from './assets/polygons/SE_State_Management_Polygons_1.json';
import solution2 from './assets/polygons/SE_State_Management_Polygons_2.json';

function App() {
  // 1) Keep both solution sets
  const [solutions, setSolutions] = useState({ solution1, solution2 });

  // 2) Which solution is active
  const [selectedKey, setSelectedKey] = useState('solution1');

  // 3) Which polygon indices in that solution are selected
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // 4) The current GeoJSON
  const geoData = solutions[selectedKey];

  // Toggle a polygon index on/off
  const toggleFeature = (idx) =>
    setSelectedFeatures(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );

  // Reset selection when changing solutions
  const handleSolutionChange = (_, key) => {
    if (key) {
      setSelectedKey(key);
      setSelectedFeatures([]);
    }
  };

  // Compute total area
  const totalArea = selectedFeatures.reduce(
    (sum, idx) => sum + turfArea(geoData.features[idx]),
    0
  );

  // Union & Intersect (same as before)…
  const handleUnion = () => {
    if (selectedFeatures.length !== 2) return;
    const [i, j] = selectedFeatures;
    const merged = turfUnion(geoData.features[i], geoData.features[j]);
    const newFeatures = geoData.features
      .filter((_, idx) => idx !== i && idx !== j)
      .concat(merged);
    setSolutions(prev => ({
      ...prev,
      [selectedKey]: { ...prev[selectedKey], features: newFeatures }
    }));
    setSelectedFeatures([]);
  };

  const handleIntersect = () => {
    if (selectedFeatures.length !== 2) return;
    const [i, j] = selectedFeatures;
    const inter = turfIntersect(geoData.features[i], geoData.features[j]);
    if (!inter) {
      setSelectedFeatures([]);
      return;
    }
    const newFeatures = geoData.features
      .filter((_, idx) => idx !== i && idx !== j)
      .concat(inter);
    setSolutions(prev => ({
      ...prev,
      [selectedKey]: { ...prev[selectedKey], features: newFeatures }
    }));
    setSelectedFeatures([]);
  };

  return (
    <>
      <CssBaseline />

      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box sx={{ width: 280, height: '100%', bgcolor: '#fafafa', borderRight: 1, borderColor: 'divider' }}>
          {/* Solution Switcher */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Solution Set</Typography>
            <ToggleButtonGroup
              value={selectedKey}
              exclusive
              onChange={handleSolutionChange}
              size="small"
            >
              <ToggleButton value="solution1">Solution 1</ToggleButton>
              <ToggleButton value="solution2">Solution 2</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider />

          {/* Polygon List */}
          <PolygonList
            features={geoData.features}
            selectedFeatures={selectedFeatures}
            onToggleFeature={toggleFeature}
          />
        </Box>

        {/* Map */}
        <Box sx={{ flex: 1, height: '100%' }}>
          <MapView
            geoData={geoData}
            selectedFeatures={selectedFeatures}
            onFeatureClick={toggleFeature}
          />
        </Box>

        {/* Stats & Tools */}
        <Box sx={{
            width: 240,
            height: '100%',
            borderLeft: 1,
            borderColor: 'divider',
            p: 2,
            boxSizing: 'border-box',
            overflowY: 'auto'
          }}>
          <StatsPanel
            totalArea={totalArea}
            selectedCount={selectedFeatures.length}
            onUnion={handleUnion}
            onIntersect={handleIntersect}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
