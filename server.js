const express= require('express');
const SocketIo= require('socket.io');
const http= require('http');

const app = express(); // getting app from express
const PORT = 8686;

// need IO from socketio
// SocketIo has its own server from which we want io
const server= http.createServer(app);
const { Server } = SocketIo; //socketIo gives a Server class
// this Server class takes http server an gives me IO
const IO = new Server(server);
 

app.use(express.static('client'));


function handleSendHtml(request,response){
    response.sendFile(__dirname + '/index.html')
}

app.get('/',handleSendHtml);

function onStartFn(){
    console.log('server is up and running');
}

server.listen(PORT,onStartFn);


IO.on('connection',(socket)=> {
    console.log("connection established",socket.id)

    socket.on('chat message',(data)=>{

        IO.emit('chat message', data);
    })

    socket.on('disconnect',()=>{
        console.log("User left the chat");
    })

    
})