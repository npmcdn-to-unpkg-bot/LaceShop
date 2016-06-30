import React from 'react';
import Pic from './Pic.js';

require('styles/SupplyProductsItem.scss');

export default class SupplyProductsItem extends React.Component {
  render() {
  	return (
  		<div className="index-item">
  			<div className="row my-row">
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>
  				<Pic/>  			
  			</div>
  		</div>
  	);
  }
}