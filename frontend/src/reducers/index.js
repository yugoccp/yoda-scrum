import * as types from '../constants/ActionTypes';

const initialState = {
	username: undefined,
	members: [],
	currentMemberIndex: -1,
	timer: 0,
	dsmData: {},
	isDsmDataLoading: false,
	isMembersLoading: false,
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.JOIN_SUCCESS:
			return {...state, username: action.username}
		case types.UPDATE_TIMER:
			return {...state, timer: action.timer}
		case types.CURRENT_MEMBER_INDEX_SUCCESS:
			return {...state, currentMemberIndex: action.index}
		case types.FETCH_MEMBERS_SUCCESS:
			return {...state, members: action.members}
		case types.FETCH_MEMBERS_LOADING:
			return {...state, isMembersLoading: action.isLoading}
		case types.FETCH_DSM_DATA_SUCCESS:
			return {...state, dsmData: action.dsmData}
		case types.FETCH_DSM_DATA_LOADING:
			return {...state, isDsmDataLoading: action.isLoading}
		default:
      return state
	}
}

export default reducer