require('normalize.css/normalize.css');
require('styles/Common.scss');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import SupplyProductsContent from '../components/SupplyProductsContent.js';

class SupplyProduct extends React.Component{

	constructor(props) {
    	super(props);
  	}
	render(){
		return (
			<div>
				<SupplyProductsContent user = {this.props.user}/>
			</div>
		)
	}
}
SupplyProduct.propTypes = {
 
}

function mapStateToProps(state, ownProps) {
  return {
  	user:state.user
  }
}

export default connect(mapStateToProps, {
})(SupplyProduct)