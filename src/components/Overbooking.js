let Utils = require('../utils/Utils');
require('styles/Overbooking.scss');

import React, { ReactDOM, PropTypes } from 'react';

import { Nav, NavItem, OverlayTrigger, Popover, 
  Modal, Overlay, ProgressBar,form, DropdownButton,MenuItem, Button } from 'react-bootstrap';
import { LOAD_OVERBOOKING_SUCCESS} from '../actions';
import { URL_LOAD_OVERBOOKING } from '../utils/URLs.js';
export default class Overbooking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showModalOver:false }
    this.close = this.close.bind(this);
    this.getOverBooking = this.getOverBooking.bind(this)
    this.flag = false;
  } 
  close(){
    this.setState({showModalOver:false})
  }

  getOverBooking(){
    this.flag = true;
    console.log("====user.js=",this.props.user)
    console.log("===this.user",this.props.pic)
    let buyNumbers = $(this.refs.buyNumber).val()
    let userInof = $(this.refs.info).val();
    if(!buyNumbers){
      alert("请填写数量")
    }
    if(!userInof){
      alert("请填写电话号码")
    }
    if(buyNumbers && userInof){
      this.props.ajaxRequest(URL_LOAD_OVERBOOKING,LOAD_OVERBOOKING_SUCCESS,{
        'mallOrder.picId':this.props.pic.id,
        'mallOrder.amount':buyNumbers,
        'mallOrder.module':'店铺查找',
        'mallOrder.linkInfo':userInof,
        'mallOrder.picUserType':this.props.user.userType,
         userId:0,
         userType:0,
      })
    }
  }
componentWillReceiveProps(nextProps){
    this.setState({showModalOver:nextProps.overModal})
    console.log("==========checkOver2",nextProps.checkOver)
    if(nextProps.checkOver == '成功' && this.flag){
      this.flag = false;
      this.setState({
        showModalOver:false,
      })
      alert("成功")
    }
  }


  render(){

    return (
      <Modal show={this.state.showModalOver} onHide={this.close}>
        <Modal.Body>
          <div>
            <span>填写采购数量</span>
          </div>
          <div>
            <p>采购数量:</p>
            <input type = "text" className = "form-control" ref = "buyNumber"/>
          </div>
          <div>
            <p>联系方式:</p>
            <input type = "text" className = "form-control" ref = "info"/>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.getOverBooking}>确定</Button>
          <Button onClick={this.close}>关闭</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


