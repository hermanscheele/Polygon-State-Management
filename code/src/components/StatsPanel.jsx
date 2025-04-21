import { Box, Typography, Button } from '@mui/material';

/**
 * Props:
 *  - totalArea: number
 *  - selectedCount: number
 *  - onUnion: () => void
 *  - onIntersect: () => void
 */
function StatsPanel({ totalArea, selectedCount, onUnion, onIntersect }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Tools & Stats</Typography>
      <Typography>Selected: {selectedCount}</Typography>
      <Typography>Total area: {totalArea.toFixed(2)}</Typography>
      <Button
        variant="contained"
        disabled={selectedCount !== 2}
        onClick={onUnion}
      >
        Union
      </Button>
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

export default StatsPanel;
