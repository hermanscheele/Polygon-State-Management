// src/components/PolygonList.jsx
import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

/**
 * Props:
 *  - features: GeoJSON Feature[] of the current solution
 *  - selectedFeatures: number[]  // indices
 *  - onToggleFeature: (idx) => void
 */
export default function PolygonList({ features, selectedFeatures, onToggleFeature }) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      <List dense disablePadding>
        {features.map((feat, idx) => {
          const isSelected = selectedFeatures.includes(idx);
          return (
            <ListItemButton
              key={idx}
              onClick={() => onToggleFeature(idx)}
              selected={isSelected}
            >
              <ListItemText primary={`Polygon ${idx + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
