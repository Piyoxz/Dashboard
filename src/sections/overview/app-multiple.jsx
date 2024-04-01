import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Search } from '@mui/icons-material';
import { Box, Grid, TextField, IconButton, Typography, InputAdornment, CircularProgress } from '@mui/material';

import AppStatus from './app-status';

function getSeriesData(area) {
  const colorMap = {
    'briefing pagi': '#4F81BD',
    lunch: '#C0504D',
    'coffe break': '#9BBB59',
  };

  return Object.entries(area)
    .slice(1)
    .map(([laporan, valuex]) => ({
      label: laporan,
      value: valuex,
      color: colorMap[laporan.toLowerCase()] || '#000000',
    }));
}

export default function AllUlp({ allData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  const handleSearch = () => {
    setLoading(true);

    const searchResult = allData.filter((area) =>
      area.area.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTimeout(() => {
      console.log('Hasil pencarian:', searchResult);
      setFilteredData(searchResult);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleIconClick = () => {
    handleSearch();
  };

  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Cari ULP"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleIconClick}>
                  <Search />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ width: '50%', mx: 'auto', textAlign: 'center' }}
        />
      </Box>
      {isLoading && <CircularProgress />}
      {filteredData.length === 0 && !isLoading && (
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Tidak ada hasil yang ditemukan.
        </Typography>
      )}
      <Grid container spacing={3}>
        {filteredData.map((area) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={area.area}>
            <AppStatus title={`Area ${area.area}`} chart={{ series: getSeriesData(area) }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

AllUlp.propTypes = {
  allData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
