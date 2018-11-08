const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const WsTypes = require('./constants/WsTypes');
const service = require('./services')();

function notifyMeetingStatus() {
	io.emit(WsTypes.MEETING_STATUS, service.getStatus());
}

function notifyMembers() {
	io.emit(WsTypes.MEMBERS, service.getMembers());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('/api/dsm/join', (req, res) => {
	const { name } = req.query;
	service.addMember(name);
	notifyMembers();
	res.send('ok');
});

app.get('/api/dsm/members', (req, res) => {
	res.send(JSON.stringify(service.getMembers()));
});


app.delete('/api/dsm/members', (req, res) => {
	const { name } = req.query;
	service.removeMember(name);
	notifyMembers();
	res.send('ok');
});


app.get('/api/dsm/start', (req, res) => {
	service.start();
	notifyMembers();
	notifyMeetingStatus();
	res.send('ok');
})

app.get('/api/dsm/next', (req, res) => {
	const { timeInMs } = req.query;
	service.nextMember(parseInt(timeInMs));
	notifyMembers();
	notifyMeetingStatus();
	res.send('ok');
});

app.get('/api/dsm/data', (req, res) => {
	const dsmData = service.getAllDsm();
	res.send(dsmData);
});

var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;
server.listen(port, ip, () => {
	console.log(`Listen to port ${port}`);
});

