# SuppChat
SuppChat is a real-time chat application built for communicating with anyone around the world in seconds

- Users can create a room and set their username and roomid.
- Users can join an existing room
- They can chat in that room for however long
- Users can leave the room whenever they want
- Users see all the people present in the room and it updates dynamically

This Project was made in TypeScript 
-
- In Backend, ws npm library was used to implement WebSockets
- In Frontend, React was used for client side rendering and javascript's native WebSocket object was used to implement WebSockets on client side

# Video Demo

https://github.com/user-attachments/assets/809f3546-3446-4d36-b0dd-de2daef735eb

Every Edge Case is handled here such as 
-
- No one can create another room with the same roomid which is still live
- One cannot join a room with a username which is already present in that room
- One cannot join a room which isnt created yet
