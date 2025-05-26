const express = require("express");
const app = express();
const http =
    require("http").createServer(app);
const io = require("socket.io")(
    http,
);

app.get("/",(req, res)=> {
    res.sendFile(
        __dirname + "/index.html",
    );

});

io.on("connection" , (socket)=> {
    console.log("A user coonected");

    socket.on("disconnect", ()=> {
        console.log(
            "A user disconnected",
        );
    });

    socket.on(
      "chat message",
      (msg)=> {
        console.log("message: " + msg);
        io.emit("chat message", msg);

      },
    
    );

});

http.listen(3000, ()=>{
    console.log(
        "Server started on port 3000",
    );

});



