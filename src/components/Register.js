let Utils = require('../utils/Utils');
require('styles/Register.scss');

import React, { ReactDOM, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { ADD_REG_USER_SUCCESS, ajaxRequest } from '../actions';
import { URL_LOAD_ADDUSER } from '../utils/URLs.js';
import { browserHistory } from 'react-router';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.changeRole = this.changeRole.bind(this)
    this.submitReg = this.submitReg.bind(this)

    this.state = {
      role: 1,
      roleName: '我是采购商' 
    }
  } 
  changeRole(role) {
    let roleName = '我是采购商';
    if(role == 2) {
      roleName = '我是供应商';
    }
    this.setState({
      role: role,
      roleName: roleName       
    });
  }

  submitReg(evt) {
    evt.preventDefault();

    let username = this.refs.username.value;
    let password = this.refs.password.value;
    // const { ajaxRequest } = ;
    if(username && password) {  
      this.props.ajaxRequest(URL_LOAD_ADDUSER, ADD_REG_USER_SUCCESS, {
          "category": this.state.role, 
          "password": password,
          "telephone": username
      })
    }else{
      
    }
  //     setTimeout(() => {
  //       alert('注册成功');
  //     }, 2000);
  //   } else {
  //     alert('填写的信息有误');
  //   }
  //   return false;
   }

  render(){
    /*
                //验证码
                <div className="input-group">
                  <span className="glyphicon glyphicon-envelope hengxin-icon hengxin-icon-regCode"></span>
                  <input name="regCode" className="form-control hengxin-login-input hengxin-login-input-code" type="text" placeholder="验证码"/>
                  <span className="input-group-btn">
                    <button type="button" className="btn btn-primary hengxin-btn-regCode" data-loading-text="短信发送中...">获取验证码</button>
                  </span>
                </div>
    */
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
                <h4>账号注册</h4>                
              </div>

              <form className="form-horizontal" onSubmit={(evt) => this.submitReg(evt)}> 
                <div class="role-pick">
                  <DropdownButton bsSize="large" bsStyle="default" title={this.state.roleName} id="rolePicker" className="btn-block" onSelect={(role) => this.changeRole(role)}>
                    <MenuItem eventKey="1" active={this.state.role == 1}>我是采购商</MenuItem>
                    <MenuItem eventKey="2" active={this.state.role == 2}>我是供应商</MenuItem>
                  </DropdownButton>
                </div>
                <div className="tswq-input-group">
                  <span className="glyphicon glyphicon-user hengxin-icon hengxin-icon-tel"></span>
                  <input ref="username" className="form-control hengxin-login-input" type="number" placeholder="手机号码"/>
                </div>
                <div className="tswq-input-group">
                  <span className="glyphicon glyphicon-lock hengxin-icon"></span>
                  <input ref="password" className="form-control hengxin-login-input" type="password" placeholder="密码"/>
                </div>
                <div className="input-group">
                  <span className="glyphicon glyphicon-envelope hengxin-icon hengxin-icon-regCode"></span>
                  <input name="regCode" className="form-control hengxin-login-input hengxin-login-input-code" type="text" placeholder="验证码"/>
                  <span className="input-group-btn">
                    <button type="button" className="btn btn-primary hengxin-btn-regCode" data-loading-text="短信发送中...">获取验证码</button>
                  </span>
                </div>
                <button type="submit" data-loading-text="注册中..." className="btn btn-primary btn-lg btn-block hengxin-login-btn"> 注 册 </button>             
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

