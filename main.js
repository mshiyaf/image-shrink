const { app, BrowserWindow, Menu } = require('electron');

// Set env
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let aboutWindow;

function createMainWidow() {
  mainWindow = new BrowserWindow({
    title: 'Image Shrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: 'white',
  });

  mainWindow.loadFile('./app/index.html');
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: 'About Image Shrink',
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: 'white',
  });

  aboutWindow.loadFile('./app/about.html');
}

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
        ...(isDev
          ? [
              {
                label: 'Developer',
                submenu: [
                  {
                    role: 'reload',
                  },
                  {
                    role: 'forcereload',
                  },
                  {
                    type: 'separator',
                  },
                  {
                    role: 'toggledevtools',
                  },
                ],
              },
            ]
          : []),
      ]
    : ''),
  {
    role: 'fileMenu',
  },
];

app.on('ready', () => {
  createMainWidow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWidow();
  }
});
