import React from 'react';
import { connect } from 'react-redux';
import SupplyContentLeftItem from './supplyContentLeftItem.js';
import { ajaxRequest, LOAD_PIC_SUCCESS, LOAD_ADDMORE_SUCCESS} from '../actions'
import PicIndex from './PicIndex.js';
import { URL_LOAD_VNEDERPIC,URL_LOAD_CLIENTPIC } from '../utils/URLs.js';


require('styles/SupplyProductsContent.scss');

export default class SupplyProductsContent extends React.Component {
  constructor(props) {
    super(props);
    this.sessionId = null;
    this.srcName = null;
    this.page = 1;
    this.loadPic = this.loadPic.bind(this);
    this.addMore = this.addMore.bind(this);
  }

  loadPic(succType){
    let self = this;
    succType = succType || LOAD_PIC_SUCCESS;
    let genParams = (reduxState) => {
      return {
        userId: reduxState.user.userId,
        sessionId: self.sessionId ? self.sessionId : '',
        srcName: self.srcName ? self.srcName : '',
        page: self.page
      }
    }

    if(this.props.user.userType == "1"){
      this.props.ajaxRequest(URL_LOAD_CLIENTPIC, succType, genParams);
    }else if(this.props.user.userType == "2"){        
      this.props.ajaxRequest(URL_LOAD_VNEDERPIC, succType, genParams);
    }
  }

  componentWillMount(){
  	if(!this.props.pics || this.props.pics.length == 0 || !this.props.sessionId ) {    
      this.loadPic();
    }
  }

  componentDidMount(){
   if(this.props.pics && this.props.pics.length > 0) {
      var $container = $('.masonry-container');    
      $container.imagesLoaded( function () {
        $container.masonry({
          columnWidth: '.item',
          itemSelector: '.item'
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.sessionId && (!this.sessionId || nextProps.sessionId != this.sessionId))
      || (nextProps.srcName && !nextProps.srcNameHidden && (!this.srcName || nextProps.srcName != this.srcName))
      ){
      this.sessionId = nextProps.sessionId
      this.srcName = nextProps.srcName;
      this.loadPic();
    }
  }

  componentDidUpdate() {
    if(this.props.pics && this.props.pics.length > 0) {
      var $container = $('.masonry-container');
      if(this.page > 1){
        $container.masonry('destroy')
      } 

      $container.imagesLoaded( function () {
        $container.masonry({
          columnWidth: '.item',
          itemSelector: '.item'
        });
      });
    }
  }
  addMore(){
    this.page = this.page + 1;
    this.loadPic(LOAD_ADDMORE_SUCCESS);
  }
  render() {
    let items = []
    if(this.props.pics.length >0){
      this.props.pics.map((pic, i) =>{               
        items.push(<PicIndex pic={pic} key={i} {...this.props}/>);
      })
    }else{
      items.push(<p>查询无结果</p>)
    }

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
                  {
                    items
                  }
                </div>
                <div className = "morePic">
                  <button className = "btn btn-default" onClick = {this.addMore}>查看更多</button>
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
    pics: state.userPic,
    user: state.user,
    srcName: state.getSrc.srcName,
    sessionId: state.getSessionId,
    srcNameHidden: state.getSrc.srcNameHidden
    /*,
    pagePic: state.insertMore,
    searchPics:state.searchStatus,
    */
  }
}

export default connect(mapStateToProps, {
  ajaxRequest
})(SupplyProductsContent)