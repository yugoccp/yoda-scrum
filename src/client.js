import axios from 'axios';
import io from 'socket.io-client';
const apiServer = '/api';
const socket = io();

export function startDsm() {
	return axios.get(`${apiServer}/dsm/start`);
}

export function joinDsm(name) {
	return axios.get(`${apiServer}/dsm/join?name=${name}`);
}

export function getMembers() {
	return axios.get(`${apiServer}/dsm/members`);
}

export function subscribeMembers(cb) {
	socket.on('members', function(members) {
		cb(null, members);
	});
}

export function subscribeCurrentMemberIndex(cb) {
	socket.on('currentMemberIndex', function(index) {
		cb(null, index);
	});
}

export function subscribeTimer(cb) {
	socket.on('timer', function(members) {
		cb(null, members);
	});
}