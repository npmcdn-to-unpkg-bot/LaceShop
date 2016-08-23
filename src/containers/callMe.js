let Utils = require('../utils/Utils');
require('styles/ProWe_public.css');
require('styles/ProWe_ContactInfo.css');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { ajaxRequest, LOAD_VENDER_SUCCESS} from '../actions';
import { URL_LOAD_VENDER } from '../utils/URLs.js';
import Login from '../components/Login.js';

export default class  callMe extends React.Component{
    constructor(props) {
      super(props);
      this.vender = [];
      this.toLogin = this.toLogin.bind(this);
      this.state ={
      	showModalToLogin:false,
      }
    }
    toLogin(){
    	this.setState({
    		showModalToLogin:true,
    	})
    }
    componentWillMount(){
    	if(this.props.user.userId){
      		this.props.ajaxRequest(URL_LOAD_VENDER, LOAD_VENDER_SUCCESS, {
      			id:this.props.user.userId
			});
    	}
    }

	render(){
		return(
			<div className="ProWeMain ContactMain">
			     <div className="ProWeMain_con ContactMain_con">
			      <div className="contact_Us">
			          <i className="iconfont">&#xe60c;</i>
			          <h2>联系我们</h2>
			      </div>
			      <div className="contact_Info">
			           <ul>
			               <li className="left">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe608;</i>
			                  </span>
			                  <span className="infoText">
			                      电话 : {this.props.vender ? this.props.vender.phone : "该产家无号码"}
			                  </span>
			               </li>
			               <li className="right">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe60a;</i>
			                  </span>
			                  <span className="infoText">
			                      地址 :{this.props.vender ? this.props.vender.vender_address : "暂时无法查看产家地址 "}
			                  </span>
			               </li>
			               <li className="left">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe609;</i>
			                  </span>
			                  <span className="infoText hasLogin " >
			                      移动电话 : {this.props.tologin? (this.props.vender?this.props.vender.vender_tel:''):''} <a href="javascript:;" style = {this.props.tologin ? {visibility: 'hidden'}:{}} onClick = {this.toLogin}>登录后可见</a>
			                  </span>
			               </li>
			               <li className="right">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe607;</i>
			                  </span>
			                  <span className="infoText">
			                      邮编 : 
			                  </span>
			               </li>
			               <li className="left">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe60b;</i>
			                  </span>
			                  <span className="infoText">
			                      传真 : {this.props.vender ? this.props.vender.fax : "暂时无法查看产家传真 "}
			                  </span>
			               </li>
			               <li className="right">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe60e;</i>
			                  </span>
			                  <span className="infoText">
			                      公司主页 : <a className="OfficialWebsite" href="ts57.lacewang.cn">{this.props.address}.lacewang.cn</a>
			                  </span>
			               </li>
			               <p style={{clear: 'both'}}></p>
			           </ul>
			      </div>
			      <div className="contact_Map">
			          <img src={Utils.home+"images/map.png"} width="100%" height="100%" />
			      </div>
			     </div>
			     <Login {...this.props} showModalToLogin = {this.state.showModalToLogin}/>
			  </div>
			  
		  );
	}
}
function mapStateToProps(state, ownProps) {
  return {
  	user: state.user,
  	vender: state.getVenderInfo,
  	address: state.getAddress,
  	tologin: state.tologin,

  }
}
 	
export default connect(mapStateToProps, {
  ajaxRequest,
})(callMe)