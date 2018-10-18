import * as types from '../constants/ActionTypes';

const initialState = {
	username: undefined,
	members: [],
	timer: 0,
	dsmData: {},
	isDsmDataLoading: false,
	isMembersLoading: false,
	meetingStatus: undefined,
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.JOIN_SUCCESS:
			return {...state, username: action.username}
		case types.UPDATE_TIMER:
			return {...state, timer: action.timer}
		case types.FETCH_MEMBERS_SUCCESS:
			return {...state, members: action.members}
		case types.MEETING_STATUS_SUCCESS:
			return {...state, meetingStatus: action.meetingStatus}
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