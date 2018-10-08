const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app)
const io = require('socket.io')(server);

let timeout = 2;

let members = [];

let currentMember = null;

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

app.get('/api/dsm/join', (req, res) => {
	const name = req.query.name
	if (!members.find(m => m.name === name)) {
		console.log(`Add "${name}" to DSM...`);
		members.push({
			name,
			status: 'PENDING',
			time: 0
		});
		console.log(`Notify all about "${name}"...`);
		io.emit('members', members);
		res.send('ok');
	} else {
		res.send(new Error(`"${name}" is already in use.`));
	}
});

app.get('/api/dsm/members', (req, res) => {
	res.send(JSON.stringify(members));
});

app.get('/api/dsm/timeout', (req, res) => {
	timeout = req.query.timeout;
	io.emit('timeout', timeout);
})

app.get('/api/dsm/start', () => {
	dsm.members = members;
	dsm.date = Date.now();
	dsm.timer = 0;
	// Shuffle members order
	// Emit choosen member
})

app.post('/api/dsm/next', (req, res) => {
	// Update member time
	// Update member status
	// If has pending member
	// 		Emit next selected member
	// Else
	// 		Emit null selected member 
})


const API_PORT = 3001;
server.listen(API_PORT, () => {
	console.log(`Listen to port ${API_PORT}`);
});

