var Ipc=require("ipc");Ipc.on("menu:popup",function(a,b,c,d){var e=Fire.Menu.buildFromTemplate(b,a.sender);c&&(c=Math.floor(c)),d&&(d=Math.floor(d)),e.popup(BrowserWindow.fromWebContents(a.sender),c,d)});