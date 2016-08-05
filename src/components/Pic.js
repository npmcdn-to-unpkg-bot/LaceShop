require('styles/Pic.scss');

import React from 'react';

let Utils = require('../utils/Utils');

export default class Pic extends React.Component {

  render() {
  	let url = Utils.serverName + 'search/picSearchGetThumbnail.shtml?picPath=' + this.props.pic.url + '&searchType=2';
  	return (
		<div className="col-md-2 col-sm-3 col-xs-4 my-col pic">
			<div className="thumbnail">
				<a href="javascript:;">
					<img src={url} alt="花型图片" />
				</a>
			</div>
		</div>
  	);
  }
}