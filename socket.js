// var chat = require('./public/js/server/chat.js');
// var Engine = require('./public/js/server/engine.js');
const R=(min,max)=> parseInt(Math.random()*(max-min))+min;//min <= return < max
exports.set={
  block:35,//캐릭터 사이즈(전체캐릭터)
  SPD:R(0,4),//default
  Maxspd:R(3,9),//최고속력
  spd:this.SPD,//현재속력
  a:R(1,4)/10,//가속도
  map_width:1000,
  map_height:700,
  //G:true//중력
}
exports.idSet=(id)=> id.replace(/\./g,"x").replace(/\:/g,"");
const imgs_src = [
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png", 
  "http://file.sayclub.co.kr/charimg/item_real2/i_s_u_01_10196_01_03.gif", "http://files-cloud.enjin.com/smiley/173_6.png?1411091018", "http://ext.fmkorea.com/filesn/iconshop/9c100424974311c9b8d37b9b581a7850.gif", "http://icons.iconarchive.com/icons/martin-berube/character/256/Kid-icon.png", "http://icons.iconarchive.com/icons/martin-berube/character/256/Pirate-icon.png", "https://marketplace.canva.com/MAB6v043Ud8/1/thumbn…/canva-robot-electric-avatar-icon-MAB6v043Ud8.png", "http://vignette2.wikia.nocookie.net/character/imag…/revision/latest?cb=20131201021153&path-prefix=ko", "http://characters.turbomilk.com/i/smynx/first.png", "http://vignette4.wikia.nocookie.net/drslump/images…rtue_gniale.png/revision/latest?cb=20140121194858", "https://i.pinimg.com/originals/ba/87/e1/ba87e16015995f9e4e8a5ff094c3b623.jpg", "https://ubistatic19-a.akamaihd.net/resource/en-us/…twhole/spfbw-characters-teamcoon-mosquito-day.png", "http://e1kad.com/d/wp-content/uploads/2011/06/msn-with-beg-03.png", "https://kr.seaicons.com/wp-content/uploads/2016/03/Monsters-Character-Young-Mikes-icon.png", "https://marketplace.canva.com/MAB4rQQeTPc/1/thumbn…uddha-icon-indian-culture-design--MAB4rQQeTPc.png", "https://s3.amazonaws.com/gs.apps.icons/TxsqKi0WEeOFTBIxPR901Q_/Spungebob.png", "http://moziru.com/images/mario-clipart-red-mushroom-5.png", "https://upload.wikimedia.org/wikipedia/en/1/14/Ralph_Wiggum.png", "http://moziru.com/images/the-simpsons-clipart-animated-gif-3.gif", "https://free.clipartof.com/171-Dark-Blue-Avatar-Character-Free-Vector-Clipart-Illustration.png", "https://s3.amazonaws.com/gameartpartnersimagehost/…oads/edd/2015/07/pirate-royalty-free-game-art.png", "https://d1k5w7mbrh6vq5.cloudfront.net/images/cache/87/3b/3e/873b3ede3983595a465588419ce1dd5a.png", "https://free.clipartof.com/151-Free-Military-Vecto…tion-Of-A-Camouflage-Soldier-Avatar-Character.png", "http://cfile22.uf.tistory.com/image/261D883D563412662A0BF5", "http://www.pngall.com/wp-content/uploads/2016/07/Anonymous-Mask-Free-Download-PNG.png", "https://vignette.wikia.nocookie.net/plantsvszombie…Shrek_emoji.png/revision/latest?cb=20160413203711", "http://www.allthetests.com/quiz32/picture/pic_1436838828_1001.png", "http://icons.iconarchive.com/icons/jommans/briefness/256/My-Computer-icon.png", "http://www.freepngimg.com/thumb/face/3-face-png-image-thumb.png"]
const RimgNo = () => parseInt(Math.random() * imgs_src.length);
class ChatUser {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.count = 1;//소켓 카운트
    this.imgSrc = imgs_src[RimgNo()];
    this.px = [0, 0];
    this.msg = "";
  }
}
exports.src = imgs_src;
exports.R=(min,max)=> parseInt(Math.random()*(max-min))+min;//min <= return < max



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
  var u = new ChatUser(id,"u"+R(456,98783));
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