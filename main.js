const { app, BrowserWindow } = require('electron')

let win

function createWindow() {

    //ウインドウの作成
    win = new BrowserWindow({ width:  400, height: 400 })

    //ウインドウに表示する内容
    win.loadFile('index.html')

    //デバッグ画面表示
    // win.webContents.openDevTools()

    //このウインドウが閉じられたときの処理
    win.on('closed', () => {
	        win = null
	    })
}

//アプリが初期化されたとき（起動されたとき）
app.on('ready',()=>{
    createWindow();
})

//全ウインドウが閉じられたとき
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
	        app.quit()
	    }
})

//アクティブになったとき（MacだとDockがクリックされたとき）
app.on('activate', () => {
    if (win === null) {
	        createWindow()
	    }
})

