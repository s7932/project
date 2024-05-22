import * as React from 'react';
import './workSansFont.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Button } from 'primereact/button';
import Typography from '../../../material-ui-master/modules/components/Typography';
import { useNavigate } from 'react-router-dom';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 30,
  fontFamily: "Work Sans, sans-serif",
  color: 'secondary',
  fontWeight: 'medium',
  fontWeight:500
};


function ProductHowItWorks() {
  const navigate = useNavigate()
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: '#FFF5F8', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src='http://localhost:7777/pink.png'
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }} color={'black'} style={{ fontSize: "36px", fontFamily: "Roboto , sans-serif" , fontWeight: 600 }}>
          HOW IT WORKS
        </Typography>
        <div >
          <Grid container spacing={5} color={'#FF4473'}>
            <Grid item xs={12} md={4} >
              <Box sx={item} color={'#FF4473'}>
                <Box sx={number}>1.</Box> <br></br><br></br>
                <Typography variant="h5" align="center"  color='black' style={{ fontSize: "20px", fontFamily: "Work Sans, sans-serif" , fontWeight: 80 }}>
                Have you ever dreamed of flying or desired a luxurious coffee machine? Add to your cart the tickets for those dreams you never thought possible.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} >
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <br></br><br></br>
                <Typography variant="h5" align="center"  color='black' style={{ fontSize: "20px", fontFamily: "Work Sans, sans-serif" , fontWeight: 80 }}>
                Navigate to the shopping basket, verify that all selected lottery tickets are displayed correctly, and proceed to the payment section to complete the purchase
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box><br></br><br></br>
                <Typography variant="h5" align="center"  color='black' style={{ fontSize: "20px", fontFamily: "Work Sans, sans-serif" , fontWeight: 80 }}>
                Complete the payment information, finalize your purchase, and who knows, you might just be the next lucky winner! Good luck!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <Button label="GET STARTED" severity="secondary" style={{fontSize:"22px",background:'#FF4473', color:'white', width:"280px",minHeight:"50px"}} onClick={()=> navigate("/productsUser")}/>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
