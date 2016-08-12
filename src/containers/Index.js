let Utils = require('../utils/Utils');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import IndexProduct from '../components/IndexProduct.js';

IndexProduct.propTypes = {
  
}

function mapStateToProps(state, ownProps) {
  return {
  	user: state.user,
  	nowPic: state.nowPic,
    hotPic: state.hotPic,
    bigSidePic: state.bigSidePic,
    smallSidePic: state.smallSidePic,
    liningPic: state.liningPic,
    eyeslashPic: state.eyeslashPic
  }
}

export default connect(mapStateToProps)(IndexProduct)