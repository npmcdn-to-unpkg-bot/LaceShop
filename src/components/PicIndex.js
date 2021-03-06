import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Overbooking from './Overbooking.js';
import { ajaxRequest, changHandle ,getPics} from '../actions';
import { browserHistory,router,hashHistory, } from 'react-router';

let Utils = require('../utils/utils');
require('styles/PicIndexSupply.scss');


export default class PicIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false,overModal:false, };

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.picDress = this.picDress.bind(this);
	}

  picDress(e) {
  	this.props.getPics(this.props.pic.url)
  	this.props.changHandle(6);
    browserHistory.push(`/Dress`)
  }

  close() {
    this.setState({ overModal:false });
  }

  open() {
    this.setState({ overModal:true });
  }


  render() {
  	var url = Utils.serverName + 'search/picSearchGetThumbnail.shtml?picPath=' + this.props.pic.url + '&searchType='+this.props.user.userType;
  	//var url = 'http://www.lacewang.com/pic/picThumb?picPath=' + this.props.pic.url + '&picType=2&size=300';
  	return (
		<div className="col-md-3 col-sm-4 col-xs-6 my-col pic item">
			<div className="thumbnail">
				<a href="javascript:;">
					<img src={url} alt="花型图片"/>
				</a>
		        <div className="caption">
			        <div className="price">
				        <span>¥</span>
				         <strong>¥{this.props.pic.price ? this.props.pic.price :':'}</strong>
				        <p className ="stock" >&nbsp;库存:{this.props.pic.stock=='无库存' || this.props.pic.stock == ""? '无库存':this.props.pic.stock+""} </p>
			        </div>
			        <div className = "backgrounds1"></div>
			        <div className="no">
			        	编号：<span>{this.props.pic.no}</span>
			        </div>
			        <div className="clearfix"></div>
			        <div className="buttons">
			        	<a href="javascript:;" onClick={this.open} className="btn btn-primary btns1" role="button"><span className = "iconfont icon-03xiazaiduizhangdan"></span>下单</a>			        	
			        	<a href="javascript:;" style={{marginLeft:'6px'}} onClick={this.picDress} data-id={this.props.pic.id} data-src={this.props.pic.url} data-searchType="2" className="btn btn-primary btns2" role="button"><span className = "iconfont icon-nvzhuang"></span>试衣</a>
			        </div>
		        </div>
			</div>
			<Overbooking overModal = {this.state.overModal} {...this.props}/>
		</div>
  	);
  }
}
function mapStateToProps(state, ownProps) {
  return {
  	user:state.user,
  	checkOver:state.overbooking,
  }
}
export default connect(mapStateToProps, {
	ajaxRequest,
	changHandle,
	getPics,
})(PicIndex)