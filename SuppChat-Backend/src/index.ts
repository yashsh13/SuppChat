import { WebSocketServer, type WebSocket } from "ws";

const wss = new WebSocketServer({ port:8080 });

interface Users {
    socket: WebSocket,
    username: String,
    roomid: String
};

let allUsers: Users[] = [];

wss.on("connection",(socket)=>{
    
    socket.on("message",(message: string)=>{
        const parsedMessage = JSON.parse(message);
        
        if(parsedMessage.type == "join"){
            allUsers.push({
                socket,
                username:parsedMessage.payload.username,
                roomid:parsedMessage.payload.roomid
            });
            console.log(`User: ${parsedMessage.payload.username} joined room ${parsedMessage.payload.roomid}`);
        };

        if(parsedMessage.type == "chat"){
            const currentRoom = allUsers.find(x=>x.socket==socket)?.roomid;
            allUsers.forEach(user=>{
                if((user.roomid == currentRoom)&&(user.socket!=socket)){
                    user.socket.send(parsedMessage.payload.message);
                };
            });
        };
    });
});