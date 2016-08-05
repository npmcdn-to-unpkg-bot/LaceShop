import React from 'react';
import { connect } from 'react-redux';
import { ajaxRequest, LOAD_TYPE_SUCCESS,LOAD_PIC_SUCCESS } from '../actions';
import { URL_LOAD_PICTYPE,URL_LOAD_CLIENTPIC,URL_LOAD_VNEDERPIC } from '../utils/URLs.js';

require('styles/supplyContentLeftItem.scss');

export default class supplyContentLeftItem extends React.Component {

  constructor(props){
    super(props);
    this.getTypeFlower = this.getTypeFlower.bind(this); 
  }

  componentWillMount(){
     this.props.ajaxRequest(URL_LOAD_PICTYPE, LOAD_TYPE_SUCCESS, {
          userId:this.props.user.userId,
        });
  }
  componentDidUpdate(){
   
    
  }

  getTypeFlower(event){
    let Type = this.props.user.userType;
    let categoryType = $(event.nativeEvent.target).text()
    let category = 0;
    if(categoryType == "面料"){
      category = 4;
    }else if(categoryType == "大边"){
      category = 2;
    }else if(categoryType == "小边"){
      category = 1;
    }else if(categoryType == "睫毛"){
      category = 3;
    }

    if(Type == 1){
      this.props.ajaxRequest(URL_LOAD_CLIENTPIC, LOAD_PIC_SUCCESS, {
          userId:this.props.user.userId,
          category:category
        });
    }else if(Type == 2){
      this.props.ajaxRequest(URL_LOAD_VNEDERPIC, LOAD_PIC_SUCCESS, {
          userId:this.props.user.userId,
          category:category
        });
    }
    
  }
  render() {
  	return (
      <div className="category">
        <div className="category-item-hd clearfix">
          <h4>产品分类</h4>
        </div>
        <div className="category-item">
          <ul className="clearfix">
            {this.props.picType.map((pic, i) =>                    
              <li><a href="javascript:;" key={i} className="tips" onClick={this.getTypeFlower}>{pic.categoryName}</a></li>
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
    picType:state.picType,
    pics: state.userPic,
  }
}

export default connect(mapStateToProps, {
  ajaxRequest
})(supplyContentLeftItem)