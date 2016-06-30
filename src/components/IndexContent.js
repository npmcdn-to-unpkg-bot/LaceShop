import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import IndexContentLeftItem from './IndexContentLeftItem.js';
import PicIndex from './PicIndex.js';

require('styles/IndexContent.scss');

export default class IndexContent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
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
    }
  }

  render() {
  	return (
  		<div className="content index-content">
        <div className="index-nav">
          <div className="container index-nav-container">
            <div className="row my-row">
              <div className="col-md-2 my-col hidden-sm"></div>
              <div className="col-md-10 my-col">
                <Nav bsStyle="pills" activeKey={"1"}>
                  <NavItem className="nav-item" eventKey={"1"} href="/">全部</NavItem>
                  <NavItem className="nav-item" eventKey={"2"} href="">面料</NavItem>
                  <NavItem className="nav-item" eventKey={"3"}>大边</NavItem>
                  <NavItem className="nav-item" eventKey={"4"}>小边</NavItem>
                  <NavItem className="nav-item" eventKey={"5"}>睫毛</NavItem>
                </Nav>
              </div>
            </div>
          </div>
        </div> 
             
  			<div className="container index-container">
          <div className="row my-row">
            <div className="col-md-2 my-col hidden-sm">
              <div className="category-list">
                <IndexContentLeftItem/>
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