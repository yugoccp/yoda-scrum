import axios from 'axios';
import io from 'socket.io-client';
const apiServer = '/api';
const socket = io();

export function nextMember() {
	return axios.get(`${apiServer}/dsm/next`);
}

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
		console.log('on members', members);
		cb(null, members);
	});
}

export function subscribeCurrentMemberIndex(cb) {
	socket.on('currentMemberIndex', function(index) {
		console.log('on currentMemberIndex', index);
		cb(null, index);
	});
}

export function subscribeTimer(cb) {
	socket.on('timer', function(timer) {
		console.log('on timer', timer);
		cb(null, timer);
	});
}