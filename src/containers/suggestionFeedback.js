let Utils = require('../utils/Utils');
require('styles/ProWe_public.css');
require('styles/ProWe_Feedback.css');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SupplyProductsContent from '../components/SupplyProductsContent.js';

export default class index extends React.Component{

	componentDidMount(){
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
			         	 	 	<div className="rightInput"><input type="text" className="info"/></div>
			         	 	 </li>
			         	 	 <li className="con">
			         	 	 	<div className="leftName">意见 : </div>
			         	 	 	<div className="rightInput">
			         	 	 	    <textarea className="textareaInfo"></textarea>
			         	 	 	</div>
			         	 	 </li>
			         	 	 <li>
			         	 	 	<div className="leftName">手机号码 : </div>
			         	 	 	<div className="rightInput"><input type="text" className="info"/></div>
			         	 	 </li>
			         	 	 <li>
			         	 	 	<div className="rightInput"><input type="button" className="FeedBtn" value="提 交" /></div>
			         	 	 </li>
			         	 </ul>
			         </form>
			     </div>
			  </div>
		)
	}
}
