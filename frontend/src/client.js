import axios from 'axios';
import io from 'socket.io-client';
import * as WsTypes from './constants/WsTypes';
const apiServer = '/api';
const socket = io();
const wsCallback = {}

/**
 * Register callbacks for websocket messages
 */
export function subscribe(wsType, cb) {
	wsCallback[wsType] = wsCallback[wsType] ? wsCallback[wsType] : [];
	wsCallback[wsType].push(cb);
}

/**
 * Create listeners for each websocket message type
 */
Object.values(WsTypes).forEach(type => {
	socket.on(type, function(message) {
		if (wsCallback[type]) {
			wsCallback[type].forEach(cb => {
				cb(message);
			});
		}
	});
});

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

export function getDsmData() {
	return axios.get(`${apiServer}/dsm/data`);
}