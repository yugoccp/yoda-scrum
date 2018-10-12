const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app)
const io = require('socket.io')(server);

let timeout = 2;

let dsm = {};

let members = [];

let currentMemberIndex = undefined;

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
app.get('/api/dsm/start', (req, res) => {

	// Setup DSM
	dsm.members = members;
	dsm.date = Date.now();
	dsm.time = 0;
	
	// Shuffle members order
	members = shuffle(members);
	console.log('Shuffled members:', members);

	// Emit choosen member
	currentMemberIndex = 0;
	members[currentMemberIndex].status = 'IN_PROGRESS';
	io.emit('members', members);
	io.emit('currentMemberIndex', currentMemberIndex);
	currentStartTime = Date.now();
	timerIntervalId = startTimerInterval(currentStartTime);
	console.log('send response');
	res.send('ok');
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
	res.send('ok');
});

function startTimerInterval(startTime) {
	return setInterval(() => {
		const currentTimer = Date.now() - startTime;
		io.emit('timer', currentTimer);
	}, 100);
}	

function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const API_PORT = 3333;
server.listen(API_PORT, () => {
	console.log(`Listen to port ${API_PORT}`);
});

