const io = require('socket.io')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const choosenOne = {
	name: "",
	time: 0,
	status: ""
};

let dsm = {
	members: [],
	timer: 0,
	date: null
};

let timeout = 2;

let members = [];

let selectedMember = null;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('../../build'));

io.origins('*:*');
io.on('connection', (client) => {	

	app.get('/dsm/join', (req, res) => {
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

	app.get('/dsm/members', (req, res) => {
		res.send(JSON.stringify(members));
	});

	app.get('/dsm/timeout', (req, res) => {
		timeout = req.query.timeout;
		io.emit('timeout', timeout);
	})

	app.get('/dsm/start', () => {
		dsm.members = members;
		dsm.date = Date.now();
		dsm.timer = 0;
		// Shuffle members order
		// Emit choosen member
	})

	app.post('/dsm/next', (req, res) => {
		// Update member time
		// Update member status
		// If has pending member
		// 		Emit next selected member
		// Else
		// 		Emit null selected member 
	})

});

const apiPort = 3001;
const server = require('http').createServer(app)
io.listen(server);
console.log(`Listen to port ${apiPort}`)
server.listen(apiPort);

