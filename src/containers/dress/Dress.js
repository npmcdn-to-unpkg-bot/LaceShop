let Utils = require('../../utils/Utils');
require('styles/dress/Dress.scss');
let canvasHelp = require('../../utils/canvasHelp');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Nav, NavItem } from 'react-bootstrap';
import DressModel from '../../components/dress/DressModel.js';
import {dressModelData} from '../../sources/DressModelData.js';
import {notification} from '../../components/Notification';

const loadingImg = Utils.home + 'images/holder.gif';
//const dressUrl = 'http://www.lacewang.cn/pic/dress3dEx.shtml' 
const dressUrl = '/pic/dress3dEx.shtml' 

class Dress extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.state = {
      modelUrl: 'D%3A%5C%E5%9B%BE%E5%BA%93%5C%E5%8E%82%E5%AE%B6%E5%9B%BE%E5%BA%93%5C%E9%87%91%E9%91%AB_8769%5C%E9%9D%A2%E6%96%99%5C8769_603339.jpeg',
      thumbnail: Utils.serverName+"search/picSearchGetThumbnail.shtml?picPath=D%3A%5C%E5%9B%BE%E5%BA%93%5C%E5%8E%82%E5%AE%B6%E5%9B%BE%E5%BA%93%5C%E9%87%91%E9%91%AB_8769%5C%E9%9D%A2%E6%96%99%5C8769_603339.jpeg",
      avatarCode: 112
    }
    this.urls = "";
  }  

  refresh() {
    if(!this.state.modelUrl || !this.state.avatarCode){
      alert(11111)
      return;
    }

    let img = new Image();
    let loadImg = new Image();
    let wrapperGallery = $('.gallery-cropper-area');
    
    loadImg.src = loadingImg;
    wrapperGallery.empty();
    wrapperGallery[0].appendChild(loadImg);
    img.src = dressUrl + '?url=' + this.state.modelUrl + "&avatarCode=" + this.state.avatarCode;
    this.urls = img.src
    if(img.complete) {
      wrapperGallery.empty();
      wrapperGallery[0].appendChild(img);
      return;
    }
    img.onload = function(){
      wrapperGallery.empty();
      wrapperGallery[0].appendChild(img);
    }
  }

  changeAvatar(avatarCode) {
    console.log('avatarCode', avatarCode);
    this.setState({
      avatarCode: avatarCode
    });

  }

  componentDidUpdate(){
    this.refresh();
  }

   componentWillMount(nextProps) {
    console.log(this.props.url)
    if(this.props.url){
      this.setState({
        modelUrl:this.props.url+'&searchType='+this.props.user.userType,
        thumbnail:Utils.serverName+"search/picSearchGetThumbnail.shtml?picPath=" + this.props.url+'&searchType='+this.props.user.userType,
      })
    }
   }

  componentDidMount() {
    var self = this;
    $(function(){
      $('#dressUploadFile').fileupload({
        dataType: 'json',
        done: function (e, data) {
          console.log(data._response.result.msg)
          let modelUrl = '';
          let thumbnail = '';
            modelUrl =  data._response.result.msg;
            thumbnail = Utils.serverName+"search/picSearchGetThumbnail.shtml?picPath=" +data._response.result.msg;
          
          self.setState({
             modelUrl: modelUrl,
             thumbnail: thumbnail,
          });data._response
        }
      });

      self.refresh();
    });
  }

  downloadFile() {
        const url = this.urls
        if(url) {
            const aLink = this.refs.download
            aLink.download = "57lace.jpg"
            aLink.href = url
        }else {
            notification.error({
                content: '没有图片'
            })
        }
    }

  render() {
    return (
      <div className="dress-3d">
        <div className="container" style={{padding:0}}>
          <div className="row" style={{marginLeft:'-9px',marginRight:'-9px'}}>
            <div className="col-md-8 col-ms-6 col-xs-6" style={{paddingLeft:'9px', paddingRight:'9px'}}>
              <div className="left">
                <div className="top-title clearfix">
                  <span className="title">3D试衣</span>
                  <a className="dress-btn" href="javascript:;" ref='download'><img src={Utils.home + 'images/dress/save.jpg'} onClick={this.downloadFile}/></a> 
                </div>
                <div className="dress-content">
                  <div className="gallery-cropper-area">
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-ms-6 col-xs-6" style={{paddingLeft:'9px', paddingRight:'9px'}}>
              <div className="right">
                <div className="top">
                  <div className="top-title clearfix">
                    <span className="title">花型预览</span>
                    <a className="dress-btn">
                      <img src={Utils.home + 'images/dress/upload.jpg'}/>
                      <input id="dressUploadFile" type="file" name="files" accept="image/*" className="pick-pic-input" data-url={Utils.serverName + 'client/clientUpload.shtml'}/>
                    </a>
                  </div>
                  <div className="target">
                    <img className="dress-target-img" src={this.state.thumbnail}/>
                  </div>
                </div>
                <div className="bottom">
                  <Tabs defaultActiveKey={1} id="dressTabs" justified>
                    <Tab eventKey={1} title="选择模特"> 
                      <div className="dress-nav">
                        
                      </div>
                      <div className="nav-content">
                        {
                          dressModelData.modelItems.map((modelItem, index) => {
                            return (<DressModel active={this.state.avatarCode} modelItem={modelItem} onClick={this.changeAvatar} key={index}/>)    
                          })
                        }
                      </div>
                    </Tab>
                    <Tab eventKey={2} title="添加标签" disabled></Tab>
                    <Tab eventKey={3} title="立即下单" disabled></Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    url: state.getPic,
  }
}

export default connect(mapStateToProps)(Dress)