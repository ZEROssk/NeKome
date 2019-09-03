"use strict";
const { app, BrowserWindow } = require('electron')
let win

function createWindow() {
	win = new BrowserWindow ({
		left: 0,
		top: 0,
		frame: false,
		show: true,
		transparent: true,
		'always-on-top': true
	})

	win.setIgnoreMouseEvents(true);
	win.maximize();

	win.loadURL(`file://${process.cwd()}/index.html`);
	// win.webContents.openDevTools()
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

