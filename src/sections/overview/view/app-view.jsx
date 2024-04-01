import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import TelatULP from '../app-telat';
import AllUlp from '../app-multiple';
import AppStatus from '../app-status';
import AllUP3Chart from '../app-up3-chart';
import AppCurrentVisits from '../app-current-visits';

// ----------------------------------------------------------------------

export default function AppView() {
  const [isLoading, setLoading] = useState(true);
  const [itemsStatistik, setStatistik] = useState({});
  const [status, setStatus] = useState({});
  const [allData, setData] = useState([]);
  const [telat, setTelat] = useState({});
  const [allUP3, setUP3] = useState([]);
  const [allUP3Telate, setUP3Telat] = useState({});

  useEffect(() => {
    async function loadStatistik() {
      try {
        const response = await fetch(`https://d563-45-251-5-82.ngrok-free.app/api/ulp`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning" : "1"
          },
        });
        const data = await response.json();
        setStatistik(data);
      } catch (error) {
        console.error('Error loading data:', error);
        throw error;
      }   
    }

    async function loadStatus() {
      try {
        const response = await fetch(`https://d563-45-251-5-82.ngrok-free.app/api/ulp/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning" : "1"
          },
        });
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error loading status:', error);
        throw error;
      }
    }

    async function loadAllULP() {
      try {
        const response = await fetch(`https://d563-45-251-5-82.ngrok-free.app/api/up3/area`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning" : "1"
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error loading status:', error);
        throw error;
      }
    }

    async function loadAllUP3() {
      try {
        const response = await fetch(`https://d563-45-251-5-82.ngrok-free.app/api/up3`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning" : "1"
          },
        });
        const data = await response.json();
        setUP3(data);
      } catch (error) {
        console.error('Error loading status:', error);
        throw error;
      }
    }

    async function loadAllTelatUP3() {
      try {
        const response = await fetch(`https://d563-45-251-5-82.ngrok-free.app/api/up3/areastatus`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning" : "1"
          },
        });
        const data = await response.json();
        setUP3Telat(data);
      } catch (error) {
        console.error('Error loading status:', error);
        throw error;
      }
    }

    async function loadAllTelat() {
      try {
        const response = await fetch(`https://d563-45-251-5-82.ngrok-free.app/api/up3/areastatus`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning" : "1"
          },
        });
        const data = await response.json();
        setTelat(data);
      } catch (error) {
        console.error('Error loading status:', error);
        throw error;
      }
    }

    async function loadSemuaData() {
      setLoading(true);
      await loadStatistik();
      await loadStatus();
      await loadAllULP();
      await loadAllTelat();
      await loadAllUP3();
      await loadAllTelatUP3();
      await setLoading(false);
    }

     loadSemuaData()
  }, []);

  const seriesData = Object.entries(itemsStatistik).map(([label, value]) => {
    let color;
    switch (label.toLowerCase()) {
      case 'briefing pagi':
        color = '#4F81BD';
        break;
      case 'lunch':
        color = '#C0504D';
        break;
      case 'coffe break':
        color = '#9BBB59';
        break;
      default:
        color = '#000000';
    }
    return { label, value, color };
  });

  const seriesDataStatus = Object.entries(status).flatMap(([label, value]) => {
    const result = [];
    if (value.TERLAMBAT !== undefined) {
      result.push({ label: `${label} Terlambat`, value: value.TERLAMBAT, color: '#FF6961' });
    }
    if (value.TEPAT_WAKTU !== undefined) {
      result.push({ label: `${label} Ontime`, value: value.TEPAT_WAKTU, color: '#77933C' });
    }
    return result;
  });

  let seriesDataE = [];
  const colorMap = {
    'briefing pagi': '#9BBB59',
    'coffe break': '#604A7B',
    lunch: '#31859C',
  };

  if (allUP3 && allUP3.length) {
    const categories = Object.keys(allUP3[0]).filter((key) => key !== 'area');
    seriesDataE = categories.map((cat) => ({
      name: cat,
      data: allUP3.map((area) => area[cat]),
      type: 'bar',
      color: colorMap[cat],
    }));
  }

  const colorMape = {
    terlambat: '#FF6961',
    tepatWaktu: '#77933C',
  };

  const seriesDataex = [];

  Object.entries(allUP3Telate).forEach(([area, categories]) => {
    Object.entries(categories).forEach(([kategori, stats]) => {
      seriesDataex.push({
        name: `${area} Tepat Waktu`,
        data: [stats.tepatWaktu],
        type: 'bar',
        color: colorMape.tepatWaktu,
      });

      seriesDataex.push({
        name: `${area} Terlambat`,
        data: [stats.terlambat],
        type: 'bar',
        color: colorMape.terlambat,
      });
    });
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // Sesuaikan dengan tinggi halaman
      >
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Admin 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={6}>
          <AppCurrentVisits
            title="UIP PROV. JAWA BARAT (KESELERUHAN)"
            chart={{ series: seriesData }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppStatus title="UIP PROV. JAWA BARAT (STATUS)" chart={{ series: seriesDataStatus }} />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Semua UP3 (YANG ADA DI JAWA BARAT)
          </Typography>
          <AllUlp title="Semua UP3" allData={allData} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Semua UP3 (YANG ADA DI JAWA BARAT) (STATUS)
          </Typography>
          <TelatULP allTelat={telat} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Semua UP3 {allUP3.length}
          </Typography>
          <AllUP3Chart up3={allUP3} series={seriesDataE} />
        </Grid>
      </Grid>
    </Container>
  );
}
