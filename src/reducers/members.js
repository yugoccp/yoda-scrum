import {
	ADD_MEMBER,
	UPDATE_MEMBER,
	FETCH_MEMBERS_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
	members: [],
	currentMember: undefined
}

const members = (state = initialState, action) => {
	switch(action.type) {
		case ADD_MEMBER: 
			return {...state, members: [...state.members, action.member]}
		case UPDATE_MEMBER:
			return {...state, members: state.members.map(m => m.name === action.member.name ? action.member : m )}
		case FETCH_MEMBERS_SUCCESS:
				return {...state, members: action.members}
		default:
      return state
	}
}

export default members