const portnumber=8080;
const express = require('Express');
const app = express();
const things = require('./things.js');
const socketIo = require('socket.io'); 
const socketEvents = require('./socket.js'); 

const paths=['','/images','/style','/js'];
app.set('view engine', 'pug');
app.set('views','./views');
paths.forEach((path) => app.use(express.static(`public${path}`)));
app.use('/', things);


const server = app.listen(portnumber);

const io = new socketIo(server);
socketEvents(io);


console.log(`
  node server open!! 
  
  #socket
  
  http://localhost:${portnumber}/
`);
