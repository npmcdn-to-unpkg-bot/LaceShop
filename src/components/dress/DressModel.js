import React from 'react';

let Utils = require('../../utils/Utils');
require('styles/dress/DressModel.scss');

export default class DressModel extends React.Component {
  render() {
    return (
  		<div className="dress-model">
  			<h4 id="modelTitleRec" className="model-title"><span>{this.props.modelItem.name}</span></h4>
			<div className="row my-row">
				{
					this.props.modelItem.models.map((model, index) => {
						let thumbClassName = 'thumbnail';
						if(model.avatarCode == this.props.active) {
							thumbClassName += ' active';
						}

						return (
							<div className="col-xs-3 my-col" key={index}>
								<div className={thumbClassName}>
									<a href="javascript:;" className="model-link" onClick={() => this.props.onClick(model.avatarCode)}>
										<img src={Utils.home + model.imgUrl} alt="模特"/>
									</a>
								</div>
							</div>
						)
					})	
				}
			</div>
  		</div>
    );
  }
}