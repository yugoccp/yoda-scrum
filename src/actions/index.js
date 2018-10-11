import { getMembers, subscribeMembers, startDsm } from '../client';
import * as types from '../constants/ActionTypes'

export const addMember = member => ({ type: types.ADD_MEMBER, member })

export const updateMember = member => ({ type: types.UPDATE_MEMBER, member })

export const isFetchMembersLoading = isLoading => ({type: types.FETCH_MEMBERS_LOADING, isLoading})

export const fetchMembersSuccess = members => ({type: types.FETCH_MEMBERS_SUCCESS, members})

export function joinMember(member) {
	return dispatch => {
		dispatch({ type: types.JOIN_MEMBER, member })
	}
}

export function startMeeting() {
	return dispatch => {
		startDsm().then(response => {
			dispatch({ type: types.START_MEETING_SUCCESS, success: true });
		});
	}
}

export function fetchMembers() {
		return dispatch => {
			dispatch(isFetchMembersLoading(true));
			getMembers()
			.then(response => {
				dispatch(fetchMembersSuccess(response.data));
				dispatch(isFetchMembersLoading(false));
			})
			.catch(err => console.log(err));
		}
}

export function initSubscriptions() {
	return (dispatch, getState) => {
		subscribeMembers((err, members) => {
			if (!err) {
				dispatch(fetchMembersSuccess(members));
			}
		});

		subscribeCurrentMember(() => {

		});
	}
}
