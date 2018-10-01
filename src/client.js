import axios from 'axios';
import openSocket from 'socket.io-client';
const apiServer = 'http://192.168.15.5:3001';
const socket = openSocket(apiServer);

export function updateTimeout(timeout) {
	return axios.get(`${apiServer}/dsm/timeout?timeout=${timeout}`);
}

export function joinDsm(name) {
	return axios.get(`${apiServer}/dsm/join?name=${name}`);
}

export function getMembers() {
	return axios.get(`${apiServer}/dsm/members`);
}

export function subscribeMembers(cb) {
	socket.on('members', members => cb(null, members));
}

export function subscribeTimeout(cb) {
	socket.on('timeout', timeout => cb(null, timeout));
}