require('styles/HeaderUserTip.scss');

import React from 'react';

export default class HeaderUserTip extends React.Component {
  render() {
    return (
      <a className="header-user-tip-item" href="javascript:;">
        <img alt={this.props.title} src={this.props.src}/>
      </a>
    );
  }
}