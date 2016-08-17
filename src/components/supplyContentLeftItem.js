import React from 'react';
import { connect } from 'react-redux';
import { ajaxRequest, getChangeType,getParame ,LOAD_PIC_SUCCESS, LOAD_CLIENTTYPE_SUCCESS, LOAD_VENDERTYPE_SUCCESS } from '../actions';
import { URL_LOAD_VENDERPICTYPE_VENDER, URL_LOAD_CLIENTPICTYPE_VENDER,
         URL_LOAD_CLIENTPIC, URL_LOAD_VNEDERPIC } from '../utils/URLs.js';

require('styles/supplyContentLeftItem.scss');

export default class supplyContentLeftItem extends React.Component {

  constructor(props){
    super(props);
    this.getTypeFlower = this.getTypeFlower.bind(this); 
    this.picType = [];
    this.state = {
      changeWhere:-1
    }
  }

  componentWillMount(){
    if(this.props.user.userType == 1){//档口
      this.props.ajaxRequest(URL_LOAD_CLIENTPICTYPE_VENDER, LOAD_CLIENTTYPE_SUCCESS, {
          userId:this.props.user.userId,
        });
    }else if(this.props.user.userType ==2){//产家
      this.props.ajaxRequest(URL_LOAD_VENDERPICTYPE_VENDER, LOAD_VENDERTYPE_SUCCESS, {
          userId:this.props.user.userId,
        });
    }
  }

  getTypeFlower(f,event){
    let Type = this.props.user.userType;
    let categoryType = $(event.nativeEvent.target).text()
    let category = 0;
    let subCategory =0;
    this.props.getParame(null)
    this.props.getChangeType(f);
    this.picType.map((pic,i) =>{
      if(categoryType == pic.categoryName){
        if(pic.categoryType == 1){
          category = pic.id;
          subCategory = 0;
        }else if(pic.categoryType ==2){
          category = 0;
          subCategory = pic.id;
        }
      }
    })

    if(Type == 1){
      this.props.ajaxRequest(URL_LOAD_CLIENTPIC, LOAD_PIC_SUCCESS, {
          userId:this.props.user.userId,
          category:category,
          subCategory : subCategory
        });
    }else if(Type == 2){
      this.props.ajaxRequest(URL_LOAD_VNEDERPIC, LOAD_PIC_SUCCESS, {
          userId:this.props.user.userId,
          category:category,
          subCategory:subCategory
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        changeWhere: nextProps.changType,
        percent: -1
      })

  }

  render() {
   
    if(this.props.picClientType.length>0){

      this.picType = this.props.picClientType
    }else if(this.props.picVenderType.length>0){
      this.picType = this.props.picVenderType
    }
  	return (
      <div className="category">
        <div className="category-item-hd clearfix">
          <h4>产品分类</h4>
        </div>
        <div className="category-item">
          <ul className="clearfix" activeKey={this.state.changeWhere}>
            {this.picType.map((pic, i) =>

              <li key={'subCategory' + i} className={i == this.props.changType ? ' onChanges' : ''}><a href="javascript:;"  className="tips" onClick={this.getTypeFlower.bind(this,i)}>{pic.categoryName}</a></li>
            )} 
          </ul>
        </div>
      </div>
  	);
  }
}
function mapStateToProps(state, ownProps) {
  return { 
    user: state.user,
    picClientType : state.picClientType,
    picVenderType : state.picVenderType,
    pics: state.userPic,
    changType: state.getChanges
  }
}

export default connect(mapStateToProps, {
  ajaxRequest,
  getChangeType,
  getParame,
})(supplyContentLeftItem)