import React from 'React';

export default class Footer extends React.Component {
	render (){
		return (
			<div className="footer" style={{marginTop:'10px',textAlign:'center',fontSize:'12px', boxShadow: '0 -3px 0 1px #ddd', 'borderTop': '1px solid #38f'}}>
				<p className="text-mute" style={{margin: '20px 0'}}>
					©福建省长乐市坐视布管网络科技有限公司　
					<a style={{color:'#777'}} target="_blank" href="http://www.miitbeian.gov.cn/">闽ICP备14005607号-4</a>
				</p>
			</div>
		);
	}
}