import React from 'react';

require('styles/IndexContentLeftItem.scss');

export default class IndexContentLeftItem extends React.Component {
  render() {
  	return (
      <div className="category">
        <div className="category-item-hd clearfix">
          <h4>产品分类</h4>
        </div>
        <div className="category-item">
          <ul className="clearfix">
            <li><a href="javascript:;" className="tips">贾卡压纱</a></li>
            <li><a href="javascript:;" className="tips">贾卡平板</a></li>
            <li><a href="javascript:;" className="tips">平板无贾卡</a></li>
            <li><a href="javascript:;" className="tips">链块压纱</a></li>
          </ul>
        </div>
      </div>
  	);
  }
}