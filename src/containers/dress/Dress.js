let Utils = require('../../utils/Utils');
require('styles/dress/Dress.scss');


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Nav, NavItem } from 'react-bootstrap';
import DressModel from '../../components/dress/DressModel.js';
import {dressModelData} from '../../sources/DressModelData.js';

const loadingImg = Utils.home + 'images/holder.gif';
const dressUrl = 'http://www.lacewang.cn/pic/dress3dEx.shtml' 

export default class Dress extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);

    this.state = {
      modelUrl: 'D%3A%5C%E5%9B%BE%E5%BA%93%5C%E5%8E%82%E5%AE%B6%E5%9B%BE%E5%BA%93%5C%E9%87%91%E9%91%AB_8769%5C%E9%9D%A2%E6%96%99%5C8769_603339.jpeg',
      thumbnail: 'http://www.lacewang.cn/search/picSearchGetThumbnail.shtml?picPath=D%3A%5C%E5%9B%BE%E5%BA%93%5C%E5%8E%82%E5%AE%B6%E5%9B%BE%E5%BA%93%5C%E9%87%91%E9%91%AB_8769%5C%E9%9D%A2%E6%96%99%5C8769_603339.jpeg',
      avatarCode: 112
    }
  }  

  refresh() {
    if(!this.state.modelUrl || !this.state.avatarCode){
      return;
    }

    let img = new Image();
    let loadImg = new Image();
    let wrapperGallery = $('.gallery-cropper-area');
    
    loadImg.src = loadingImg;
    wrapperGallery.empty();
    wrapperGallery[0].appendChild(loadImg);
    
    img.src = dressUrl + '?url=' + this.state.modelUrl + "&avatarCode=" + this.state.avatarCode;
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

  componentDidMount() {
    var self = this;
    $(function(){
      $('#dressUploadFile').fileupload({
        dataType: 'json',
        done: function (e, data) {
          let modelUrl = encodeURI('D:\\图库\\上传备份\\') +  data.result.data.filename;
          let thumbnail = data.result.data.url;
          self.setState({
             modelUrl: modelUrl,
             thumbnail: thumbnail,
          });
        }
      });

      self.refresh();
    });
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
                  <a className="dress-btn" href="javascript:;"><img src={Utils.home + 'images/dress/save.jpg'} /></a> 
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
                      <input id="dressUploadFile" type="file" name="files" accept="image/*" className="pick-pic-input" data-url={'http://112.124.43.218:8080/lacewang/pic/picUpload'}/>
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

Dress.propTypes = {
  
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps)(Dress)