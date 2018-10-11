import {
	ADD_MEMBER,
	UPDATE_MEMBER,
	FETCH_MEMBERS_SUCCESS,
	UPDATE_TIMEOUT,
	JOIN_MEMBER
} from '../constants/ActionTypes';

const initialState = {
	member: undefined,
	members: [],
	currentMember: undefined,
	timeout: 2,
	currentTime: 0
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_MEMBER: 
			return {...state, members: [...state.members, action.member]}
		case UPDATE_MEMBER:
			return {...state, members: state.members.map(m => m.name === action.member.name ? action.member : m )}
		case FETCH_MEMBERS_SUCCESS:
			return {...state, members: action.members}
		case JOIN_MEMBER:
			return {...state, member: action.member}
		case UPDATE_TIMEOUT: 
			return {timeout: action.timeout}
		default:
      return state
	}
}

export default reducer