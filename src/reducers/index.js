import {
	FETCH_MEMBERS_SUCCESS,
	UPDATE_TIMER,
	CURRENT_MEMBER_INDEX_SUCCESS,
	JOIN_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
	username: undefined,
	members: [],
	currentMemberIndex: undefined,
	timer: 0
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case JOIN_SUCCESS:
			return {...state, username: action.username}
		case UPDATE_TIMER:
			return {...state, timer: action.timer}
		case CURRENT_MEMBER_INDEX_SUCCESS:
			return {...state, currentMemberIndex: action.index}
		case FETCH_MEMBERS_SUCCESS:
			return {...state, members: action.members}
		default:
      return state
	}
}

export default reducer