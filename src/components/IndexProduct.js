import React from 'react';
import ContentTitle from './ContentTitle.js';
import IndexProductsItem from './IndexProductsItem.js';
import {URL_LOAD_USER} from '../utils/URLs.js';
import { connect } from 'react-redux';
import { ajaxRequest, LOAD_NOW_SUCCESS, LOAD_FINDHOT_SUCCESS, LOAD_BIGSIDE_SUCCESS, LOAD_SMALLSIDE_SUCCESS, LOAD_LINING_SUCCESS, LOAD_EYELASH_SUCCESS, LOAD_USER_SUCCESS } from '../actions';

export default class IndexProduct extends React.Component {
  componentWillMount(){
   const { indexName } =this.props.params;
    this.props.ajaxRequest(URL_LOAD_USER, LOAD_USER_SUCCESS, {
      indexName: indexName
    });
  }



  render() {
    
  	return (
  		<div className="content">
  			<div className="container">
  				<ContentTitle title="最近新增"/>
  				<IndexProductsItem orderBy="1" category="0" pics={this.props.nowPic} user={this.props.user} successType ={LOAD_NOW_SUCCESS}/>
          <ContentTitle title="店铺热搜"/>
          <IndexProductsItem user={this.props.user} pics={this.props.hotPic} orderBy="2" category="0" successType={LOAD_FINDHOT_SUCCESS}/>
          <ContentTitle title="面料" />
          <IndexProductsItem user={this.props.user} pics={this.props.liningPic} orderBy="0" category="4" successType={LOAD_LINING_SUCCESS}/>
          <ContentTitle title="大边"/>
          <IndexProductsItem user={this.props.user} pics={this.props.bigSidePic} orderBy="0" category="2" successType={LOAD_BIGSIDE_SUCCESS} />
          <ContentTitle title="小边"/>
          <IndexProductsItem user={this.props.user} pics={this.props.smallSidePic} orderBy="0" category="1" successType={LOAD_SMALLSIDE_SUCCESS} />
          <ContentTitle title="睫毛"/>
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
  ajaxRequest
})(IndexProduct)