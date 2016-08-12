let Utils = require('../utils/Utils');
require('styles/ProWe_public.css');
require('styles/ProWe_ContactInfo.css');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { ajaxRequest, LOAD_VENDER_SUCCESS} from '../actions';
import { URL_LOAD_VENDER } from '../utils/URLs.js';

export default class  callMe extends React.Component{
    constructor(props) {
      super(props);
      this.vender = [];
    }

    componentWillMount(){
    	console.log("=============================",this.props.adress)
    	if(this.props.user.userId){
    		console.log("==================================进入ajax=============================")
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
			                  <span className="infoText hasLogin">
			                      移动电话 : <a href="javascript:;">登入</a>后可见
			                  </span>
			               </li>
			               <li className="right">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe607;</i>
			                  </span>
			                  <span className="infoText">
			                      邮编 : 518290
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
			                      公司主页 : <a className="OfficialWebsite" href="ts57.lacewang.cn">{this.props.address}.lacewang.cn?auto=1</a>
			                  </span>
			               </li>
			               <p style={{clear: 'both'}}></p>
			           </ul>
			      </div>
			      <div className="contact_Map">
			          <img src={Utils.home+"images/map.png"} width="100%" height="100%" />
			      </div>
			     </div>
			  </div>
		  );
	}
}
function mapStateToProps(state, ownProps) {
  return {
  	user: state.user,
  	vender: state.getVenderInfo,
  }
}

export default connect(mapStateToProps, {
  ajaxRequest,
})(callMe)