import { combineReducers } from 'redux';
import {
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

function postsByVenderPic(state = [], action) {
  switch (action.type) {    
    case RECEIVE_POSTS:
      return action.postsByVenderPic;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByVenderPic
});

export default rootReducer;
