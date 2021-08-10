var app = require('./app');
var http = require('http');
const httpServer = http.createServer(app);


const io = require("socket.io")(httpServer,{
  cors:{
      origin:"*"
  }
});
let dataUncheckedNews = [];
let dataCheckedNews = [];
let loggedUsers= [];
//let users = [];


const addUncheckedNews = (news) =>{
  dataUncheckedNews = news;
}
io.on("connection", (socket)=>{
  socket.on("set-unchecked-news", (data) =>{
      addUncheckedNews(data)
      io.emit("get-unchecked-news", dataUncheckedNews);
  });
  socket.on("set-checked-news", data =>{
      dataCheckedNews = data;
      io.emit("get-checked-news", dataCheckedNews);
  });
  socket.on("new-form", (data) =>{
      console.log(data)
      io.emit("get-news", data)
  });
  
  /*socket.on("loged", () = >{

  }):*/
 /* socket.on("disconnect", () = >{

  })*/
  
});
httpServer.listen(3900, () => {
  console.log('listening on *:3900');
});