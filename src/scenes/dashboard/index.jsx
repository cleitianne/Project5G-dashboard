import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import MainChart from "../../components/MainChart";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle  } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import SearchIcon from "@mui/icons-material/Search";
import { mockDataInvoices } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";

import { useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

const customIcon = new Icon({
  iconUrl: "/icons8-select-24.png",
  iconSize: [33, 33]
})

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const position = [-3.746695, -38.578123];

    
  const [position1, setPosition1] = useState([-3.74047019, -38.53380561]);
  const [position2, setPosition2] = useState([-3.74047019, -38.53380561]);
  const [changePosition, setChangePosition] = useState(false);
  const [coodenations, setCoordenations] = useState(null); 

  const [rectangle, setRetangulo] = useState ([    
    [-3.72547019, -38.52380561],
    [-3.74047019, -38.50380561]
  ]);

  const markerIcon1 = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3082/3082383.png",
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
  });

  const markerIcon2 = new L.Icon({
      iconUrl: "https://www.freeiconspng.com/uploads/blue-map-localization-icon-9.png",
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
  });

  const MapClickHandler = () => {
      useMapEvents({
          click: (e) => {
              setCoordenations(e.latlng);
              setPosition1([e.latlng.lat, e.latlng.lng]);
              setRetangulo([[ e.latlng.lat < 0? e.latlng.lat+0.015: e.latlng.lat-0.015,  e.latlng.lng < 0? e.latlng.lng + 0.01: e.latlng.lng -0.01 ],
                [ e.latlng.lat,  e.latlng.lng < 0? e.latlng.lng + 0.02: e.latlng.lng -0.02 ]]);
              setChangePosition(!changePosition);    

          }
      });
      return null;
  };
  

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="5G Open Labs" />

        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Pesquisar" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        height={800}
        gap="20px"
      >
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12"
            subtitle="Email"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12"
            subtitle="Email"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32"
            subtitle="Vídeo"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32"
            subtitle="Usuários"
            progress="0.30"
            increase="+5%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>


        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          display="flex"
          width={800}
          backgroundColor={colors.primary[400]}
          p="5px"
        >
          
          <MapContainer
            center={position1}
            zoom={16}
            style={{ width: '70%', height: '65%', position: 'absolute' }}
            >
              <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; OpenStreetMap contributors"
              />
              <Rectangle bounds={rectangle} pathOptions={blackOptions} />
              {/* <Marker position={position1} icon={markerIcon1}></Marker>
              <Marker position={position2} icon={markerIcon2}></Marker> */}
              <MapClickHandler /> 
              
            </MapContainer>
        
          {/* <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="45px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box> */}
              

        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 20px 10px 20px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="280px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box> 
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="240px">
            <MainChart isDashboard={true} />
          </Box>
        </Box>*/}
      </Box>
    </Box>
  );
};

export default Dashboard;
