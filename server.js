const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow all for now
});

app.get("/", (req, res) => res.send("✅ WebRTC Signaling Server is running"));

io.on("connection", socket => {
  console.log("🔌 User connected:", socket.id);

  socket.on("offer", offer => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", answer => {
    socket.broadcast.emit("answer", answer);
  });

  socket.on("candidate", candidate => {
    socket.broadcast.emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
