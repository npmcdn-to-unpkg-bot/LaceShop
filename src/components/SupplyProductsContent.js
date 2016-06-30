import React from 'react';
import ContentTitle from './ContentTitle.js';
import SupplyProductsItem from './SupplyProductsItem.js';

require('styles/SupplyProductsContent.scss');

export default class SupplyProductsContent extends React.Component {
  render() {
  	return (
  		<div className="content">
  			<div className="container">
  				<ContentTitle title="最近新增"/>
  				<SupplyProductsItem/>
          <ContentTitle title="店铺热搜"/>
          <SupplyProductsItem/>
          <ContentTitle title="面料"/>
          <SupplyProductsItem/>
          <ContentTitle title="大边"/>
          <SupplyProductsItem/>
          <ContentTitle title="小边"/>
          <SupplyProductsItem/>
          <ContentTitle title="睫毛"/>
          <SupplyProductsItem/>
  			</div>
  		</div>
  	);
  }
}