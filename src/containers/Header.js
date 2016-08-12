import { PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header.js';
import { ajaxRequest, changHandle, getParame } from '../actions';

Header.propTypes = {
 
}

function mapStateToProps(state, ownProps) {
  return {
  	user: state.user,
  	searchStatus: state.searchStatus,
  	navIndexInProp: state.headerActiveNav,
  	sessionId: state.responseSessionId
  }
}

export default connect(mapStateToProps, {
  ajaxRequest,
  changHandle,
  getParame
})(Header)