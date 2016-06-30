import fetch from 'isomorphic-fetch'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
let Utils = require('../utils/Utils');

function receivePosts(data) {
  if(!data){
    data = [];
  }
  return {
    type: RECEIVE_POSTS,
    postsByVenderPic: data
  }
}

export function fetchPosts() {
  var data = new FormData()
  data.append('category', 0)
  data.append('userId', 8574)

  return dispatch => {
    return fetch(Utils.home + '/pageIndexPicVender.shtml', {
        method: 'POST',
        body: data
      })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json.data)))
  }  
}