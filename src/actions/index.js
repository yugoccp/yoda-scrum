import { getMembers, subscribeMembers } from '../client';
import * as types from '../constants/ActionTypes'

export const addMember = member => ({ type: types.ADD_MEMBER, member })

export const updateMember = member => ({ type: types.UPDATE_MEMBER, member })

export const isFetchMembersLoading = isLoading => ({type: types.FETCH_MEMBERS_LOADING, isLoading})

export const fetchMembersSuccess = members => ({type: types.FETCH_MEMBERS_SUCCESS, members})

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

export function initMembersSubs() {
	return (dispatch, getState) => {
		subscribeMembers((err, respMembers) => {
			if (!err) {
				const { membersReducer } = getState();
				respMembers.forEach(member => 
					membersReducer.members.find(m => m.name === member.name) ?
					dispatch(updateMember(member)) :
					dispatch(addMember(member)))
			}
		});
	}
}
