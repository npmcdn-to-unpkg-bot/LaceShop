import React from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import SupplyContentLeftItem from './supplyContentLeftItem.js';
import { ajaxRequest, LOAD_PIC_SUCCESS } from '../actions'
import PicIndex from './PicIndex.js';
import { URL_LOAD_VNEDERPIC,URL_LOAD_CLIENTPIC } from '../utils/URLs.js';

require('styles/SupplyProductsContent.scss');

export default class SupplyProductsContent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
  	if(this.props.pics && this.props.pics.length > 0) {
      setTimeout(()=>{
        var $container = $('.masonry-container');    
        $container.imagesLoaded( function () {
          $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item'
          });
        });
      }, 500)
    } else {
      if(this.props.user.userType == "1"){
        this.props.ajaxRequest(URL_LOAD_CLIENTPIC, LOAD_PIC_SUCCESS, {
          userId:this.props.user.userId
        });
      }else if(this.props.user.userType == "2"){
        this.props.ajaxRequest(URL_LOAD_VNEDERPIC, LOAD_PIC_SUCCESS, {
          userId:this.props.user.userId
        });
      }else {
     
      }
    }
  }


  render() {
  	return (
  		<div className="content index-content">
  			<div className="container index-container">
          <div className="row my-row">
            <div className="col-md-2 my-col hidden-sm">
              <div className="category-list">
               <SupplyContentLeftItem/>
              </div>
            </div>
            <div className="col-md-10 my-col">
              <div className="index-content-pic-list">                
                <div className="row my-row masonry-container">
                    {this.props.pics.map((pic, i) =>                    
                      <PicIndex pic={pic} key={i}/>
                    )}                                   
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
    pics: state.userPic
  }
}

export default connect(mapStateToProps, {
  ajaxRequest
})(SupplyProductsContent)