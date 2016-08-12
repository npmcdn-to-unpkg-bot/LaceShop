require('styles/index/IndexProductsItem.scss');

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

  componentWillReceiveProps(nextProps){
      console.log("=========================user=========================",this.props.user)
    if(0 == this.userId){
      let { userId, userType } = nextProps.user;
      this.userId = userId;
      let { orderBy, category, successType } = nextProps;
      let limit = 12;//返回多少条

      if(userType == 1){
        nextProps.ajaxRequest(URL_LOAD_CLIENTPIC, successType, {
          userId: userId,
          category: category,
          orderBy: orderBy,
          limit: limit
        });     
      }else if(userType == 2){
        nextProps.ajaxRequest(URL_LOAD_VNEDERPIC, successType, {
          userId: userId,
          category: category,
          orderBy: orderBy,
          limit: limit
        });   
      }
    }

    if(nextProps.pics && nextProps.pics.length > 0) {
      let indexNameNode = this.refs.indexItem;
 
      $(indexNameNode).imagesLoaded( function () {
        let minHeight = -1;
        let height = 0; 
        $(indexNameNode).find('.thumbnail>a').each((index, dom) => {
          height = $(dom).height();                  
          if(height > 0 && (height < minHeight || -1 == minHeight)){
            minHeight = height;
          }          
        })  

        $(indexNameNode).find('.thumbnail>a').each((index, dom) => {
          $(dom).height(minHeight);
          $(dom).find('img').css('margin-top', - (($(dom).find('img').height() - minHeight) / 2) + 'px');             
        })     
      });
    }
  }

  componentDidMount(){
     let indexNameNode = this.refs.indexItem;
      $(indexNameNode).imagesLoaded( function () {
        let minHeight = -1;
        let height = 0; 
        $(indexNameNode).find('.thumbnail>a').each((index, dom) => {
          height = $(dom).height();                  
          if(height > 0 && (height < minHeight || -1 == minHeight)){
            minHeight = height;
          }          
        })  

        $(indexNameNode).find('.thumbnail>a').each((index, dom) => {
          $(dom).height(minHeight);
          $(dom).find('img').css('margin-top', - (($(dom).find('img').height() - minHeight) / 2) + 'px');             
        })     
      });
  }

  render() {
  	return (
  		<div ref="indexItem" className="index-item">
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