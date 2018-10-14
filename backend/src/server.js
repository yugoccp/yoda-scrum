const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const utils = require('./utils');
const dataProvider = require('./providers/fileDataProvider');

let members = [];

let currentMemberIndex = -1;

let currentStartTime = null;

let timerIntervalId = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('../../frontend/build'));

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', function() {
    console.log('user disconnected');
	});
});

app.get('/api/dsm/join', (req, res) => {
	const name = req.query.name
	if (!members.find(m => m.name === name)) {
		members.push({
			name,
			status: 'PENDING',
			timeInMs: 0
		});
		io.emit('members', members);
		res.send('ok');
	} else {
		res.send(new Error(`"${name}" is already in use.`));
	}
});

app.get('/api/dsm/members', (req, res) => {
	res.send(JSON.stringify(members));
});

app.get('/api/dsm/start', (req, res) => {
	// Shuffle members order
	members = utils.shuffle(members);

	// Emit choosen member
	currentMemberIndex = 0;
	members[currentMemberIndex].status = 'IN_PROGRESS';
	io.emit('members', members);
	io.emit('currentMemberIndex', currentMemberIndex);
	currentStartTime = Date.now();
	timerIntervalId = startTimerInterval(currentStartTime);
	res.send('ok');
})

app.get('/api/dsm/next', (req, res) => {
	// Stop timer
	clearInterval(timerIntervalId);
	timerIntervalId = null;
	const currentMember = members[currentMemberIndex];

	// Update member time
	currentMember.timeInMs = Date.now() - currentStartTime;
	// Update member status
	currentMember.status = 'DONE';
	io.emit('members', members);

	// Go to next member
	++currentMemberIndex

	if (currentMemberIndex < members.length) {
		// Emit next selected member index
		currentStartTime = Date.now();
		io.emit('currentMemberIndex', currentMemberIndex);
		timerIntervalId = startTimerInterval(currentStartTime);
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
		// Emit invalid selected member index
		io.emit('currentMemberIndex', -1);
	}
	res.send('ok');
});

app.get('/api/dsm/data', (req, res) => {
	const dsmData = dataProvider.findAllDsm();
	res.send(dsmData);
});

function startTimerInterval(startTime) {
	if (timerIntervalId) {
		return timerIntervalId;
	} else {
		return setInterval(() => {
			const currentTimer = Date.now() - startTime;
			io.emit('timer', currentTimer);
		}, 100);
	}
}

const API_PORT = 3333;
server.listen(API_PORT, () => {
	console.log(`Listen to port ${API_PORT}`);
});

