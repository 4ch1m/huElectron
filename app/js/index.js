const {app, dialog, Menu, BrowserWindow, nativeImage} = require('electron');
const store = new (require('electron-store'))();
const index = __dirname + '/../index.html';

let restartNotificationShown = false;

let tabs = [];

for (let tab of [
	{id: 'quickactions', label: 'Quick-Actions'},
	{id: 'bridges', label: 'Bridges'},
	{id: 'users', label: 'Users'},
	{id: 'lights', label: 'Lights'},
	{id: 'groups', label: 'Groups'},
	{id: 'scenes', label: 'Scenes'},
	{id: 'sensors', label: 'Sensors'},
	{id: 'schedules', label: 'Schedules'},
	{id: 'rules', label: 'Rules'},
	{id: 'about', label: 'About'}
]) {
	tabs.push({
		label: `Show '${tab.label}'`,
		type: 'checkbox',
		checked: store.get(`showTab.${tab.id}`, true),
		click: () => {
			store.set(
				`showTab.${tab.id}`,
				!(store.get(`showTab.${tab.id}`, true))
			);

			if (!restartNotificationShown) {
				dialog.showMessageBox({
					type: 'info',
					message: "Changing 'Appearance' settings requires an app restart to take effect."
				});
				restartNotificationShown = true;
			}
		}
	})
}

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
				label: 'Appearance',
				submenu: tabs
			},
			{
				type: 'separator'
			},
			{
				label: 'Reset',
				click: () => {
					let options = {
						type: 'question',
						buttons: ['OK', 'Cancel'],
						message: 'Do you really want to reset all stored settings?'
					};

					let callback = buttonIndex => {
						if (buttonIndex === 0) {
							store.clear();
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

function windowStateKeeper(windowName) {
	let window;

	// default values
	let windowState = {
		x: undefined,
		y: undefined,
		width: 1024,
		height: 768
	};

	function setBounds() {
		if (store.has(`windowState.${windowName}`)) {
			windowState = store.get(`windowState.${windowName}`);
		}
	}

	function saveState() {
		if (!windowState.isMaximized) {
			windowState = window.getBounds();
		}
		windowState.isMaximized = window.isMaximized();

		store.set(`windowState.${windowName}`, windowState);
	}

	function track(win) {
		window = win;

		['resize', 'move', 'close'].forEach(event => {
			win.on(event, saveState);
		});
	}

	setBounds();

	return ({
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
		isMaximized: windowState.isMaximized,
		track
	});
}

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const mainWindowStateKeeper = windowStateKeeper('main');

	const win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
		icon: nativeImage.createFromPath(__dirname + '/../img/icon.png'),
		x: mainWindowStateKeeper.x,
		y: mainWindowStateKeeper.y,
		width: mainWindowStateKeeper.width,
		height: mainWindowStateKeeper.height
	});
    win.loadFile(index);
	win.on('closed', onClosed);

	mainWindowStateKeeper.track(win);

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
	store.set('appVersion', app.getVersion());
	store.set('appSystemLocale', app.getSystemLocale());

	let builtMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(builtMenu);

	mainWindow = createMainWindow();
});
