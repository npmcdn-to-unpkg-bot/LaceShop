import { combineReducers } from 'redux';
import { LOAD_USER_SUCCESS, LOAD_PIC_SUCCESS , 
	LOAD_TYPE_SUCCESS, LOAD_GETTYPE_SUCCESS, 
	LOAD_NOW_SUCCESS, LOAD_FINDHOT_SUCCESS, 
	LOAD_BIGSIDE_SUCCESS, LOAD_SMALLSIDE_SUCCESS, 
	LOAD_LINING_SUCCESS, LOAD_EYELASH_SUCCESS } from '../actions'

function user(state = {}, action) {
  switch (action.type) {    
    case LOAD_USER_SUCCESS:        
      return action.response;
    default:
      return state;
  }
}

function userPic(state=[], action){
	switch(action.type){
		case LOAD_PIC_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function picType(state=[], action){
	switch(action.type){
		case LOAD_TYPE_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function nowPic(state=[], action){
	switch(action.type){
		case LOAD_NOW_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function hotPic(state=[], action){
	switch(action.type){
		case LOAD_FINDHOT_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function bigSidePic(state=[], action){
	switch(action.type){
		case LOAD_BIGSIDE_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function smallSidePic(state=[], action){
	switch(action.type){
		case LOAD_SMALLSIDE_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function liningPic(state=[], action){
	switch(action.type){
		case LOAD_LINING_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function eyeslashPic(state=[], action){
	switch(action.type){
		case LOAD_EYELASH_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
   user : user,
   userPic : userPic,
   picType : picType,
   nowPic,
   hotPic,
   bigSidePic,
   smallSidePic,
   liningPic,
   eyeslashPic
});

export default rootReducer;
