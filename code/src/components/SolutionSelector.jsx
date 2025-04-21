// src/components/SolutionSelector.jsx

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
  } from '@mui/material';
  
  /**
   * Props:
   *  - solutions: { [key: string]: GeoJSON }
   *  - selectedKey: string
   *  - onSelect: (key: string) => void
   */
  function SolutionSelector({ solutions, selectedKey, onSelect }) {
    // Dynamically pull the keys from the solutions object
    const keys = Object.keys(solutions);
  
    return (
      <Box
        sx={{
          height: '100%',
          bgcolor: '#f9f9f9',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold', color: '#333' }}>
          Solutions
        </Typography>
  
        <List>
          {keys.map((key) => (
            <ListItem key={key} disablePadding>
              <ListItemButton
                selected={selectedKey === key}
                onClick={() => onSelect(key)}         
              >
                {/* Display “Solution 1” instead of “solution1” */}
                <ListItemText primary={key.replace('solution', 'Solution ')} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
  
  export default SolutionSelector;
  