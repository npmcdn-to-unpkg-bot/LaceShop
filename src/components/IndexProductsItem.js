
import React from 'react';
import Pic from './Pic.js';
import { URL_LOAD_CLIENTPIC, URL_LOAD_VNEDERPIC } from '../utils/URLs.js';
import { ajaxRequest } from '../actions'
import { connect } from 'react-redux';

export default class IndexProductsItem extends React.Component {  
  constructor(props){
    super(props);

    this.userId = 0;
  }

  componentDidUpdate(){
    if(0 == this.userId){
      let { userId, userType } = this.props.user;
      this.userId = userId;
      let { orderBy, category, successType } = this.props;
      let limit = 12;//返回多少条

      if(userType == 1){
        this.props.ajaxRequest(URL_LOAD_CLIENTPIC, successType, {
          userId: this.props.user.userId,
          category: category,
          orderBy: orderBy,
          limit: limit
        });     
      }else if(userType == 2){
        this.props.ajaxRequest(URL_LOAD_VNEDERPIC, successType, {
          userId: this.props.user.userId,
          category: category,
          orderBy: orderBy,
          limit: limit
        });   
      }
    }
  }



  render() {
  	return (
  		<div className="index-item">
  			<div className="row my-row">
          {this.props.pics.map((pic, index) => {
              return <Pic pic={pic} key={index}/>
          })}          					
  			</div>
  		</div>
  	);
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    
  }
}

export default connect(mapStateToProps, {
  ajaxRequest
})(IndexProductsItem)