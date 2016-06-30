import React from 'react';

require('styles/Pic.scss');

export default class Pic extends React.Component {
  render() {
  	return (
		<div className="col-md-2 col-sm-3 col-xs-4 my-col pic">
			<div className="thumbnail">
				<a href="javascript:;">
					<img src="../images/pic.jpg" alt="花型图片"/>
				</a>
			</div>
		</div>
  	);
  }
}