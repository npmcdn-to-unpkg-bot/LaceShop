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
    this.state={
      pagePics:[]
    }
    this.sessionId = null
    this.page = 1;
    this.control = false;
    this.pagePics = []
    this.nowPics =[]
    this.loadPic = this.loadPic.bind(this);
    this.addMore = this.addMore.bind(this);
  }

  loadPic(){
    if(this.props.user.userType == "1"){
      this.props.ajaxRequest(URL_LOAD_CLIENTPIC, LOAD_PIC_SUCCESS, {
        userId: this.props.user.userId,
        sessionId: this.sessionId ? this.sessionId : '',
        
      });
    }else if(this.props.user.userType == "2"){        
      this.props.ajaxRequest(URL_LOAD_VNEDERPIC, LOAD_PIC_SUCCESS, {
        userId: this.props.user.userId,
        sessionId: this.sessionId ? this.sessionId : '',
        
      });
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
    if(this.nowPics != nextProps.pics){
      this.pagePics =[];
      this.nowPics = nextProps.pics
    }
    if(nextProps.sessionId && !this.sessionId){
      this.sessionId = this.props.sessionId
      this.loadPic();
    }
    if(this.control){
      this.control =false;
      this.pagePics = this.pagePics.concat(this.props.pagePic)
    }

      

  }

  componentDidUpdate() {
    if(this.props.pics && this.props.pics.length > 0) {
      var $container = $('.masonry-container');
      if(this.page>1){
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
    this.control = true;
    this.page = this.page+1;

    if(this.props.user.userType == "1"){
      this.props.ajaxRequest(URL_LOAD_CLIENTPIC, LOAD_ADDMORE_SUCCESS, {
        userId: this.props.user.userId,
        sessionId: this.sessionId ? this.sessionId : '',
        page:this.page,
      });
    }else if(this.props.user.userType == "2"){        
      this.props.ajaxRequest(URL_LOAD_VNEDERPIC, LOAD_ADDMORE_SUCCESS, {
        userId: this.props.user.userId,
        sessionId: this.sessionId ? this.sessionId : '',
        page:this.page,
      });
    }
  }
  render() {
    let items = []
    if(this.props.pics.length >0){
      this.nowPics =this.props.pics;
      if(this.pagePics.length == 0){
        this.pagePics = this.nowPics;
      }
      console.log("=====================",this.pagePics.length)
      this.pagePics.map((pic, i) =>{               
        items.push(<PicIndex pic={pic} key={i} />);
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
    user: state.user,
    pics: state.userPic,
    sessionId:state.getSessionId,
    pagePic: state.insertMore,
    searchPics:state.searchStatus,
  }
}

export default connect(mapStateToProps, {
  ajaxRequest
})(SupplyProductsContent)