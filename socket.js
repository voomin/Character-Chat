var chat = require('./public/js/server/chat.js');
var Engine = require('./public/js/server/engine.js');
var server_ip='192.168.100.31';
var ip=[new Array(),new Array()];//0= 아이피 주소, 1=아이피 소켓 갯수

module.exports = (io) => {
  io.on('connection', function(socket){ //3

    io.to(socket.id).emit('Existing users',ip[1]);
    //기존 소켓에 count가 0보다 크면 count를 1증가 
    //아니면 새로운 유저 생성 유저생성이 되면 type= 'object'를 return 받음
    if(typeof(custom=((count(socket,0)>0)?count(socket,1):newUser(socket)))=="object"){
      io.to(socket.id).emit('My user',custom);
      io.emit('New user',custom);
    }else{
      var id=socket.request.connection.remoteAddress;
      var index=ip[0].indexOf(id);
      var custom=ip[1][index];
      io.to(socket.id).emit('My user',custom);
    }
    socket.on('disconnect', function(){
      if((count(socket,-1)>0)?false:true){
        deleteUser(socket);
        io.emit('Out user',socket.request.connection.remoteAddress);
      }
    });
    socket.on('send message', function(text){ //3-3
      var msg = text;
      var id=socket.request.connection.remoteAddress;
      var index=ip[0].indexOf(id);
      ip[1][index].msg=msg;
      io.emit('receive message',id, msg);
    });
    socket.on('change name', function(name){ //3-3
      var id=socket.request.connection.remoteAddress;
      var index=ip[0].indexOf(id);
      (index>=0)?ip[1][index].name=name:-1;
      io.emit('receive name',id, name);
    });
    socket.on('move user', function(px){ //3-3
      var id=socket.request.connection.remoteAddress;
      var index=ip[0].indexOf(id);
      ip[1][index].px=px;
      socket.broadcast.emit('receive move user',id,px);
    });
  });
};
function deleteUser(socket){
  var id=socket.request.connection.remoteAddress;
  var index=ip[0].indexOf(id);
  ip[0].splice(index,1);
  ip[1].splice(index,1);
  //console.log(ip);
}
function newUser(socket){
  //console.log();
  var id=socket.request.connection.remoteAddress;
  var u = new chat.user(id,"u"+Engine.R(456,98783));
  ip[0].push(id);
  ip[1].push(u);
  //console.log(ip);
  return u;
}
function count(socket,up){
  var id=socket.request.connection.remoteAddress;
  var index=ip[0].indexOf(id);
  return (index>=0)?ip[1][index].count+=up:-1;
}