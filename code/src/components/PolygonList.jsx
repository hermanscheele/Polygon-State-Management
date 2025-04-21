import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

/**
 * PolygonList
 *
 * Renders a scrollable list of polygon items.
 *
 * Props:
 *  - features: array of GeoJSON features
 *  - selectedFeatures: array of selected feature indices
 *  - onToggleFeature: callback to add/remove an index from selection
 */
export default function PolygonList({
  features,
  selectedFeatures,
  onToggleFeature,
}) {
  return (
    // Container with auto-scroll when list is long
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      <List dense disablePadding>
        {features.map((_, idx) => (
          // Each polygon gets its own button in the list
          <ListItemButton
            key={idx}
            onClick={() => onToggleFeature(idx)}        // toggle selection on click
            selected={selectedFeatures.includes(idx)}  // highlight if selected
          >
            {/* Label shows human-friendly "Polygon N" */}
            <ListItemText primary={`Polygon ${idx + 1}`} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
