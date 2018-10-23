const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const utils = require('./utils');
const dataProvider = require('./providers/fileDataProvider');
const MemberStatus = require('./constants/MemberStatus');
const MeetingStatus = require('./constants/MeetingStatus');
const WsTypes = require('./constants/WsTypes');

let members = [];

let currentMemberIndex = -1;

let meetingStatus = MeetingStatus.WAITING;

function removeMember(name) {
	members = members.filter(m => m.name != name);
}

function updateMeetingStatus(status) {
	meetingStatus = status;
	sendMeetingStatus(meetingStatus);
}

function sendMeetingStatus(meetingStatus) {
	io.emit(WsTypes.MEETING_STATUS, meetingStatus);
}

function sendMembers(members) {
	io.emit(WsTypes.MEMBERS, members);
}

sendMeetingStatus(meetingStatus);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('/api/dsm/join', (req, res) => {
	const name = req.query.name
	if (!members.find(m => m.name === name)) {
		members.push({
			name,
			status: MemberStatus.PENDING,
			timeInMs: 0,
			startTime: undefined
		});
		sendMembers(members);
		updateMeetingStatus(MeetingStatus.WAITING);
		res.send('ok');
	} else {
		res.send(new Error(`"${name}" is already in use.`));
	}
});

app.get('/api/dsm/members', (req, res) => {
	res.send(JSON.stringify(members));
});


app.delete('/api/dsm/members', (req, res) => {
	removeMember(req.query.name);
	res.send('ok');
});


app.get('/api/dsm/start', (req, res) => {
	// Change meeting status
	updateMeetingStatus(MeetingStatus.IN_PROGRESS);
	// Shuffle members order
	members = utils.shuffle(members);
	// Emit choosen member
	currentMemberIndex = 0;
	const currentMember = members[currentMemberIndex];
	currentMember.status = MemberStatus.IN_PROGRESS;
	currentMember.startTime = Date.now();
	sendMembers(members);
	res.send('ok');
})

app.get('/api/dsm/next', (req, res) => {
	// Update member
	const currentMember = members[currentMemberIndex];
	currentMember.status = MemberStatus.DONE;
	currentMember.timeInMs = req.query.timeInMs;

	// Go to next member
	++currentMemberIndex
	if (currentMemberIndex < members.length) {
		// Emit next selected member index
		const nextMember = members[currentMemberIndex]
		nextMember.status = MemberStatus.IN_PROGRESS;
		nextMember.startTime = Date.now();
	} else {
		// Store current DSM data
		const timeInMs = members.reduce((time, m) => time += m.timeInMs, 0);
		dataProvider.saveDsm({
			members,
			timeInMs,
			date: Date.now()
		});
		// Reset members data
		members = [];
		// Change meeting status
		updateMeetingStatus(MeetingStatus.FINISHED);
	}
	sendMembers(members);
	res.send('ok');
});

app.get('/api/dsm/data', (req, res) => {
	const dsmData = dataProvider.findAllDsm();
	res.send(dsmData);
});

var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;
server.listen(port, ip, () => {
	console.log(`Listen to port ${port}`);
});

