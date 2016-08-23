const debug = (process.env.NODE_ENV != 'production');
const remote = false;
const serverName = debug ? 'http://localhost:8999/57lacewang/' : '/';
const home = debug ? (remote ? '/tswq/' : '/') : '/';

function dress(event, that) {
  event = event || window.event;
  if(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue = false;
    }
  }
      
  var src = $(that).attr('data-src');
  if(!src){
    return;
  }
  var id = $(that).attr('data-id');   
  var searchType = $(that).attr('data-searchType');
  var url = home + 'pic/dress3dGalleryEx.shtml?url=' + src;
  if(id){
    url += '&id=' + id;
  }
  if(searchType){
    url += '&searchType=' + searchType;
  }
  
  var data = new Array();
  data.push({
      href : url ,
      type : 'text/html',
      title : ''
  });
  
  var gallery = blueimp.Gallery(data, {
     container: '#blueimp-gallery-dress', 
     index : 0,
     continuous: false
   });
}

//常量或通用函数工具类
module.exports = {
  home: home,
  debug: debug,
  remote: remote,
  serverName: serverName,
  dress: dress
};