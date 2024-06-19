// server.js
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { Server as socketIO } from "socket.io";
import http from "http";
import { config } from "dotenv";
import { generateMessage } from "./utils/message.js";

const app = express();
config();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "/../public");

const server = http.createServer(app);
const io = new socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("A new user just connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log("createMessage", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        
        // Log the type and existence of the callback
        console.log("Type of callback:", typeof callback);
        console.log("Callback exists:", !!callback);

        if (typeof callback === 'function') {
            // console.log("Calling callback with 'This is the server'");
            callback('This is the server');  // Ensure this is being called
        } else {
            console.log("Callback is not a function");
        }
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
