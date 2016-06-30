import React from 'react';

let Utils = require('../utils/utils');
require('styles/PicIndex.scss');

export default class PicIndex extends React.Component {
  picDress(e) {
  	var that = e.target;
  	Utils.dress(e, that);
  }

  render() {
  	//var url = Utils.serverName + 'search/picSearchGetThumbnail.shtml?picPath=' + this.props.pic.url + '&searchType=2';
  	var url = 'http://www.lacewang.com/pic/picThumb?picPath=' + this.props.pic.url + '&picType=2&size=300';
  	return (
		<div className="col-md-3 col-sm-4 col-xs-6 my-col pic item">
			<div className="thumbnail">
				<a href="javascript:;">
					<img src={url} alt="花型图片"/>
				</a>
		        <div className="caption">
			        <div className="price">
				        <span>¥</span>
				        <strong>{this.props.pic.price}</strong>
			        </div>
			        <div className="no">
			        	编号：<span>{this.props.pic.no}</span>
			        </div>
			        <div className="clearfix"></div>
			        <div className="pic-info">
				        <div className="stock">库存：<span>{this.props.pic.stock} (千克)</span></div>
				        <div className="ingredient">成分：<span>{this.props.pic.ingredient}</span></div>			        
			        </div>
			        <div className="buttons">
			        	<a href="#" className="btn btn-primary" role="button">下单</a>			        	
			        	<a href="javascript:;" style={{marginLeft:'6px'}} onClick={this.picDress} data-id={this.props.pic.id} data-src={this.props.pic.url} data-searchType="2" className="btn btn-primary" role="button">试衣</a>
			        </div>
		        </div>
			</div>
		</div>
  	);
  }
}