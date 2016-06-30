require('normalize.css/normalize.css');
require('styles/Common.scss');
require('styles/SupplyProducts.scss');

import React from 'react';
import Header from './Header.js'
import SupplyProductsContent from './SupplyProductsContent.js';
import Footer from './Footer.js';

class SupplyProducts extends React.Component {
  render() {
    return (
      <div>
        <Header navActive="2"/>
        <SupplyProductsContent/>
        <Footer/>
      </div>
    );
  }
}

SupplyProducts.defaultProps = {
};

export default SupplyProducts;