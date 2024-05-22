import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../../../material-ui-master/modules/components/Typography';

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


function ProductValues() {

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
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }} color={'black'} style={{ fontSize: "28px", fontFamily: "Roboto , sans-serif" , fontWeight: 500 }}>
        The card pricing is categorized into three levels:
        </Typography>
        <div >
          <Grid container spacing={5} color={'#FF4473'}>
            <Grid item xs={12} md={4} >
              <Box sx={item} color={'#FF4473'}>
                <Box sx={number}>1.</Box> <br></br><br></br>
                <Typography variant="h5" align="center"  color='black' style={{ fontSize: "20px", fontFamily: "Work Sans, sans-serif" , fontWeight: 80 }}>
                Basic card: 5$
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} >
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <br></br><br></br>
                <Typography variant="h5" align="center"  color='black' style={{ fontSize: "20px", fontFamily: "Work Sans, sans-serif" , fontWeight: 80 }}>
                Gold card: 10$
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box><br></br><br></br>
                <Typography variant="h5" align="center"  color='black' style={{ fontSize: "20px", fontFamily: "Work Sans, sans-serif" , fontWeight: 80 }}>
                Premium card: 15$
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        
      </Container>
    </Box>
  );
}

export default ProductValues;
