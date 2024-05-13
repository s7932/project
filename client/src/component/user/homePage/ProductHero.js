import * as React from 'react';
import Button from '../../../material-ui-master/modules/components/Button';
import Typography from '../../../material-ui-master/modules/components/Typography';
import ProductHeroLayout from '../../../material-ui-master/modules/views/ProductHeroLayout';

const backgroundImage =
  'http://localhost:7777/upload/handGift.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(http://localhost:7777/upload/handGift.jpg)`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}

    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={'../../../image/handGift.jpg'}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >

        
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        style={{borderRadius:"15%", backgroundColor:"#6366F1"}}
        component="a"
        href="/productsUser"
        sx={{ minWidth: 200 }}
      >
        Go to the products page
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
