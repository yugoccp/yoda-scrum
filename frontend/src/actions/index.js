import {
	subscribe,
	getMembers,
	getDsmData,
	startDsm,
	joinDsm,
	removeMember,
	nextMember } from '../client';
import * as wsTypes from '../constants/WsTypes'
import * as types from '../constants/ActionTypes'

export const joinSuccess = username => ({ type: types.JOIN_SUCCESS, username })

export const updateTimer = timer => ({ type: types.UPDATE_TIMER, timer })

export const updateUsername = username => ({type: types.UPDATE_USERNAME, username})

export const isFetchMembersLoading = isLoading => ({type: types.FETCH_MEMBERS_LOADING, isLoading})

export const fetchMembersSuccess = members => ({type: types.FETCH_MEMBERS_SUCCESS, members})

export const isFetchDsmDataLoading = isLoading => ({type: types.FETCH_DSM_DATA_LOADING, isLoading})

export const fetchDsmDataSuccess = dsmData => ({type: types.FETCH_DSM_DATA_SUCCESS, dsmData})

export const meetingStatusSuccess = meetingStatus => ({type: types.MEETING_STATUS_SUCCESS, meetingStatus})

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
			console.log('dsm started!');
		})
	}
}

export function next(timeInMs) {
	return dispatch => {
		nextMember(timeInMs).then(() => {
			console.log('go to next');
		})
	}
}

export function remove(name) {
	return dispatch => {
		removeMember(name).then(() => {
			console.log(`${name} removed!`);
		})
	}
}
export function fetchDsmData() {
	return dispatch => {
		dispatch(isFetchDsmDataLoading(true));
		getDsmData()
		.then(response => {
			dispatch(fetchDsmDataSuccess(response.data));
			dispatch(isFetchDsmDataLoading(false));
		})
		.catch(err => console.log(err));
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
	return dispatch => {
		subscribe(wsTypes.MEMBERS, members => dispatch(fetchMembersSuccess(members)));
		subscribe(wsTypes.MEETING_STATUS, meetingStatus => dispatch(meetingStatusSuccess(meetingStatus)));
	}
}
