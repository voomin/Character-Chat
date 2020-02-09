const R=(min,max)=> parseInt(Math.random()*(max-min))+min;//min <= return < max
const CONFIG = {
    block_size: 35,
    MAP:{
        width: 1000,
        height: 700
    }
}
const _MINE={
    user_name: null,
    px: [0,0],
    WENS: [false,false,false,false], //west, east, north, south
    SPD: R(0,4),//default
    Maxspd: R(3,9),//최고속력
    spd: this.SPD,//현재속력
    a: R(1,4)/10, //가속도
    //G:true//중력
}
const idSet=(id)=> id.replace(/\./g,"x").replace(/\:/g,"");
const UserPosition= (id,px) => $("#u"+id).css({ marginLeft : px[0], marginTop : px[1] } );
const socket = io(); 
let thread=null;

document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);

function touchHandler(e) {
    if(e.touches) {
        playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
        playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
        alert(playerX+"=x, y="+playerY);
    }
}
$(function(){
  $('.map').css({ width: CONFIG.MAP.width, height: CONFIG.MAP.height }); 
  $('#chat .chat').click(sendMSG);
  $("#name").change("input",() => {
    socket.emit('change name', $('#name').val());
  });
});
socket.on('receive name', function(id,name){ //4
    nameSet(id,name);
});
socket.on('receive message', function(id,msg){ //3
    id=idSet(id);
    receiveMSG(id,msg);
});
socket.on('Existing users', function(arr){
    for(i in arr)
        createUser(arr[i]);
    // arraylength();
});
socket.on('My user', function(obj){
    _MINE.user_name = idSet(obj.id);
    px=obj.px;
    $('#name').val(obj.name);
    if(thread===null)
        thread=setInterval(move,10);
});
socket.on('New user', function(obj){
    createUser(obj);
    // arraylength();
});
socket.on('Out user', function(id){
    id=idSet(id);
    $('#p'+id).fadeOut(1000).remove();
    $('#u'+id).remove();
    // arraylength();
});
socket.on('receive move user', function(id,px){
    id=idSet(id);
    UserPosition(id,px);
});
function receiveMSG(id,msg){
    if(msg==""){
        $('#u'+id+" .talk").hide();
    }else{
        $('#u'+id+" .talk").show();
        $('#u'+id+" .talk").html(msg);
        $('#u'+id+" .talk").css("left", -($('#u'+id+" .talk").width()/2)+(CONFIG.block_size/2));
        $('#u'+id+" .talk").css("top", -$('#u'+id+" .talk").height()+15);
    }
}
function sendMSG(){
    var msg=$('#message').val();
    socket.emit('send message',msg.slice(0,msg.length-1));
    $('#message').val('');
    $('#message').focus();
    //e.preventDefault();
}
function nameSet(id,name){
    id=idSet(id);
    $('#p'+id).html(name);
    $('#u'+id).attr("title","ip = "+id+"\nname = "+name);
}
function createUser(obj){
    obj.id=idSet(obj.id);
    $( ".city" ).append( "<div>"+obj.name+"</div>" );
    $( ".city div:last-child" ).addClass('people').attr('id','p'+obj.id ).hide().fadeIn(1000);

    $( ".map" ).append( "<div id='u"+obj.id+"' class='u'>"
            +"<textarea class='talk' readonly></textarea>"
            +"<div class='character'><img src='"+obj.imgSrc+"'></img></div>"
            //+"<div class='name'>"+obj.name+"</div>"
        +"</div>" );

    $('#u'+obj.id+" .talk").hide();
    $('.map .u img').width(CONFIG.block_size);
    $('.map .u img').height(CONFIG.block_size);

    nameSet(obj.id,obj.name);
    receiveMSG(obj.id,obj.msg);
    UserPosition(obj.id,obj.px);
}

document.onkeydown=function(event){
    switch(event.keyCode){
        case 37://left
            _MINE.WENS[0]=true;
            if(_MINE.WENS[1]){
                _MINE.WENS[1]=false;
                _MINE.spd=_MINE.SPD;
            }
            break;
        case 39://right
            if(_MINE.WENS[0]){
                _MINE.WENS[0]=false;
                _MINE.set.spd=_MINE.set.SPD;
            }
            _MINE.WENS[1]=true;
            break;
        case 40://top
        _MINE.WENS[2]=true;
            if(_MINE.WENS[3]){
                _MINE.WENS[3]=false;
                _MINE.spd=_MINE.SPD;
            }
            break;
        case 38://bottom
                if(_MINE.WENS[2]){
                    _MINE.WENS[2]=false;
                    _MINE.spd=_MINE.SPD;
                }
                _MINE.WENS[3]=true;
            break;
    }
    if(_MINE.spd<=_MINE.Maxspd)
        _MINE.spd+=_MINE.a;
}
document.onkeyup=function(event){//키 눌렀다 땔때
    switch(event.keyCode){
        case 37:
            _MINE.WENS[0]=false;
            break;
        case 39:
            _MINE.WENS[1]=true;
            break;
        case 40:
            _MINE.WENS[2]=false;
            break;
        case 38:
            _MINE.WENS[3]=false;

            break;
        case 13:
            sendMSG();
            break;
    }
    _MINE.spd=_MINE.SPD;
}
function move(){
    var spd=(typeof(_MINE.spd)=="number")?_MINE.spd:0;
    if(_MINE.WENS[0]){
        _MINE.px[0]-=spd;
    }
    if(_MINE.WENS[1]){
        _MINE.px[0]+=spd;
    }
    if(_MINE.WENS[2]){
        _MINE.px[1]+=spd;
    }
    if(_MINE.WENS[3]){
        _MINE.px[1]-=spd;
    }

    if(_MINE.px[0]<0){
        _MINE.px[0]=0;
    }
    if(_MINE.px[1]<0){
        _MINE.px[1]=0;
    }
    if(_MINE.px[0]>CONFIG.MAP.width-CONFIG.block_size){
        _MINE.px[0]=CONFIG.MAP.width-CONFIG.block_size;
    }
    if(_MINE.px[1]>CONFIG.MAP.height-CONFIG.block_size){
        _MINE.px[1]=CONFIG.MAP.height-CONFIG.block_size;
    }
    UserPosition(_MINE.user_name,_MINE.px);
    if(_MINE.WENS[0]||_MINE.WENS[1]||_MINE.WENS[2]||_MINE.WENS[3])
        socket.emit('move user', _MINE.px);
}