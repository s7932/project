

import * as React from 'react';


import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage ='http://localhost:7777/upload/handGift.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', 
        backgroundPosition: 'center',
      }}
    >
   
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="hello"
      />
      
    </ProductHeroLayout>
  );
}
