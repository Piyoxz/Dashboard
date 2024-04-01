import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

export default function BarChart({ up3, series, ...other }) {

  const areas = Object.keys(up3).map((area) => area.toUpperCase());

  const chartSeries = series.map((item) => item.data.map((dataItem) => dataItem));

  const chartOptions = useChart({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        borderRadius: 0,
        columnWidth: '30%',
      },
    },
    xaxis: {
      categories: areas,
    },
    yaxis: {
      title: {
        text: 'Jumlah Laporan',
      },
    },
    fill: {
      opacity: 1,
    },
    grid: {
      padding: {
        left: 60,
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {},
    },
  });

  return (
    <Card {...other} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <CardHeader sx={{ mb: 5 }} />
      <Box sx={{ width: '600vh' }}>
        <Chart dir="ltr" series={chartSeries} options={chartOptions} height={280} />
      </Box>
    </Card>
  );
}

BarChart.propTypes = {
  up3: PropTypes.object.isRequired,
  series: PropTypes.object,
};
