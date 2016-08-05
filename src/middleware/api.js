import 'isomorphic-fetch'
let Utils = require('../utils/Utils');

let API_ROOT;
if (process.env.NODE_ENV === 'production') {
  API_ROOT = 'http://api.57lace.com/';
} else {
  API_ROOT = Utils.serverName;
}


function callApi(callAPI, params) { 
  var data = new FormData()
  if(params){
    for(let objName in params){
      data.append(objName,  params[objName]);
    }
  }  

  let fetchParams = {
    method: 'POST',
    body: data
  };

  return fetch(callAPI, fetchParams)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok || 1 == json.success) {
        return Promise.reject(json)
      }
      return json.data;
    })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const {
    types,
    callAPI,
    shouldCallAPI = () => true,
    payload = {}
  } = action;

  if (!types) {
    // 普通 action：传递
    return next(action);
  }

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callAPI !== 'string') {
    throw new Error('Expected fetch to be a string.');
  }

  if (!shouldCallAPI(store.getState())) {
    return;
  }

  const [requestType, successType, failureType] = types;

  next(Object.assign({}, payload, {
    type: requestType
  }));

  
  const url = API_ROOT + callAPI;

  return callApi(url, payload).then(
    response => next(Object.assign({}, payload, {
      response: response,
      type: successType
    })),
    error => next(Object.assign({}, payload, {
      error: error.message || 'Something bad happened',
      type: failureType
    }))
  );
}

