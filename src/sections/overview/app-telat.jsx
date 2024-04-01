import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
} from '@mui/material';

import AppStatus from './app-status';

function getSeriesData(area) {
    const colorMap = {
      'Briefing Pagi': { terlambat: '#FF6961', tepatWaktu: '#77933C' },
      Lunch: { terlambat: '#FF6961', tepatWaktu: '#77933C' },
      'coffe break': { terlambat: '#FF6961', tepatWaktu: '#77933C' },
    };
  
    const seriesData = [];
  
    Object.entries(area).forEach(([laporan, values]) => {
      console.log(laporan)
      const terlambat = values.terlambat || 0;
      const tepatWaktu = values.tepatWaktu || 0;
  
      seriesData.push({
        label: `${laporan} Terlambat`,
        value: terlambat,
        color: colorMap[laporan]?.terlambat || '#000000',
      });
  
      seriesData.push({
        label: `${laporan} Tepat Waktu`,
        value: tepatWaktu,
        color: colorMap[laporan]?.tepatWaktu || '#000000',
      });
    });
  
    return seriesData;
  }

export default function TelatULP({ allTelat }) {
  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '100%' }}>
      <Grid container spacing={3}>
        {Object.entries(allTelat).map(([area, laporan]) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={area}>
            <AppStatus title={`Area ${area}`} chart={{ series: getSeriesData(laporan) }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

TelatULP.propTypes = {
  allTelat: PropTypes.arrayOf(PropTypes.object).isRequired,
};
