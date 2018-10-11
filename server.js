const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const utils = require('./src/utils');

let timeout = 2;

let members = [];

let currentMemberIndex = 0;

let currentStartTime = null;

let timerIntervalId = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('../../build'));

io.on('connection', (socket) => {
	
	console.log('a user connected');
	socket.on('disconnect', function() {
    console.log('user disconnected');
	});

});

/**
 * 
 */
app.get('/api/dsm/join', (req, res) => {
	const name = req.query.name
	if (!members.find(m => m.name === name)) {
		members.push({
			name,
			status: 'PENDING',
			time: 0
		});
		io.emit('members', members);
		res.send('ok');
	} else {
		res.send(new Error(`"${name}" is already in use.`));
	}
});

/**
 * 
 */
app.get('/api/dsm/members', (req, res) => {
	res.send(JSON.stringify(members));
});

/**
 * 
 */
app.get('/api/dsm/start', () => {
	// Setup DSM
	dsm.members = members;
	dsm.date = Date.now();
	dsm.time = 0;
	
	// Shuffle members order
	members = utils.shuffle(members);

	// Emit choosen member
	currentMemberIndex = 0;
	members[currentMemberIndex].status = 'IN_PROGRESS';
	io.emit('members', members);
	io.emit('currentMemberIndex', currentMemberIndex);
	currentStartTime = Date.now();
	timerIntervalId = startTimerInterval(currentStartTime);
})

/**
 * 
 */
app.post('/api/dsm/next', (req, res) => {
	// Stop timer
	clearInterval(timerIntervalId);
	// Update member time
	currentMember.timer = Date.now() - currentStartTime;
	// Update member status
	currentMember.status = 'DONE';
	// Go to next member
	++currentMemberIndex
	
	if (currentMemberIndex < members.length) {
		// Emit next selected member index
		currentStartTime = Date.now();
		io.emit('currentMemberIndex', currentMemberIndex);
	} else {
		// Emit null selected member
		io.emit('currentMemberIndex', -1);
	}
});

function startTimerInterval(startTime) {
	return setInterval(() => {
		const currentTimer = Date.now() - startTime;
		io.emit('timer', currentTimer);
	}, 100);
}	

const API_PORT = 3001;
server.listen(API_PORT, () => {
	console.log(`Listen to port ${API_PORT}`);
});

