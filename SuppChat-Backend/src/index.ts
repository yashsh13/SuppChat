import { WebSocketServer, type WebSocket } from "ws";
import { v4 } from "uuid";

const wss = new WebSocketServer({ port:8080 });

interface Users {
    socket: WebSocket,
    username: String,
    roomid: String,
    userid: String
};

let allUsers: Users[] = [];

wss.on("connection",(socket)=>{
    
    socket.on("message",(message: string)=>{
        const parsedMessage = JSON.parse(message);
        
        if(parsedMessage.type == "create"||parsedMessage.type == "join"){
            
            const alreadyExistsRoom = allUsers.find(x=>x.roomid==parsedMessage.payload.roomid);
            const alreadyExistsUsername = allUsers.find(x=>x.username==parsedMessage.payload.username);

            if(alreadyExistsRoom && parsedMessage.type=='create'){
                socket.send(JSON.stringify({
                    type:"error",
                    error:"Room with this id already exists"
                }));
                return
            }

            if((!alreadyExistsRoom && parsedMessage.type=='join')||(alreadyExistsUsername && alreadyExistsRoom)){
                socket.send(JSON.stringify({
                    type:"error",
                    error:"No Room with this ID is live or Username already taken in this room"
                }));
                return
            }

            allUsers.push({
                socket,
                username:parsedMessage.payload.username,
                roomid:parsedMessage.payload.roomid,
                userid: v4()
            });
            console.log(`User: ${parsedMessage.payload.username} joined room ${parsedMessage.payload.roomid}`);

            const currentUser = allUsers.find(x=>x.socket==socket);
            const currentRoom = currentUser?.roomid;
            const peopleInRoom = allUsers.filter(x=>x.roomid == currentRoom);
            
            peopleInRoom.forEach(x=>{
                x.socket.send(JSON.stringify({
                    type:'Enter Room',
                    peopleInRoom:peopleInRoom
                }))
            })
        };

        if(parsedMessage.type == "chat"){
            console.log(parsedMessage.payload.message)

            const currentUser = allUsers.find(x=>x.socket==socket);
            const currentRoom = currentUser?.roomid;
            const messageSentBy = currentUser?.username; 
            allUsers.forEach(user=>{
                if((user.roomid == currentRoom)){
                    user.socket.send(JSON.stringify({
                        type: 'chat',
                        username: messageSentBy,
                        message: parsedMessage.payload.message,
                        messageid: v4()
                    }));
                };
            });
        };

        if(parsedMessage.type == 'leave'){
            allUsers = allUsers.filter(x=>x.socket!=socket);
            
            const roomId = parsedMessage.payload.roomid;
            const peopleInRoom = allUsers.filter(x=>x.roomid == roomId);
            peopleInRoom.forEach(x=>{
                x.socket.send(JSON.stringify({
                    type:"Leave Room",
                    peopleInRoom
                }))
            })
            console.log(`${parsedMessage.payload.username} left the room: ${roomId}`);
        }
    });
});