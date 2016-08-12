import React from 'react';
import SupplyProductsItem from '../components/SupplyProductsItem.js';
import { ajaxRequest } from '../actions'
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
  return { 
    
  }
}

export default connect(mapStateToProps, {
  ajaxRequest
})(SupplyProductsItem)