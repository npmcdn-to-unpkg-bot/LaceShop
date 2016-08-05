import { PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header.js';

Header.propTypes = {
 
}

function mapStateToProps(state, ownProps) {
  return {
  	user: state.user/*,
  	userPic: state.userPic
  	*/
  }
}

export default connect(mapStateToProps, {
  
})(Header)