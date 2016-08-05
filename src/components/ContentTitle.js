import React from 'react';
import { browserHistory } from 'react-router';
require('styles/ContentTitle.scss');

export default class ContentTitle extends React.Component {
  constructor(props) {
    super(props)
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange() {
    browserHistory.push(`/SupplyProduct`);
  }

  render() {
  	return (
  		<div className="content-title clearfix">
  			<h3 className="caption">{this.props.title}</h3>  			
  			<div className="more">
  				<a href="javascript:;" onClick= {this.handleCategoryChange}>查看更多</a>
  				<span className="glyphicon glyphicon-triangle-right"></span>
  			</div>
  			<hr/>
  		</div>
  	);
  }
}