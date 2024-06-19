const express=require('express');
const app=express()
const http=require('http')
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

app.get('/',function(req,res){
    res.sendFile(__dirname+"/templates/index.html")
});

io.on('connection', (Socket) => {
    console.log('user connected to server');
    Socket.on('disconnect', () => {
        console.log('user disconnected')
    });
    Socket.on('chatinfo',(data)=>{
        console.log('message: '+data)
        Socket.broadcast.emit('chatinfo',data);
        Socket.emit('chatinfo',data);
    });
  });

  server.listen(3000);