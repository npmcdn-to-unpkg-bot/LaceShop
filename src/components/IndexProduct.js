require('styles/IndexProduct.scss');
import React from 'react';
import ContentTitle from './ContentTitle.js';
import ContentTitle2 from './ContentTitle2.js';
import IndexProductsItem from './IndexProductsItem.js';
import {URL_LOAD_USER} from '../utils/URLs.js';
import { connect } from 'react-redux';
import { ajaxRequest, getAdress ,LOAD_NOW_SUCCESS, LOAD_FINDHOT_SUCCESS, LOAD_BIGSIDE_SUCCESS, LOAD_SMALLSIDE_SUCCESS, LOAD_LINING_SUCCESS, LOAD_EYELASH_SUCCESS, LOAD_USER_SUCCESS } from '../actions';

export default class IndexProduct extends React.Component {

  constructor(props) {    
    super(props);
    this.state = {ourname:null};
    this.types = [];
  }


  componentWillMount(){

    const { indexName } =this.props.params;
    let indexNames = indexName;
    if(indexName){
      let index = indexName.indexOf('.');
      if(index > 0) {
        indexNames = indexName.substring(0, index);
      }
      this.state.ourname = indexNames
    }
    
    this.props.getAdress(this.state.ourname);
    this.props.ajaxRequest(URL_LOAD_USER, LOAD_USER_SUCCESS, {
      indexName: indexNames
    });
  }
  componentWillReceiveProps(nextProps){
    // console.log("==========this.props.nowPic===============",this.props.nowPic)
    // console.log("==========this.props.hotPic===============",this.props.hotPic)
    // console.log("==========this.props.liningPic===============",this.props.liningPic)
    // console.log("==========this.props.bigSidePic===============",this.props.bigSidePic)
    // console.log("==========this.props.smallSidePic===============",this.props.smallSidePic)
    // console.log("==========this.props.eyeslashPic===============",this.props.eyeslashPic)
    // if(this.props.nowPic.length){

    // }else if(){

    // }
  }
  goto(category){
    if(category == 1){
      window.location.href ='#linging'
    }else if(category == 2){
       window.location.href ='#bigSize'
    }else if(category == 3){
       window.location.href ='#smallSize'
    }else if(category == 4){
       window.location.href ='#eyeslash';
    }
    
  }

  render() {
  
  	return (
  		<div className="content">
  			<div className="container">
          <div className = "allAnchor">
            <button onClick={this.goto.bind(this,1)}>面料</button>
            <button onClick={this.goto.bind(this,2)}>大边</button>
            <button onClick={this.goto.bind(this,3)}>小边</button>
            <button onClick={this.goto.bind(this,4)}>睫毛</button>
          </div>
          <span className = "iconfont icon-zuixin fire" ></span>
  				<ContentTitle title="最近新增" className = "fireName" pics={this.props.nowPic}/>
  				<IndexProductsItem orderBy="1" category="0" pics={this.props.nowPic} user={this.props.user} successType ={LOAD_NOW_SUCCESS}/>
          <span className = "iconfont icon-redu news"></span>
          <ContentTitle title="店铺热搜" pics={this.props.hotPic}/>
          <IndexProductsItem user={this.props.user} pics={this.props.hotPic} orderBy="2" category="0" successType={LOAD_FINDHOT_SUCCESS}/>
          <a name = 'linging'></a>
          <ContentTitle2 title="面料" pics={this.props.liningPic}/>
          <IndexProductsItem user={this.props.user} pics={this.props.liningPic} orderBy="0" category="4" successType={LOAD_LINING_SUCCESS}/>
          <a name = 'bigSize'></a>
          <ContentTitle2 title="大边" pics={this.props.bigSidePic}/>
          <IndexProductsItem user={this.props.user} pics={this.props.bigSidePic} orderBy="0" category="2" successType={LOAD_BIGSIDE_SUCCESS} />
          <a name = 'smallSize'></a>
          <ContentTitle2 title="小边" pics={this.props.smallSidePic}/>
          <IndexProductsItem user={this.props.user} pics={this.props.smallSidePic} orderBy="0" category="1" successType={LOAD_SMALLSIDE_SUCCESS} />
          <a name = "eyeslash"></a>
          <ContentTitle2 title="睫毛" pics={this.props.eyeslashPic}/>
          <IndexProductsItem user={this.props.user} pics={this.props.eyeslashPic} orderBy="0" category="3" successType={LOAD_EYELASH_SUCCESS}/>
  			</div>
  		</div>
  	);
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    nowPic: state.nowPic,
    hotPic: state.hotPic,
    bigSidePic: state.bigSidePic,
    smallSidePic: state.smallSidePic,
    liningPic: state.liningPic,
    eyeslashPic: state.eyeslashPic
  }
}

export default connect(mapStateToProps, {
  ajaxRequest,
  getAdress
})(IndexProduct)