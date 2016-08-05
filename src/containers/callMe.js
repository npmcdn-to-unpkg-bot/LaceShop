let Utils = require('../utils/Utils');
require('styles/ProWe_public.css');
require('styles/ProWe_ContactInfo.css');

import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

export default class  callMe extends React.Component{

    constructor(props) {
      super(props);
    }
	componentWillMount(){
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
			                      电话 : 86 020 34494362
			                  </span>
			               </li>
			               <li className="right">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe60a;</i>
			                  </span>
			                  <span className="infoText">
			                      地址 : 中国广东广东市海珠区中大银岭广场二楼E439-E441
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
			                      传真 : 86 020 34494362
			                  </span>
			               </li>
			               <li className="right">
			                  <span className="infoIco">
			                      <i className="iconfont">&#xe60e;</i>
			                  </span>
			                  <span className="infoText">
			                      公司主页 : <a className="OfficialWebsite" href="ts57.lacewang.cn">ts57.lacewang.cn</a>
			                  </span>
			               </li>
			               <p style={{clear: 'both'}}></p>
			           </ul>
			      </div>
			      <div className="contact_Map">
			          <img src="../images/map.png" width="100%" height="100%" />
			      </div>
			     </div>
			  </div>
		  );
	}
}