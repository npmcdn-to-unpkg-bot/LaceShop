require('styles/Header.scss');
let Utils = require('../utils/Utils');

import React from 'react';
import HeaderUserTip from './HeaderUserTip.js';

import { Nav, NavItem, OverlayTrigger, Popover} from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-default navbar-topbox">
          <div className="container">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="javascript:;" className="nav-text" style={{fontSize:'14px'}}><img alt="logo" src={Utils.home + 'images/logo_mini.png'}/>&nbsp;欢迎来到无欺花边行&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li><a href="javascript:;" className="nav-link">请登录</a></li>
                <li><a href="javascript:;" className="nav-split">|</a></li>
                <li><a href="javascript:;" className="nav-link">免费注册</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container header-container">
          <div className="left">
            <div className="logo-wraper">
              <img src={Utils.home + 'images/logo_100.jpg'} alt="LOGO" />               
            </div>
            <div className="user-info">
              <div className="company-name">无欺花边行</div>            
              <div className="ext-info">
                <HeaderUserTip title="VIP" src={Utils.home + 'images/icons/user_tip_vip.png'}/>
                <HeaderUserTip title="诚信用户" src={Utils.home + 'images/icons/user_tip_honest.png'}/>
                <HeaderUserTip title="优质用户" src={Utils.home + 'images/icons/user_tip_good.png'}/>
                <div className="year">2年</div>
              </div>
            </div>
            <div className="qr-code">
              <OverlayTrigger trigger={['hover', 'focus']} container={this} placement="bottom" overlay={<Popover id="qrImg"><img src={Utils.home + '/images/qr.png'} alt="二维码"/></Popover>}>    
                <span className="glyphicon glyphicon-qrcode"></span>
              </OverlayTrigger>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="right">
            <div className="search-area">
              <a href="javascirpt:;" className="upload-btn">
                <span>从本地上传</span>
                <input type="file" name="files" accept="image/*" className="pick-pic-input" data-url="/pic/picUpload"/>
              </a>
              <form className="search-form">
                <span className="stuwr"> 
                  <input type="text" placeholder="编号或厂名" className="search-key"/>                      
                </span> 
                <span className="stsb"> 
                  <input type="submit" value="搜花一下"/>
                </span>
              </form>

              <div className="camerabox" style={{display:'none'}}>
                <div className="camerabox-title">
                  <span>在花型上滑动截图并选择花型类型</span>
                  <span className="glyphicon glyphicon-remove camerabox-close"></span>
                </div>
                <div className="camerabox-panel">
                  <div className="camerabox-area">
                    <div className="camerabox-crop">
                        <img src={Utils.home + 'images/holder.gif'} className="camerabox-croptarget"/>
                    </div>
                    <div className="camerabox-btn">
                      <a href="#lacewangMastHead" className="category-btn"><span className="glyphicon glyphicon-ok"></span> 面料</a>
                      <a href="#lacewangMastHead" className="category-btn"><span className="glyphicon glyphicon-ok"></span> 大边</a>
                      <a href="#lacewangMastHead" className="category-btn"><span className="glyphicon glyphicon-ok"></span> 小边</a>
                      <a href="#lacewangMastHead" className="category-btn"><span className="glyphicon glyphicon-ok"></span> 睫毛</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="progress" style={{display:'none'}}>
                <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  
                </div>
                <span className="pull-right glyphicon glyphicon-remove stop-btn"></span>
              </div>

            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="banner">
          <img alt="背景图片" src={Utils.home + 'images/banner.jpg'}/>
        </div>
        <div className="header-nav">
          <div className="container nav-container">            
            <Nav bsStyle="pills" activeKey={this.props.navActive}>
              <NavItem className="nav-item" eventKey={"1"} href="./Index.html">　首页　</NavItem>
              <NavItem className="nav-item" eventKey={"2"} href="./SupplyProducts.html">供应产品</NavItem>
              <NavItem className="nav-item" eventKey={"3"}>公司简介</NavItem>
              <NavItem className="nav-item" eventKey={"4"} href="./Contacts.html">联系方式</NavItem>
              <NavItem className="nav-item" eventKey={"5"} href="./Feedback.html">意见反馈</NavItem>
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}