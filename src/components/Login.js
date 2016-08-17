let Utils = require('../utils/Utils');
require('styles/Register.scss');
require('styles/Login.scss')

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
      <Modal show={this.state.showModalToLogin} onHide={this.close}>
          <Modal.Body>
             <div className="right">
              <form className="loginFrame" onSubmit={(e) => this.submitHandle(e) }>
                  <div className="loginName">
                      <p>帐号登录</p>
                  </div>
                  <div className="loginContext">
                      <div className="account">
                          <span className="glyphicon glyphicon-user">
                          </span>
                          <input type="text" placeholder="手机号" 
                                 onChange={this.checkTel }/>
                      </div>
                      {this.renderError('account') }
                      <div className="password">
                          <span className="glyphicon glyphicon-lock">
                          </span>
                          <input type="password" placeholder="密码" value={form.pwd.val}
                                 onChange={(e) => {
                                     this.handleChange(e, 'pwd')
                                 } }/>
                      </div>
                      {this.renderError('pwd') }
                  </div>
                  <div className="loginAssist">
                      <a href="javascript:;" className="forgetPassword">忘记密码</a>
                      <a href="javascript:;" className="forgetAccount">忘记登录名</a>
                      <Link to='/register' className="register">免费注册</Link>
                  </div>
                  <div className="toLogin">
                      <button className="tologinButton">登录</button>
                  </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
          </Modal.Footer>
        </Modal>
     
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