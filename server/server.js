import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { Server as socketIO } from "socket.io";
import http from "http";

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "/../public"); 
const app = express();
let server = http.createServer(app);

let io = new socketIO(server);
app.use(express.static(publicPath)); 

io.on('connection',(socket)=>{
    console.log("A new user just connected");

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
     })
    
})



server.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});


