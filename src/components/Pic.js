require('styles/Pic.scss');
require('styles/PicIndex.scss')
let Utils = require('../utils/Utils');
import React from 'react';
import { connect } from 'react-redux';
import Overbooking from './Overbooking.js';
import { ajaxRequest, changHandle,getPics} from '../actions';
import { browserHistory,router,hashHistory, } from 'react-router';



export default class Pic extends React.Component {
  constructor(props) {
	super(props);
	this.state = { overModal:false };
	this.picDress = this.picDress.bind(this);
	this.close = this.close.bind(this);
	this.open = this.open.bind(this);
  }

  picDress(){
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
  	let url = Utils.serverName + 'search/picSearchGetThumbnail.shtml?picPath=' + this.props.pic.url + '&searchType='+this.props.user.userType;
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
				        <strong>¥{this.props.pic.price ? this.props.pic.price :':'}</strong>
				        <p className ="stock" >&nbsp;库存:{this.props.pic.stock=='无库存' || this.props.pic.stock == ""? '无库存':this.props.pic.stock+""} </p>
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
})(Pic)