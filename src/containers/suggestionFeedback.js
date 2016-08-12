let Utils = require('../utils/Utils');
require('styles/ProWe_public.css');
require('styles/ProWe_Feedback.css');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { ajaxRequest, LOAD_CONTENT_SUCCESS} from '../actions';
import { URL_LOAD_CONTENT } from '../utils/URLs.js';
import SupplyProductsContent from '../components/SupplyProductsContent.js';

export default class suggestionFeedback extends React.Component{

	constructor(props) {
		super(props)
		this.state = {
			isUpload: false
		};
		this.upload = this.upload.bind(this);
		this.flag = true;
	}

	upload(){
		let username = $(this.refs.username).val();
		let content = $(this.refs.contexts).val();
		let telephone = $(this.refs.telephone).val();
		console.log("===================================",this.props.user.userType)
		this.setState({
       	    isUpload: true
      	})
      	this.flag = true;
		this.props.ajaxRequest(URL_LOAD_CONTENT, LOAD_CONTENT_SUCCESS, {
			userType: this.props.user.userType,
			userId: this.props.user.userId,
  			username:username,
  			content: content,
  			client_telephone: telephone
		});
	}
	 componentDidUpdate (){
	 	if(this.props.msg == 1 && this.flag){

	 		this.setState({
       	    isUpload: false
      		})
      		alert("感谢您的宝贵意见")
      		this.flag = false;
	 	}
	 }
	render(){
		return (
			<div className="ProWeMain FeedMain">
			     <div className="ProWeMain_con FeedMain_con">
			         <div className="FeedbackTitle">
			         	 <i className="iconfont">&#xe60f;</i>
			         	 <h2>意见反馈</h2>
			         </div>
			         <form className="FeedbackInfo">
			         	 <ul>
			         	 	 <li>
			         	 	 	<div className="leftName">您是 : </div>
			         	 	 	<div className="rightInput"><input type="text" className="info" ref = "username"/></div>
			         	 	 </li>
			         	 	 <li className="con">
			         	 	 	<div className="leftName">意见 : </div>
			         	 	 	<div className="rightInput">
			         	 	 	    <textarea className="textareaInfo" ref = "contexts"></textarea>
			         	 	 	</div>
			         	 	 </li>
			         	 	 <li>
			         	 	 	<div className="leftName">手机号码 : </div>
			         	 	 	<div className="rightInput"><input type="text" className="info" ref = "telephone" /></div>
			         	 	 </li>
			         	 	 <li>
			         	 	 	<div className="rightInput"><input type="button" className="FeedBtn" value={this.state.isUpload ? "正在提交":"提交"} onClick = {this.upload}/></div>
			         	 	 </li>
			         	 </ul>
			         </form>
			     </div>
			  </div>
		)
	}
}
function mapStateToProps(state, ownProps) {
  return {
  	user: state.user,
	msg: state.uploadContext,
  }
}

export default connect(mapStateToProps, {
  ajaxRequest,
})(suggestionFeedback)