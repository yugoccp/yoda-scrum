import { 
	getMembers, 
	subscribeTimer, 
	subscribeMembers, 
	subscribeCurrentMemberIndex, 
	startDsm, 
	joinDsm, 
	nextMember } from '../client';
import * as types from '../constants/ActionTypes'

export const joinSuccess = username => ({ type: types.JOIN_SUCCESS, username })

export const currentMemberIndexSuccess = index => ({ type: types.CURRENT_MEMBER_INDEX_SUCCESS, index })

export const updateTimer = timer => ({ type: types.UPDATE_TIMER, timer })

export const updateUsername = username => ({type: types.UPDATE_USERNAME, username})

export const isFetchMembersLoading = isLoading => ({type: types.FETCH_MEMBERS_LOADING, isLoading})

export const fetchMembersSuccess = members => ({type: types.FETCH_MEMBERS_SUCCESS, members})

export function join(name) {
	return dispatch => {
		return joinDsm(name).then(response => {
			dispatch(joinSuccess(name));
		})
	}
}

export function start() {
	return dispatch => {
		startDsm().then(() => {
			console.log('dsm started!')
		})
	}
}

export function next() {
	return dispatch => {
		nextMember()
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
		subscribeCurrentMemberIndex((err, index) => {
			console.log('subscribeCurrentMemberIndex success')
			if (!err) {
				dispatch(currentMemberIndexSuccess(index));
			}
		});
		subscribeTimer((err, timer) => {
			if (!err) {
				dispatch(updateTimer(timer));
			}
		})
	}
}
