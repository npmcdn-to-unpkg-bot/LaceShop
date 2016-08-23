require('styles/Header.scss');
require('styles/jquery.Jcrop.css');
let Utils = require('../utils/Utils');
require('styles/Login.scss');
require('styles/Register.scss')

import React from 'react';
import HeaderUserTip from './HeaderUserTip.js';
import { browserHistory,router,hashHistory, } from 'react-router';
import { Nav, NavItem, OverlayTrigger, Popover, Modal, Overlay, ProgressBar,form, DropdownButton,MenuItem } from 'react-bootstrap';
import { LOAD_SEARCH_SUCCESS, LOAD_SEARCH_PERCENT_SUCCESS, LOAD_USERLOGIN_SUCCESS, 
  LOAD_CAPTCHA_SUCCESS, LOAD_ADDUSER_SUCCESS ,LOAD_SEARCHBYCODE_SUCCES ,LOAD_PIC_SUCCESS} from '../actions';
import { URL_LOAD_CLIENTPIC, URL_LOAD_VNEDERPIC, URL_LOAD_SEARCH_PERCENT, 
  URL_LOAD_TOLOGIN, URL_LOAD_CAPTCHA, URL_LOAD_SAVEUSER, URL_LOAD_SEARCHBYCODE } from '../utils/URLs.js';


export default class Header extends React.Component {  
  constructor(props) {    
    super(props);
    this.state = { 
      showModal: false,
      activeCategory: 0,
      activeWhere: 1,
      popoverTarget: null,
      showPopover: false,
      isSearching: false,
      percent : -1,
      showModalToLogin: false,
      role: 1,
      roleName: '我是采购商',
      showModalRegister:false,
      switchUpload:false,
      
    };

    this.flags = true;
    this.jcropApi;
    this.picPath;
    this.position;
    this.defaultPosition;
    this.srcName = null;
    this.countDown = false;
    this.checkFristLogin = true;
    this.checkFirstRegister =true;
   
    
    this.changeRole = this.changeRole.bind(this)
    this.submitReg = this.submitReg.bind(this)
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.cutFlowerChange = this.cutFlowerChange.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.getFlowers = this.getFlowers.bind(this);
    this.toLogin = this.toLogin.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.sendCAPTCHA = this.sendCAPTCHA.bind(this);
    this.findByCode = this.findByCode.bind(this);
  }

  findByCode(){
    let srcName = $(this.refs.inputSrcName).val()
    if(!srcName){
      alert("请输入产品编号")
    }
    this.props.changHandle(2);
    browserHistory.push(`/SupplyProduct`)
    this.props.getSrcName(srcName);
    this.props.getParame('');
  }

  sendCAPTCHA(){
      let self = this;
      let times = 60;
      let tel = $(this.refs.telRegister).val();
      this.props.ajaxRequest(URL_LOAD_CAPTCHA,LOAD_CAPTCHA_SUCCESS,{
        username:tel
      })
      if(this.countDown == false){
        let numbers = setInterval(function(){
          times--;
          this.countDown == true;
          $(self.refs.timeout).text("发送中..."+times+"秒")
          if(times<=0){
              $(self.refs.timeout).text("获取验证码超时");
              clearInterval(numbers);
              numbers = null;
              self.countDown = false;
            }
        },1000);
      }
    
    
  }

  submitLogin(){
    let tel = $(this.refs.telLogin).val();
    let password = $(this.refs.pwdLogin).val();
    this.props.ajaxRequest(URL_LOAD_TOLOGIN,LOAD_USERLOGIN_SUCCESS,{
      tel:tel,
      password:password,
    })
  }

  submitReg(evt) {
    evt.preventDefault();
    let tel = $(this.refs.telRegister).val();
    let regCode = $(this.refs.getReg).val() 
    let password = $(this.refs.passwordRegister).val()
    // const { ajaxRequest } = ;
    if(tel && password) {  
      this.props.ajaxRequest(URL_LOAD_SAVEUSER, LOAD_ADDUSER_SUCCESS, {
          usertype: this.state.role, 
          password: password,
          tel: tel,
          regCode: regCode,
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

  toLogin(){
    this.setState({ showModalToLogin: true });
  }

  toRegister(){
    this.setState({ showModalRegister: true });
  }

  handleChange(nextValue, navIndex) {
    this.props.changHandle(navIndex);
    this.props.getPics(null);
    browserHistory.push(`/${nextValue}`)
  }

  close() {
    this.setState({ showModal: false });
    this.setState({ showModalToLogin: false });
    this.setState({ showModalRegister: false });

  }

  getFlowers(e){
    this.setState({switchUpload:true});
    if(this.state.activeCategory == 0){      
      this.setState({ popoverTarget: e.target, showPopover: true });
      return;
    }

    let width = $("#cutPic").width()
    let height = $("#cutPic").height()
    let { user, ajaxRequest } = this.props;

    if(this.position){

    }else if(this.defaultPosition){

    }else{
      
    }  

    let loadUrl = '';
    if(1 == user.userType) {
      loadUrl = URL_LOAD_CLIENTPIC;
    } else if( 2 == user.userType ) {
      loadUrl = URL_LOAD_VNEDERPIC;
    }

    if('' != loadUrl) {
      this.setState({
        isSearching: true
      })

      ajaxRequest(loadUrl, LOAD_SEARCH_SUCCESS, {
        srcName: this.srcName,
        srcNameHidden: this.picPath,
        category: this.state.activeCategory,
        userId: user.userId
      });      
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
      this.animateTo([width/2/2, height/2/2, width-width/2/2, height-height/2/2])
      jcropApi1.disable();
    });

    this.jcropApi = jcropApi1;
    if(this.flags){
      this.jcropApi.enable()
      let width = this.jcropApi.getWidgetSize()[0]
      let height = this.jcropApi.getWidgetSize()[1]      
      self.defaultPosition = [height/2, width/2, width/2/2, width-width/2/2, height/2/2, height-height/2/2]; 
      this.jcropApi.animateTo([width/2/2, height/2/2, width-width/2/2, height-height/2/2])

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
    this.setState({ 
      activeCategory: category
    });
    this.setState({ showPopover: false });
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
          this.srcName = data._response.result.fileName;
          self.open();
        }.bind(this),
        fail :function (e, data){
          
        },
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.saveUser && this.checkFirstRegister){
      this.setState({ showModalRegister: false });
      alert("注册成功")
      this.checkFirstRegister =false;
    }
    if(nextProps.tologin && this.checkFristLogin ){
      this.setState({ showModalToLogin: false });
      alert("登录成功")
      this.checkFristLogin =false;
    }
    let { searchStatus, ajaxRequest, sessionId } = nextProps;
    this.state.percent = searchStatus
    if(0 == this.state.percent && this.state.switchUpload) {
      this.setState({ showModal: false });
      ajaxRequest(URL_LOAD_SEARCH_PERCENT, LOAD_SEARCH_PERCENT_SUCCESS, {

      });
    } else if (0 < this.state.percent && this.state.percent < 100 && this.state.switchUpload) {
      setTimeout(() => {
        ajaxRequest(URL_LOAD_SEARCH_PERCENT, LOAD_SEARCH_PERCENT_SUCCESS, {
          sessionId: sessionId
        });
      },2000)      
    } else if (this.state.percent >= 100 && this.state.switchUpload) {
      this.setState({
        switchUpload:false,
        isSearching: false,
        percent: -1
      })

      this.props.changHandle(2);
      this.props.getParame(sessionId)
      browserHistory.push(`/SupplyProduct`)
    }

    const {navIndexInProp} = nextProps;
    if(navIndexInProp && navIndexInProp > 0) {
      this.setState({
        activeWhere: navIndexInProp
      });
    }
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
                <li><a href="javascript:;" className="nav-text" style={{fontSize:'14px'}}>&nbsp;{this.props.tologin?"用户:"+this.props.tologin.tel:""}</a></li>
                <li><a href="javascript:;" className="nav-text" style={{fontSize:'14px'}}>&nbsp;欢迎来到{this.props.user.usernameForShort}&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li><a href="javascript:;" className="nav-link" onClick = {this.toLogin}>{this.checkFristLogin?"请登录":""}</a></li>
                <li><a href="javascript:;" className="nav-split">{this.checkFristLogin?"|":""}</a></li>
                <li><a href="javascript:;" className="nav-link" onClick = {this.toRegister}>{this.checkFristLogin || this.checkFirstRegister ?"免费注册":""}</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container header-container">
          <div className="left">
            <div className="logo-wraper">
              <img src={ (this.props.user.logo? Utils.serverName+this.props.user.logo: Utils.home+"images/productLogo.png")}  alt="LOGO" />               
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
              <OverlayTrigger trigger={['hover', 'focus']} container={this} placement="bottom" overlay={<Popover id="qrImg"><img src={(this.props.user.twoDimensionCode ? Utils.serverName +  this.props.user.twoDimensionCode : "")} alt="二维码"/></Popover>}>    
                <span className="glyphicon glyphicon-qrcode"></span>
              </OverlayTrigger>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="right">
            <div style={( this.state.switchUpload ? {visibility: 'hidden'} : {})} className="search-area">
              <a href="javascirpt:;" className="upload-btn">
                <i className = "iconfont icon-camera"></i>
                <span>上传搜花</span>
                <input type="file" name="files" accept="image/*" id = "fileupload1" className="pick-pic-input" data-url={Utils.serverName + 'client/clientUpload.shtml'}/>
              </a>
              <form className="search-form" >
                <span className="stuwr"> 
                  <input type="text" placeholder="编号" className="search-key" ref = "inputSrcName"/>                      
                </span> 
                <span className="stsb"> 
                  <input type="button" value="搜花一下" onClick ={this.findByCode}/>
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
            </div>
            <ProgressBar style={(this.state.switchUpload ? {display: 'block'} : {display: 'none'})} now={(this.state.percent > 0 ? this.state.percent : 0)} label={(this.state.percent > 0 ? `${this.state.percent}%` : '')} />

          </div>
          <div className="clearfix"></div>
        </div>
        <div className="banner">
          <img alt="背景图片" src={(this.props.user.backpic ? this.props.user.backpic: Utils.home+"images/backpic.jpg") } id = "cropTargetImg"/>
        </div>
        <div className="header-nav">
          <div className="container nav-container">            
            <Nav bsStyle="pills" activeKey={this.state.activeWhere}>
              <NavItem className={'nav-item'} eventKey={1}  onSelect={() => this.handleChange('', 1)}>　首页　</NavItem>
              <NavItem className={'nav-item'} eventKey={2}  onSelect={() => this.handleChange('SupplyProduct', 2)}>供应产品</NavItem>
              <NavItem className={'nav-item'} eventKey={4}  onSelect={() => this.handleChange('callMe', 4)}>联系方式</NavItem>
              <NavItem className={'nav-item'} eventKey={5}  onSelect={() => this.handleChange('suggestionFeedback', 5)}>意见反馈</NavItem>
              <NavItem className={'nav-item'} eventKey={6}  onSelect={() => this.handleChange('Dress', 6)}>3D试衣</NavItem>
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
            <div ref="popoverContainer" className = "contentRight">
              <div className = "contentRight-up">
                <p>搜索类型:</p>
                 <button className = {'category1' + (4 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 4)}>面料</button>
                 <button className = {'category2' + (2 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 2)}>大边</button>
                 <button className = {'category3' + (1 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 1)}>小边</button>
                 <button className = {'category4' + (3 == this.state.activeCategory ? ' on' : '')} onClick= {this.changeColor.bind(this, 3)}>睫毛</button>
                 <p><span className = "morethan" >更多></span></p>
              </div>
              <div className = "contentRight-center">
                <p>裁剪干扰部分更容易搜到花型</p>
                <button  className = "cutFlower" onClick = {this.cutFlowerChange}><span className="iconfont icon-crop"></span> <span id = "cutName">裁剪花型</span></button>
              </div>
              <div className="contentRight-footer">
                <p>说明:</p>
                <p>1.选择搜索类型</p>
                <p>2.图片如有干扰可剪切</p>
                <p>3.点击搜索</p>
              </div>
              <button style={(this.state.isSearching ? {disabled: 'disabled'} : {})} className = "uploadMsg" id="findFlower" onClick = {this.getFlowers}>{(this.state.isSearching ? '正在搜索' : '搜 花 型')}</button>
              <Overlay
                show={this.state.showPopover}
                target={this.state.popoverTarget}
                placement="top"
                container={this.refs.popoverContainer}
                containerPadding={20}
              >
                <Popover id="popover-contained" title="温馨提示">
                  <strong>请选择类型!</strong>
                </Popover>
              </Overlay>
            </div>
          </div>          
        </Modal>
        <Modal show={this.state.showModalToLogin} onHide={this.close} className = "modalLog">
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
        <Modal  className = "modalReg" show={this.state.showModalRegister} onHide={this.close}>
            <Modal.Body>
              <div className="right">
              <button type="button" className="close" aria-label="Close" onClick={this.close}><i  className = "iconfont icon-quxiao"></i></button>             
              <div className="title">
                <h4>账号注册</h4>                
              </div>

              <form className="form-horizontal" onSubmit={(evt) => this.submitReg(evt)}> 
                <div class="role-pick">
                  <DropdownButton bsSize="large" bsStyle="default" title={this.state.roleName} id="rolePicker" className="btn-block findType" onSelect={(role) => this.changeRole(role)}>
                    <MenuItem eventKey="1" active={this.state.role == 1}>我是采购商</MenuItem>
                    <MenuItem eventKey="2" active={this.state.role == 2}>我是供应商</MenuItem>
                  </DropdownButton>
                </div>
                <div className="tswq-input-group findTel">
                  <span className="glyphicon glyphicon-user hengxin-icon hengxin-icon-tel"></span>
                  <input ref="username" className="form-control hengxin-login-input" ref = "telRegister" type="number" placeholder="手机号码"/>
                </div>
                <div className="tswq-input-group findPwd">
                  <span className="glyphicon glyphicon-lock hengxin-icon"></span>
                  <input ref="password" className="form-control hengxin-login-input" ref="passwordRegister" type="password" placeholder="密码"/>
                </div>
                <div className="input-group findReg">
                  <span className="glyphicon glyphicon-envelope hengxin-icon hengxin-icon-regCode"></span>
                  <input name="regCode" className="form-control hengxin-login-input hengxin-login-input-code" ref="getReg" type="text" placeholder="验证码"/>
                  <span className="input-group-btn">
                    <button type="button" className="btn btn-primary hengxin-btn-regCode" ref = "timeout"  onClick = {this.sendCAPTCHA}>获取验证码</button>
                  </span>
                </div>
                <button type="submit" data-loading-text="注册中..." className="btn btn-primary btn-lg btn-block hengxin-login-btn"> 注 册 </button>             
              </form>
            </div>
            </Modal.Body>
          </Modal>
        
      </div>
    );
  }
}