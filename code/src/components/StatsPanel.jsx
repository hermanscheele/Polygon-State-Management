import { Box, Typography, Divider, Button } from '@mui/material';

/**
 * Props:
 *  - opStats: { origAreas:[n,n], resultArea:n } | null
 *  - selectedAreas: number[]
 *  - selectedCount: number
 *  - onUnion / onIntersect: () => void
 */
export default function StatsPanel({
  opStats,
  selectedAreas,
  selectedCount,
  onUnion,
  onIntersect,
}) {
  return (
    // Vertical stack container with spacing
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Panel header */}
      <Typography variant="h6">Tools & Stats</Typography>

      {/* 
        If we've just done a union/intersect, show the original areas 
        and the result. Otherwise, if polygons are selected, show their areas.
        If nothing is selected, prompt the user.
      */}
      {opStats ? (
        <>
          <Typography>
            Original 1: {opStats.origAreas[0].toFixed(2)}
          </Typography>
          <Typography>
            Original 2: {opStats.origAreas[1].toFixed(2)}
          </Typography>
          <Divider />
          <Typography>Result: {opStats.resultArea.toFixed(2)}</Typography>
        </>
      ) : selectedAreas.length ? (
        // List each selected polygon's area
        selectedAreas.map((area, idx) => (
          <Typography key={idx}>
            Polygon {idx + 1}: {area.toFixed(2)}
          </Typography>
        ))
      ) : (
        // Fallback message
        <Typography>Select two polygons to enable tools</Typography>
      )}

      <Divider />

      {/* Union button, enabled only when exactly two polygons are selected */}
      <Button
        variant="contained"
        disabled={selectedCount !== 2}
        onClick={onUnion}
      >
        Union
      </Button>

      {/* Intersect button, likewise enabled only with two selections */}
      <Button
        variant="contained"
        color="secondary"
        disabled={selectedCount !== 2}
        onClick={onIntersect}
      >
        Intersect
      </Button>
    </Box>
  );
}
