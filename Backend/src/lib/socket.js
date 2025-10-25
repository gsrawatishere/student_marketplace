import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);


const io = new Server(server,{
    cors : {
        origin : ['http://localhost:5173'],
        credentials : true
    }
})

const connectedUsers = new Map();

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);
    
    socket.on("registerUser",(userId) =>{
        connectedUsers.set(userId,socket.id);
        console.log("User Registered :",userId);
    })


    socket.on("disconnect", () => {
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log("A user disconnected", socket.id);
  });
});




export {io,app,server,connectedUsers};