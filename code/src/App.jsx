import { useState } from 'react';
import {
  CssBaseline,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import MapView from './components/MapView';
import PolygonList from './components/PolygonList';
import StatsPanel from './components/StatsPanel';

// Turf: area calc, 2‑arg union/intersect, plus fallbacks from turf/turf
import turfArea from '@turf/area';
import union2arg from '@turf/union';
import intersect2arg from '@turf/intersect';
import { union as union1arg, intersect as intersect1arg } from '@turf/turf';

import solution1 from './assets/polygons/SE_State_Management_Polygons_1.json';
import solution2 from './assets/polygons/SE_State_Management_Polygons_2.json';

export default function App() {
  // store both solution sets and switch between them
  const [solutions, setSolutions] = useState({ solution1, solution2 });
  const [selectedKey, setSelectedKey] = useState('solution1');

  // indices of currently selected polygons
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  // stats for last union/intersect operation
  const [opStats, setOpStats] = useState(null);

  const geoData = solutions[selectedKey];
  // compute areas for any selected polygons
  const selectedAreas = selectedFeatures.map(idx =>
    turfArea(geoData.features[idx])
  );

  // toggle a polygon on/off in the selection array
  const toggleFeature = idx => {
    setSelectedFeatures(prev => {
      const next = prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [...prev, idx];
      setOpStats(null); // clear previous stats
      return next;
    });
  };

  // switch between solution1 and solution2
  const handleSolutionChange = (_, key) => {
    if (!key) return;
    setSelectedKey(key);
    setSelectedFeatures([]);
    setOpStats(null);
  };

  // replace the two originals with the single result feature
  const replaceWithResult = resultFeature => {
    const [i, j] = selectedFeatures;
    const newFeatures = geoData.features
      .filter((_, idx) => idx !== i && idx !== j)
      .concat(resultFeature);

    setSolutions(prev => ({
      ...prev,
      [selectedKey]: {
        ...prev[selectedKey],
        features: newFeatures,
      },
    }));
    // select the newly added feature
    setSelectedFeatures([newFeatures.length - 1]);
  };

  // helper to dispatch to the correct union API
  function doUnion(f1, f2) {
    if (union2arg.length === 2) {
      // standalone turf/union expects (feature1, feature2)
      return union2arg(f1, f2);
    }
    // turf/turf fallback expects a FeatureCollection
    return union1arg({ type: 'FeatureCollection', features: [f1, f2] });
  }

  // similar helper for intersect
  function doIntersect(f1, f2) {
    if (intersect2arg.length === 2) {
      return intersect2arg(f1, f2);
    }
    return intersect1arg({ type: 'FeatureCollection', features: [f1, f2] });
  }

  // union button handler
  const handleUnion = () => {
    if (selectedFeatures.length !== 2) {
      console.warn('Select exactly two polygons');
      return;
    }
    const [i, j] = selectedFeatures;
    const f1 = geoData.features[i];
    const f2 = geoData.features[j];

    try {
      const merged = doUnion(f1, f2);
      const mergedArea = turfArea(merged);
      setOpStats({
        origAreas: [turfArea(f1), turfArea(f2)],
        resultArea: mergedArea,
      });
      replaceWithResult(merged);
    } catch (err) {
      console.error('union error:', err);
    }
  };

  // intersect button handler
  const handleIntersect = () => {
    if (selectedFeatures.length !== 2) {
      console.warn('Select exactly two polygons');
      return;
    }
    const [i, j] = selectedFeatures;
    const f1 = geoData.features[i];
    const f2 = geoData.features[j];

    try {
      const inter = doIntersect(f1, f2);
      if (!inter) {
        console.info('No overlap between selected polygons');
        return;
      }
      const interArea = turfArea(inter);
      setOpStats({
        origAreas: [turfArea(f1), turfArea(f2)],
        resultArea: interArea,
      });
      replaceWithResult(inter);
    } catch (err) {
      console.error('intersect error:', err);
    }
  };

  return (
    <>
      <CssBaseline />

      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar: select solution and polygons */}
        <Box sx={{ width: 280, bgcolor: '#fafafa', borderRight: 1, borderColor: 'divider' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Solution Set</Typography>
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
          <PolygonList
            features={geoData.features}
            selectedFeatures={selectedFeatures}
            onToggleFeature={toggleFeature}
          />
        </Box>

        {/* Map view */}
        <Box sx={{ flex: 1 }}>
          <MapView
            key={`${selectedKey}-${geoData.features.length}`}
            geoData={geoData}
            selectedFeatures={selectedFeatures}
            onFeatureClick={toggleFeature}
          />
        </Box>

        {/* Stats & tools panel */}
        <Box
          sx={{
            width: 260,
            borderLeft: 1,
            borderColor: 'divider',
            p: 2,
            overflowY: 'auto',
          }}
        >
          <StatsPanel
            opStats={opStats}
            selectedAreas={selectedAreas}
            selectedCount={selectedFeatures.length}
            onUnion={handleUnion}
            onIntersect={handleIntersect}
          />
        </Box>
      </Box>
    </>
  );
}
