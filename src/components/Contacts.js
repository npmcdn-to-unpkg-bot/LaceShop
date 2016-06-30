require('normalize.css/normalize.css');
require('styles/Common.scss');
require('styles/Contacts.scss');

import React from 'react';
import Header from './Header.js'
import Footer from './Footer.js';

class Contacts extends React.Component {
  componentDidMount() {
    this.loand();
  } 

  loand() {
      var map = new BMap.Map("container");
      var localSearch = new BMap.LocalSearch(map);
      //此处添加地址通过cookie改为动态
      var address;
      var keyword = "广州";
          localSearch.setSearchCompleteCallback(function (searchResult) {
          address = searchResult.getPoi(0);
      var point = new BMap.Point(address.point.lng, address.point.lat); //默认中心点
      var marker = new BMap.Marker(point);
      /*
      var opts = {
          width: '100%',     // 信息窗口宽度  
          height: 300,     // 信息窗口高度  
          title: "经销商地址"  // 信息窗口标题  
      }
      var infoWindow = new BMap.InfoWindow("移动拖拽 标记经销商地址", opts);  // 创建信息窗口对象
      */
      marker.enableDragging(); //启用拖拽
      marker.addEventListener("dragend", function (e) {
          point = new BMap.Point(e.point.lng, e.point.lat); //标记坐标（拖拽以后的坐标）
          marker = new BMap.Marker(point);

          document.getElementByIdx_x("lng").value = e.point.lng;
          document.getElementByIdx_x("lat").value = e.point.lat;
          var infoWindow = new BMap.InfoWindow("当前位置<br />经度：" + e.point.lng + "<br />纬度：" + e.point.lat, opts);

          map.openInfoWindow(infoWindow, point);
      })

      map.addControl(new BMap.NavigationControl()); //左上角控件
      map.enableScrollWheelZoom(); //滚动放大
      map.enableKeyboard(); //键盘放大

      map.centerAndZoom(point, 13); //绘制地图
      map.addOverlay(marker); //标记地图

      //map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口      

      })
      localSearch.search(keyword);
  }

  render() {
    return (
      <div>
        <Header navActive="4"/>
        <div className="contact-content">
          <div className="container">
      			<div className="main_body" id = "contactWay">
      				<h1>联系方式</h1>
      				<div className = "differentiateLine" ></div>
      				<p>电 话：86 020 34494362</p>
      				<p>移动电话：登录后可见</p>
      				<p>传 真：86 020 34494097</p>
      				<p>地 址：中国 广东 广州市海珠区 广州市海珠区中大银岭广场二楼E439-E441</p>
      				<p>邮 编：518290</p>
      				<p>公司主页： ts57.lacewang.cn</p>
    			 	  <input id="lng" type="hidden" runat="server" />
       			 	<input id="lat" type="hidden" runat="server" />
       			 	<input id="Button1" type="hidden" value="标记图标"  runat="server" onclick="getbiaoji()" />
       			 	<div id="container"></div>
        		</div>
          </div>
    		</div>
        <Footer/>
      </div>
    );
  }
}

export default Contacts;