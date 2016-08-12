import { combineReducers } from 'redux';
import { LOAD_USER_SUCCESS, LOAD_PIC_SUCCESS , 
	LOAD_TYPE_SUCCESS, LOAD_GETTYPE_SUCCESS, 
	LOAD_NOW_SUCCESS, LOAD_FINDHOT_SUCCESS, 
	LOAD_BIGSIDE_SUCCESS, LOAD_SMALLSIDE_SUCCESS, 
	LOAD_LINING_SUCCESS, LOAD_EYELASH_SUCCESS,
	ADD_REG_USER_SUCCESS,LOAD_USERLOGIN_SUCCESS,
	LOAD_SEARCH_SUCCESS, LOAD_SEARCH_PERCENT_SUCCESS,
	CHANGE_SUCCESS,GETPARAME_SUCCESS,
	LOAD_CLIENTTYPE_SUCCESS, LOAD_VENDERTYPE_SUCCESS,
	LOAD_VENDER_SUCCESS,GETADDRESS_SUCCESS,
	LOAD_CONTENT_SUCCESS,CHANGE_WHERE_SUCCESS} from '../actions'

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
			if(action.response){
				return action.response;
			}
		    return [];
		default:
			return state;
	}
}

function picClientType(state=[], action){
	switch(action.type){
		case LOAD_CLIENTTYPE_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function picVenderType(state=[], action){
	switch(action.type){
		case LOAD_VENDERTYPE_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function nowPic(state=[], action){
	switch(action.type){
		case LOAD_NOW_SUCCESS:
			if(action.response){
				return action.response;
			}
		   		return []
		default:
			return state;
	}
}

function hotPic(state=[], action){
	switch(action.type){
		case LOAD_FINDHOT_SUCCESS:
		    if(action.response){
				return action.response;
			}
		   		return []
		default:
			return state;
	}
}

function bigSidePic(state=[], action){
	switch(action.type){
		case LOAD_BIGSIDE_SUCCESS:
		    if(action.response){
				return action.response;
			}
		   		return []
		default:
			return state;
	}
}

function smallSidePic(state=[], action){
	switch(action.type){
		case LOAD_SMALLSIDE_SUCCESS:
		    if(action.response){
				return action.response;
			}
		   		return []
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
		    if(action.response){
				return action.response;
			}
		   		return []
		default:
			return state;
	}
}
function adduser(state=[],action){
	switch(action.type){
		case ADD_REG_USER_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}	

function tologin(state=[],action){
	switch(action.type){
		case LOAD_USERLOGIN_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function searchStatus(state = -1, action){
	switch(action.type){
		case LOAD_SEARCH_SUCCESS:
			if(!action.response){
				return 0;
			}
		    return action.response;
		case LOAD_SEARCH_PERCENT_SUCCESS:
			return parseInt(action.response.percent);
		default:
			return state;
	}
}

let responseSessionId = (state = '', action) => {
	switch(action.type){
		case LOAD_SEARCH_PERCENT_SUCCESS:
			return action.response.sessionId;
		default:
			return state;
	}
}

function headerActiveNav(state=0,action){
	switch(action.type){
		case CHANGE_SUCCESS:
		    return action.navIndex;
		default:
			return state;
	}
}

function getSessionId(state=null,action){
	switch(action.type){
		case GETPARAME_SUCCESS:
		    return action.sessionId;
		default:
			return state;
	}
}

function getVenderInfo(state=null,action){
	switch(action.type){
		case LOAD_VENDER_SUCCESS:
		    return action.response;
		default:
			return state;
	}
}

function getAddress(state=null,action){
	switch(action.type){
		case GETADDRESS_SUCCESS:
		console.log(action.address)
		    return action.address;
		default:
			return state;
	}
}

function getChanges(state=-1,action){
	console.log("==================================action.type===========================",action.type)
	switch(action.type){
		case CHANGE_WHERE_SUCCESS:
		console.log("==============action.changeType==============================",action.changeType)
		    return action.changeType;
		default:
			return state;
	}
}

function uploadContext(state=null,action){
	switch(action.type){
		case LOAD_CONTENT_SUCCESS:

		    return 1;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
   user : user,
   userPic : userPic,
   nowPic,
   hotPic,
   bigSidePic,
   smallSidePic,
   liningPic,
   eyeslashPic,
   searchStatus,
   headerActiveNav,
   getSessionId,
   responseSessionId,
   picClientType,
   picVenderType,
   getVenderInfo,
   getAddress,
   uploadContext,
   getChanges,
});

export default rootReducer;
