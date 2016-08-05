require('styles/Header.scss');
require('styles/jquery.Jcrop.css');
let Utils = require('../utils/Utils');


import React from 'react';
import HeaderUserTip from './HeaderUserTip.js';
import { browserHistory } from 'react-router';

import { Nav, NavItem, OverlayTrigger, Popover, Modal } from 'react-bootstrap';

export default class Header extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false,
      activeCategory: 0,
      findType:0,
      navActive : 1

    };

    this.flags = true;
    this.jcropApi;
    this.picPath;
    this.position;
    this.defaultPosition;

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.cutFlowerChange = this.cutFlowerChange.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.getFlowers = this.getFlowers.bind(this);
  }

  handleChange(nextValue, navIndex) {
    this.setState({
      navActive: navIndex
    });
    browserHistory.push(`/${nextValue}`)
  }

  close() {
    this.setState({ showModal: false });
  }

  getFlowers(){
    if(this.state.findType == 0){
      //不知道为什么这段不能用
      // $('#findFlower').popover({
      //          title:"请选择类型",
      //          placement:"top"
      //       }).popover('show');
      alert("请选择类型")
      return;
    }
    let width = $("#cutPic")[0].width
    let height = $("#cutPic")[0].height
    console.log($(".contentLeft").height())
    if(this.position){
       console.log("=================position",this.position)
    console.log("===================findType",this.state.findType)
    }else if(this.defaultPosition){
      console.log("=================position",this.defaultPosition)
    console.log("===================findType",this.state.findType)
    }else{
      //[height,width,0,0,0,0]
    }
   
  }

  cutFlowerChange(event){
      let self = this;
      let jcropApi1 = this.jcropApi;
    $('#cutPic').Jcrop({

      keySupport : false,
      baseClass: 'jcrop',
      onSelect:function(){
        self.position = jcropApi1.tellSelect();
      }
    }, function() {
      jcropApi1 = this;
      let width = this.getWidgetSize()[0]
      let height = this.getWidgetSize()[1]
      this.animateTo([width/2/2,height/2/2,width-width/2/2,height-height/2/2])
      jcropApi1.disable();

    });
    this.jcropApi = jcropApi1;
    if(this.flags){
      this.jcropApi.enable()
      let width = this.jcropApi.getWidgetSize()[0]
      let height = this.jcropApi.getWidgetSize()[1]
      self.defaultPosition = [height/2,width/2,width/2/2,width-width/2/2,height/2/2,height-height/2/2]; 
       this.jcropApi.animateTo([width/2/2,height/2/2,width-width/2/2,height-height/2/2])

      this.flags=false;
      $("#cutName").text("原图");
    }else{
      this.flags=true;
      this.jcropApi.release();
      this.jcropApi.disable();
       $("#cutName")  .text("剪裁花型")
    }
  }

  changeColor(category,event){
    // if(this.state.findType === 0){

    // }
    let caseType = $(event.nativeEvent.target).text()
    if(caseType === "面料"){
      this.state.findType = 1;
    }else if(caseType === "大边"){
      this.state.findType = 2;
    }else if(caseType === "小边"){
      this.state.findType = 3;
    }else{
      this.state.findType = 4;
    }

    this.setState({ activeCategory: category});
  }

  componentWillMount(){
  
  }

  componentDidMount() {
    let self = this;
    $('#fileupload1').fileupload({
        dataType: 'json',
        add: function (e, data) {
          
          
            var strs = data.originalFiles[0].name.split(".");
            var str = strs[1].toUpperCase();
            if(str=="JPG" || str == "JEPG" || str == "GIF" || str == "BMP" || str == "PNG"){
               data.submit();
            }

        },
        done: function (e, data) {
          this.picPath = data._response.result.msg;
          self.open();
        }.bind(this),
        fail :function (e, data){
          
        },
    });
  }

  open() {
    this.setState({ showModal: true });
  }
  
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-default navbar-topbox">
          <div className="container">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="javascript:;" className="nav-text" style={{fontSize:'14px'}}><img alt="logo" src={Utils.home + 'images/logo_mini.png'}/>&nbsp;欢迎来到{this.props.user.usernameForShort}&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
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
              <img src={Utils.serverName +this.props.user.logo}  alt="LOGO" />               
            </div>
            <div className="user-info">
              <div className="company-name">{this.props.user.usernameForShort}</div>           
              <div className="ext-info">
                <HeaderUserTip title="VIP" src={Utils.home + 'images/icons/user_tip_vip.png'}/>
                <HeaderUserTip title="诚信用户" src={Utils.home + 'images/icons/user_tip_honest.png'}/>
                <HeaderUserTip title="优质用户" src={Utils.home + 'images/icons/user_tip_good.png'}/>
                <div className="year">2年</div>
              </div>
            </div>
            <div className="qr-code">
              <OverlayTrigger trigger={['hover', 'focus']} container={this} placement="bottom" overlay={<Popover id="qrImg"><img src={Utils.serverName + this.props.user.twoDimensionCode} alt="二维码"/></Popover>}>    
                <span className="glyphicon glyphicon-qrcode"></span>
              </OverlayTrigger>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="right">
            <div className="search-area">
              <a href="javascirpt:;" className="upload-btn">
                <span>从本地上传</span>
                <input type="file" name="files" accept="image/*" id = "fileupload1" className="pick-pic-input" data-url={Utils.serverName + 'client/clientUpload.shtml'}/>
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
          <img alt="背景图片" src={this.props.user.backpic} id = "cropTargetImg"/>
        </div>
        <div className="header-nav">
          <div className="container nav-container">            
            <Nav bsStyle="pills" activeKey={this.props.navActive}>
              <NavItem className="nav-item" eventKey={"1"}  onSelect={() => this.handleChange('', 1)}>　首页　</NavItem>
              <NavItem className="nav-item" eventKey={"2"}  onSelect={() => this.handleChange('SupplyProduct', 2)}>供应产品</NavItem>
              <NavItem className="nav-item" eventKey={"3"}>公司简介</NavItem>
              <NavItem className="nav-item" eventKey={"4"}  onSelect={() => this.handleChange('callMe', 4)}>联系方式</NavItem>
              <NavItem className="nav-item" eventKey={"5"}  onSelect={() => this.handleChange('suggestionFeedback', 5)}>意见反馈</NavItem>
            </Nav>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.close} id ="headerModal" >
           
              <div className="search-target-crop ">
                <p>上传花型</p>
                <button type="button" className="close" aria-label="Close" onClick={this.close}><i  className = "iconfont icon-quxiao"></i></button>
                <div className = "contentLeft">
                  <div className = "cropTargetImg">
                    <img src={Utils.serverName + 'search/picSearchGetFile.shtml?picPath='+this.picPath} id = "cutPic"/>
                  </div>
                </div>
                <div className = "contentRight">
                  <div className = "contentRight-up">
                    <p>搜索类型:</p>
                     <button className = {'category1' + (1 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 1)}>面料</button>
                     <button className = {'category2' + (2 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 2)}>大边</button>
                     <button className = {'category3' + (3 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 3)}>小边</button>
                     <button className = {'category4' + (4 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 4)}>睫毛</button>
                     <p><span className = "morethan" >更多></span></p>
                  </div>
                  <div className = "contentRight-center">
                    <p>裁剪干扰部分更容易搜到花型</p>
                    <button  className = "cutFlower" onClick = {this.cutFlowerChange}><span className="iconfont icon-crop"></span> <span id = "cutName">裁剪花型</span></button>
                  </div>
                  <div className = "contentRight-footer">
                    <p>说明:</p>
                    <p>1.选择搜索类型</p>
                    <p>2.图片如有干扰可剪切</p>
                    <p>3.点击搜索</p>
                  </div>
                  <button className = "uploadMsg" id = "findFlower" onClick = {this.getFlowers}>搜工艺</button>
                </div>
              </div>          
        </Modal>
      </div>
    );
  }
}