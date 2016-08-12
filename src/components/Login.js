let Utils = require('../utils/Utils');
require('styles/Register.scss');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { LOAD_USERLOGIN_SUCCESS, ajaxRequest } from '../actions';
import { URL_LOAD_LOGIN } from '../utils/URLs.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.loginFn = this.loginFn.bind(this);
  } 
  loginFn(evt){
  	psw = $("#psw").val();
  	telNum = $("#telNum").val();
  	if(psw && telNum){
  		this.props.ajaxRequest(URL_LOAD_LOGIN,LOAD_USERLOGIN_SUCCESS,{
  			telphone:psw,
  			password:psw
  		})
  	}
    evt.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="reg">
        <div className="container" style={{padding:0}}>
          <div className="reg-banner">
            <img src={Utils.home + 'images/login.jpg'} alt="LOGO"/>
          </div>
          <div className="reg-content">
            <div className="left">
              <img src={Utils.home + 'images/left.png'}/>
            </div>
            <div className="right">             
              <div className="title">
                <h4>账号登录</h4>                
              </div>

              <form className="form-horizontal" onSubmit={(evt) => this.loginFn(evt)}> 
                <div className="tswq-input-group">
                  <span className="glyphicon glyphicon-user hengxin-icon hengxin-icon-tel"></span>
                  <input name="username" className="form-control hengxin-login-input" type="number" placeholder="手机号码" id = "telNum"/>
                </div>
                <div className="tswq-input-group">
                  <span className="glyphicon glyphicon-lock hengxin-icon"></span>
                  <input name="password" className="form-control hengxin-login-input" type="password" placeholder="密码" id = "psw"/>
                </div>
                <button type="submit" data-loading-text="登录中..." className="btn btn-primary btn-lg btn-block hengxin-login-btn" on> 登 录 </button>             
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, {

})(Login)