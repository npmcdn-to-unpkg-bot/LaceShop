require('normalize.css/normalize.css');
require('styles/Common.scss');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../containers/Header';
import Footer from '../components/Footer';

class App extends React.Component {  
  render() {
      return (
        <div>
          <Header/>
          {this.props.children}
          <Footer/>
        </div>
      );
    }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps)(App)