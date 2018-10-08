import axios from 'axios';
import io from 'socket.io-client';
const apiServer = '/api';
const socket = io();

export function updateTimeout(timeout) {
	return axios.get(`${apiServer}/dsm/timeout?timeout=${timeout}`);
}

export function joinDsm(dsmCode, name) {
	console.log('emit test');
	socket.emit('test', "test message");
	return axios.get(`${apiServer}/dsm/join?dsmCode=${dsmCode}&name=${name}`);
}

export function getMembers() {
	return axios.get(`${apiServer}/dsm/members`);
}

export function subscribeMembers(cb) {
	socket.on('members', function(members) {
		cb(null, members);
	});
}

export function subscribeTimeout(cb) {
	socket.on('timeout', timeout => cb(null, timeout));
}