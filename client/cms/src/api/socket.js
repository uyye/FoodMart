import {io} from "socket.io-client"

const token = localStorage.getItem("access_token")
const socket = io("http://localhost:3000",{
    auth:{token:token || "" },
    transports:["websocket"],
     reconnectionAttempts: 5,  // coba reconnect max 5x
  reconnectionDelay: 1000   // delay 1s antar percobaan
})

// 🔹 Logging hanya untuk debug (opsional)
socket.on("connect", () => {
  console.log("✅ Connected to socket server with ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.warn("❌ Disconnected from socket:", reason);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Socket connection error:", err.message);
});

export default socket