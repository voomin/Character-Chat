var portnumber=8080;
var express = require('Express');
var app = express();
var things = require('./things.js');
var SocketIo = require('socket.io'); 
var socketEvents = require('./socket.js'); 

var mysql_dbc = require('./db/con_db')();
var connection = mysql_dbc.init();
//mysql_dbc.test_open(connection);

//connection = mysql_dbc.init();
//mysql_dbc.sql(connection,"select *from member");

var files=['','/images','/style','/js'];
app.set('view engine', 'pug');
app.set('views','./views');
for(i in files)
  app.use(express.static('public'+files[i]));
app.use('/', things);


var server = app.listen(portnumber);

const io = new SocketIo(server); // socket.io와 서버 연결하는 부분
socketEvents(io); // 아까 만든 이벤트 연결


console.log("+ socket server open!! port:"+portnumber);
