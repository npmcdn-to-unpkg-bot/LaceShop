let Utils = require('../utils/Utils');
require('styles/Register.scss');
require('styles/Login.scss')

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { LOAD_USERLOGIN_SUCCESS, ajaxRequest,getBooleans } from '../actions';
import {URL_LOAD_TOLOGIN } from '../utils/URLs.js';
import { Nav, NavItem, OverlayTrigger, Popover, Modal, Overlay, ProgressBar,form, DropdownButton,MenuItem } from 'react-bootstrap';
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      showModalToLog :false,
    }
    this.checkFristLogin1 = true;
    this.close = this.close.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(){

    let tel = $(this.refs.telLogin).val();
    let password = $(this.refs.pwdLogin).val();
    this.props.ajaxRequest(URL_LOAD_TOLOGIN,LOAD_USERLOGIN_SUCCESS,{
      tel:tel,
      password:password,
    })
  }

  componentWillReceiveProps(nextProps){
     this.setState({showModalToLog:nextProps.showModalToLogin})
     if(nextProps.tologin && this.checkFristLogin1 &&this.props.flag){
      this.props.getBooleans(false)
      this.setState({ showModalToLog: false });
      this.checkFristLogin1 =false;
      alert("登录成功")
     
    }
  }

   close() {
    this.setState({ showModalToLog: false });
  }

  render() {
    return (
     <Modal show={this.state.showModalToLog} onHide={this.close} className = "modalLog">
          <Modal.Body>
            <div className="right">
              <button type="button" className="close" aria-label="Close" onClick={this.close}><i  className = "iconfont icon-quxiao"></i></button>             
              <div className="title">
                <h4>账号登录</h4>                
              </div>
                <div className="tswq-input-group accountName">
                  <span className="glyphicon glyphicon-user hengxin-icon hengxin-icon-tel"></span>
                  <input name="username" className="form-control hengxin-login-input" type="number" placeholder="手机号码" ref="telLogin"/>
                </div>
                <div className="tswq-input-group passwordName">
                  <span className="glyphicon glyphicon-lock hengxin-icon"></span>
                  <input name="password" className="form-control hengxin-login-input" type="password" placeholder="密码" ref = "pwdLogin"/>
                </div>
                <button onClick={this.submitLogin}  className="btn btn-primary btn-lg btn-block hengxin-login-btn"> 登 录 </button>
            </div>
          </Modal.Body>
        </Modal>
     
    );
  }
}

Login.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    flag:state.getflage,
  }
}

export default connect(mapStateToProps, {
  getBooleans,
})(Login)