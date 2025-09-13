require("dotenv").config()

const express = require("express");
const http = require("http")
const cors = require('cors')
const {Server} = require("socket.io")

const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const { verifyToken } = require("./helpers/jwt");

const app =  express()
const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173", "http://localhost:5174"],
        methods:["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    const token = socket.handshake.auth.token
    
     if(!token){
        return socket.disconnect()
     }
    
    try {
        const decoded = verifyToken(token)
        if(decoded.role === "admin"){
            socket.join("adminRoom")
        }else{
            console.log(`Public user connected: ${socket.id}`);
        }
    } catch (error) {
        socket.disconnect()
    }
})

app.use((req, res, next)=>{
    req.io = io
    next()
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

module.exports = server