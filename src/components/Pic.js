require('styles/Pic.scss');
require('styles/PicIndex.scss')
import React from 'react';

let Utils = require('../utils/Utils');

export default class Pic extends React.Component {

  render() {
  	let url = Utils.serverName + 'search/picSearchGetThumbnail.shtml?picPath=' + this.props.pic.url + '&searchType=2';
  	return (
		<div className="col-md-2 col-sm-3 col-xs-4 my-col pic">
			<div className = "borders">
				<div className="thumbnail">
					<a href="javascript:;">
						<img src={url} alt="花型图片" />
					</a>
				</div>
				<div className="caption">
			        <div className="price">
				        <span></span>
				        <strong>¥{this.props.pic.price ? this.props.pic.price :'未知'}</strong>
				        <span className ="stock" >&nbsp;库存:{this.props.pic.stock=='无库存'? '无库存':this.props.pic.stock+"(千克)"} </span>
			        </div>
			        <div className="stock"></div>	
			        <div className = "backgrounds"></div>
			        <div className="no">
			        	<span>{this.props.pic.no}</span>

			        </div>
			        <div className="clearfix"></div>
			        <div className="buttons">
			        	<a href="javascript:;" style={{marginLeft:'6px'}} onClick={this.picDress} data-id={this.props.pic.id} data-src={this.props.pic.url} data-searchType="2" role="button" className="btn btn-primary bottons1" ><span className = "iconfont icon-nvzhuang"></span>试衣</a>
			        	<a href="javascript:;" onClick={this.open} className="btn btn-primary bottons2" role="button" ><span className = "iconfont icon-xunjia"></span>询价</a>
			        </div>
		        </div>
	        </div>
		</div>
  	);
  }
}