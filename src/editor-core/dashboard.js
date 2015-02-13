var BrowserWindow=require("browser-window"),Ipc=require("ipc"),Url=require("fire-url"),Path=require("fire-path"),Fs=require("fire-fs"),Menu=require("menu"),FireApp=require("./fire-app"),FireWindow=require("./fire-window"),isValidProject=function(a){if(!Fs.existsSync(a)||!Fs.statSync(a).isDirectory())return console.log("project dir not eixsts"),!1;var b=Path.join(a,"assets");return Fs.existsSync(b)&&Fs.statSync(b).isDirectory()?!0:(console.log("assets dir not eixsts"),!1)},registerBuiltinMessages=function(){Ipc.on("dashboard:request-recent-projects",function(){Fire.sendToPages("dashboard:recent-projects",Fire.userProfile.recentlyOpened)}),Ipc.on("dashboard:remove-project",function(a){var b=Fire.userProfile.recentlyOpened.indexOf(a);-1!==b&&(Fire.userProfile.recentlyOpened.splice(b,1),Fire.saveProfile(),Fire.sendToPages("dashboard:project-removed",a))}),Ipc.on("dashboard:add-project",function(a,b){if(isValidProject(a)){var c=Fire.userProfile.recentlyOpened.indexOf(a);-1===c&&(Fire.userProfile.recentlyOpened.push(a),Fire.saveProfile(),Fire.sendToPages("dashboard:project-added",a,b))}}),Ipc.on("dashboard:create-project",function(a){Fire.userProfile.recentlyOpened.push(a),Fire.saveProfile(),Dashboard.close();var b=require("./fireball");b.open({showDevtools:!1,project:a})}),Ipc.on("dashboard:open-project",function(a){if(isValidProject(a)){Dashboard.close();var b=require("./fireball");b.open({showDevtools:!1,project:a})}})},_dashboardWin=null,Dashboard={open:function(){registerBuiltinMessages(),_dashboardWin=new FireWindow("dashboard",{title:"Fireball-x Dashboard",width:1024,height:576,show:!0,resizable:!1,frame:!0}),Fire.App.mainWindow=_dashboardWin,_dashboardWin.load("fire://static/dashboard.html");var a=Menu.buildFromTemplate([{label:"Developer",submenu:[{label:"Minimize",accelerator:"Command+M",selector:"performMiniaturize:"},{label:"Close",accelerator:"Command+W",selector:"performClose:"},{type:"separator"},{label:"Reload",accelerator:"CmdOrCtrl+R",click:function(){BrowserWindow.getFocusedWindow().reloadIgnoringCache()}},{type:"separator"},{label:"Developer Tools",accelerator:"CmdOrCtrl+Shift+I",click:function(){BrowserWindow.getFocusedWindow().openDevTools()}}]}]);Menu.setApplicationMenu(a)},close:function(){_dashboardWin.close(),_dashboardWin=null}};module.exports=Dashboard;