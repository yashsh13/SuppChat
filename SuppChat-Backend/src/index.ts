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

            const currentUser = allUsers.find(x=>x.socket==socket);
            const currentRoom = currentUser?.roomid;
            const peopleInRoom = allUsers.filter(x=>x.roomid == currentRoom);
            
            peopleInRoom.forEach(x=>{
                x.socket.send(JSON.stringify({
                    type:'join',
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
                        message: parsedMessage.payload.message
                    }));
                };
            });
        };
    });
});