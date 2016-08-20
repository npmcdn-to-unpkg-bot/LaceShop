//响应服务端返回的新增花型
export const LOAD_REQUEST = 'LOAD_REQUEST';
export const LOAD_FAILURE = 'LOAD_FAILURE';

export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_PIC_SUCCESS = 'LOAD_PIC_SUCCESS';
export const LOAD_CLIENTTYPE_SUCCESS = 'LOAD_CLIENTTYPE_SUCCESS';
export const LOAD_VENDERTYPE_SUCCESS = 'LOAD_VENDERTYPE_SUCCESS';
export const LOAD_NOW_SUCCESS = 'LOAD_NOW_SUCCESS';
export const LOAD_FINDHOT_SUCCESS = 'LOAD_FINDHOT_SUCCESS';
export const LOAD_BIGSIDE_SUCCESS = 'LOAD_BIGSIDE_SUCCESS';
export const LOAD_SMALLSIDE_SUCCESS = 'LOAD_SMALLSIDE_SUCCESS';
export const LOAD_LINING_SUCCESS = 'LOAD_LINING_SUCCESS';
export const LOAD_EYELASH_SUCCESS = 'LOAD_EYELASH_SUCCESS';
export const ADD_REG_USER_SUCCESS = 'ADD_REG_USER_SUCCESS';
export const LOAD_USERLOGIN_SUCCESS = 'LOAD_USERLOGIN_SUCCESS';
export const LOAD_SEARCH_SUCCESS = 'LOAD_SEARCH_SUCCESS';
export const LOAD_SEARCH_PERCENT_SUCCESS = 'LOAD_SEARCH_PERCENT_SUCCESS';
export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';
export const GETPARAME_SUCCESS = 'GETPARAME_SUCCESS';
export const LOAD_VENDER_SUCCESS = 'LOAD_VENDER_SUCCESS';
export const GETADDRESS_SUCCESS = 'GETADDRESS_SUCCESS';
export const LOAD_CONTENT_SUCCESS = 'LOAD_CONTENT_SUCCESS';
export const CHANGE_WHERE_SUCCESS = 'CHANGE_WHERE_SUCCESS';
export const LOAD_ADDMORE_SUCCESS = 'LOAD_ADDMORE_SUCCESS';
export const LOAD_CAPTCHA_SUCCESS = 'LOAD_CAPTCHA_SUCCESS';//验证码
export const LOAD_ADDUSER_SUCCESS = 'LOAD_ADDUSER_SUCCESS';
export const LOAD_SEARCHBYCODE_SUCCESS = 'LOAD_SEARCHBYCODE_SUCCESS';
export const LOAD_OVERBOOKING_SUCCESS = 'LOAD_OVERBOOKING_SUCCESS';

 
function ajaxFetch(url, actionType, params, shouldCallAPI) {
  let types = [LOAD_REQUEST, '', LOAD_FAILURE];
  if(actionType){
    types[1] = actionType;
  }
  
  return {
    // 要在之前和之后发送的 action types
    types: types,
    // 检查缓存 (可选):
    shouldCallAPI: (state) => {
      if(shouldCallAPI) {
        return shouldCallAPI(state);
      }
      return true
    },
    // 调用URL：
    callAPI: url,
    // 在 actions 的开始和结束注入的参数
    payload: params || {}
  };
}

export function ajaxRequest(url, actionType, params, shouldCallAPI) {
  return (dispatch, getState) => {
    if(typeof params == 'function'){
      var state = getState();
      params = params.call(state, state);
    }
    return dispatch(ajaxFetch(url, actionType, params, shouldCallAPI))
  }
}
export function changHandle(navIndex){
  return (dispatch, getState) => {
    return dispatch({
      type: CHANGE_SUCCESS,
      navIndex: navIndex
    })
  }
}
export function getParame(sessionId){
  return (dispatch, getState) => {
    return dispatch({
      type: GETPARAME_SUCCESS,
      sessionId: sessionId
    })
  }
}
export function getAdress(address){
  return (dispatch, getState) => {
    return dispatch({
      type: GETADDRESS_SUCCESS,
      address: address
    })
  }
}
export function getChangeType(changeType){
  return (dispatch, getState) => {
    return dispatch({
      type: CHANGE_WHERE_SUCCESS,
      changeType: changeType
    })
  }
}
export function getSrcName(srcName){
  return (dispatch, getState) => {
    return dispatch({
      type: LOAD_SEARCHBYCODE_SUCCESS,
      srcName: srcName
    })
  }
}