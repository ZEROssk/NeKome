"use strict";
const sv = require('express')();
const http = require('http').Server(sv);
const io = require('socket.io')(http, {
	maxHttpBufferSize: 1000
});
const port = process.env.PORT || 3000;

const { app, BrowserWindow } = require('electron')
let win

sv.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/client.html');
})

sv.get('/host', function(req, res) {
	res.sendFile(__dirname + '/host/host.html');
})

io.set('log level', 3);

io.on('connection', function(socket) {
	socket.on('comment', function(data) {
		if (typeof data.value == 'string' && data.value.length <= 80) {
			io.emit('comment', {value: data.value});
			console.log(data.value);
		} else {
			console.log("error");
		}
	});
});

http.listen(port, function() {
	console.log('listening on *:' + port);
})

function createWindow() {
	win = new BrowserWindow ({
		left: 0,
		top: 0,
		frame: false,
		show: true,
		hasShadow: false,
		transparent: true,
		alwaysOnTop: true
	})

	win.setIgnoreMouseEvents(true);
	win.maximize();

	win.loadURL(`http://localhost:3000/host`)
	//win.webContents.openDevTools()
	win.on('closed', () => {
		win = null
	})
}

app.on('ready',()=>{
	createWindow();
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

