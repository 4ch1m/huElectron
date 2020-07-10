'use strict';

const electron = require('electron');
const store = require('electron-store');
const windowStateKeeper = require('electron-window-state');

const app = electron.app;
const dialog = electron.dialog;
const menu = electron.Menu;

const index = __dirname + '/../index.html';

const menuTemplate = [
	{
		label: 'Edit',
		submenu: [
			{
				role: 'undo'
			},
			{
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				role: 'cut'
			},
			{
				role: 'copy'
			},
			{
				role: 'paste'
			},
			{
				role: 'pasteandmatchstyle'
			},
			{
				role: 'delete'
			},
			{
				role: 'selectall'
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				role: 'reload'
			},
			{
				role: 'toggledevtools'
			},
			{
				type: 'separator'
			},
			{
				role: 'resetzoom'
			},
			{
				role: 'zoomin'
			},
			{
				role: 'zoomout'
			},
			{
				type: 'separator'
			},
			{
				role: 'togglefullscreen'
			}
		]
	},
	{
		role: 'window',
		submenu: [
			{
				role: 'minimize'
			},
			{
				role: 'close'
			}
		]
	},
	{
		label: 'Settings',
		submenu: [
			{
				label: 'Reset',
				click: () => {
					let options = {	type: 'question',
									buttons: ['OK', 'Cancel'],
									message: 'Do you really want to reset all stored settings?' };

					let callback = function(buttonIndex) {
						if (buttonIndex == 0) {
							(new store()).clear();
							mainWindow.loadFile(index);
						}
					};

					dialog.showMessageBox(options, callback);
				}
			}
		]
	}

];

if (process.platform === 'darwin') {
	menuTemplate.unshift({
		label: app.getName(),
		submenu: [
			{
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				role: 'hide'
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				role: 'quit'
			}
		]
	});
	// Edit menu.
	menuTemplate[1].submenu.push(
		{
			type: 'separator'
		},
		{
			label: 'Speech',
			submenu: [
				{
					role: 'startspeaking'
				},
				{
					role: 'stopspeaking'
				}
			]
		}
	);
	// Window menu.
	menuTemplate[3].submenu = [
		{
			label: 'Close',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		},
		{
			label: 'Minimize',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		},
		{
			label: 'Zoom',
			role: 'zoom'
		},
		{
			type: 'separator'
		},
		{
			label: 'Bring All to Front',
			role: 'front'
		}
	]
}

require('electron-debug')({
	showDevTools: 'bottom'
});

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	let winState = windowStateKeeper({
		defaultWidth: 1000,
		defaultHeight: 800
	});

	const win = new electron.BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		icon: electron.nativeImage.createFromPath(__dirname + '/../img/icon.png'),
		x: winState.x,
		y: winState.y,
		width: winState.width,
		height: winState.height
	});

	winState.manage(win);

    win.loadFile(index);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	let builtMenu = menu.buildFromTemplate(menuTemplate);
	menu.setApplicationMenu(builtMenu);

	mainWindow = createMainWindow();
});
