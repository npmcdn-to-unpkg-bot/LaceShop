require('normalize.css/normalize.css');
require('styles/Common.scss');

import React from 'react';
import Header from './Header.js';
import IndexContent from './IndexContent.js';
import Footer from './Footer.js';

class Index extends React.Component {
  render() {
    return (
      <div>
        <Header navActive={this.props.active}/>
        <IndexContent pics={this.props.pics}/>
        <Footer/>
      </div>
    );
  }
}

Index.defaultProps = {
};

export default Index;