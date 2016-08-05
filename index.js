//响应服务端返回的新增花型
export const LOAD_REQUEST = 'LOAD_REQUEST';
export const LOAD_FAILURE = 'LOAD_FAILURE';

export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_PIC_SUCCESS = 'LOAD_PIC_SUCCESS';
export const LOAD_TYPE_SUCCESS = 'LOAD_TYPE_SUCCESS';
export const LOAD_NOW_SUCCESS = 'LOAD_NOW_SUCCESS';
export const LOAD_FINDHOT_SUCCESS = 'LOAD_FINDHOT_SUCCESS';
export const LOAD_BIGSIDE_SUCCESS = 'LOAD_BIGSIDE_SUCCESS';
export const LOAD_SMALLSIDE_SUCCESS = 'LOAD_SMALLSIDE_SUCCESS';
export const LOAD_LINING_SUCCESS = 'LOAD_LINING_SUCCESS';
export const LOAD_EYELASH_SUCCESS = 'LOAD_EYELASH_SUCCESS';

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
    return dispatch(ajaxFetch(url, actionType, params, shouldCallAPI))
  }
}