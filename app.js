const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

let numUsers = 0; //count users
let users = [];
io.on("connection", (socket) => {
  console.log("Conected");
  socket.on("setUsername", (data) => {
    if (users.indexOf(data) > -1) {
      console.log("on error", data);
      socket.emit("userExists", data + " Username  ซ้ำ");
    } else {
      users.push(data);
      console.log("sussecess", data);
      socket.emit("userSet", { username: data });
    }
  });
  socket.on("msg", (data) => {
    console.log("msg", data);
    io.sockets.emit("newmsgs", data);
  });
});

http.listen(3000, function () {
  console.log("start server on port 3000");
});
