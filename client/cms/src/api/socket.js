import {io} from "socket.io-client"

const token = localStorage.getItem("access_token")
const socket = io("http://localhost:3000",{
    auth:{token:token || "" },
    transports:["websocket"]
})

export default socket