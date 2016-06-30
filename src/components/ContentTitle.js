import React from 'react';

require('styles/ContentTitle.scss');

export default class ContentTitle extends React.Component {
  render() {
  	return (
  		<div className="content-title clearfix">
  			<h3 className="caption">{this.props.title}</h3>  			
  			<div className="more">
  				<a href="javascript:;">查看更多</a>
  				<span className="glyphicon glyphicon-triangle-right"></span>
  			</div>
  			<hr/>
  		</div>
  	);
  }
}