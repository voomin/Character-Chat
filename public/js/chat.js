const R=(min,max)=> parseInt(Math.random()*(max-min))+min;//min <= return < max
const set={
    block:35,//캐릭터 사이즈(전체캐릭터)
    SPD:R(0,4),//default
    Maxspd:R(3,9),//최고속력
    spd:this.SPD,//현재속력
    a:R(1,4)/10,//가속도
    map_width:1000,
    map_height:700,
    //G:true//중력
  }
const idSet=(id)=> id.replace(/\./g,"x").replace(/\:/g,"");
var myid=null;
var socket = io(); 
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
    
  $('.map').css({ width: set.map_width, height: set.map_height }); 
  $('h1').click(function(){
    //$(location).attr('href', '/');
    });
  $('.array').click(function(){
    $(".city").slideToggle(1000);
    });
  $('#chat .chat').click(function(e){ //2
    sendMSG();
  });
  $("#name").change("input",function(){
    socket.emit('change name', $('#name').val());
  });
});
socket.on('receive name', function(id,name){ //4
    nameSet(id,name);
});
socket.on('receive message', function(id,msg){ //3
    id=idSet(id);
    receiveMSG(id,msg);
    //$('.log textarea').append(msg+'\n');
    //$('.log textarea').scrollTop($('.log textarea')[0].scrollHeight);

});
socket.on('Existing users', function(arr){
    for(i in arr)
        createUser(arr[i]);
    arraylength();
});
socket.on('My user', function(obj){
    myid=idSet(obj.id);
    px=obj.px;
    $('#name').val(obj.name);
    if(thread==null)
        thread=setInterval(move,10);
});
socket.on('New user', function(obj){
    createUser(obj);
    arraylength();
});
socket.on('Out user', function(id){
    id=idSet(id);
    $('#p'+id).fadeOut(1000).remove();
    $('#u'+id).remove();
    arraylength();
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
        $('#u'+id+" .talk").css("left", -($('#u'+id+" .talk").width()/2)+(set.block/2));
        //$('#u'+id+" .talk").animate({top: -$('#u'+id+" .talk").height()+15});
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
function arraylength(){
    $(".array").html("호모목록 ("+$( ".city .people" ).length+")");
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
    $('.map .u img').width(set.block);
    $('.map .u img').height(set.block);

    nameSet(obj.id,obj.name);
    receiveMSG(obj.id,obj.msg);
    UserPosition(obj.id,obj.px);
    
    
}
var thread=null;
var UserPosition= (id,px) => $("#u"+id).css({ marginLeft : px[0], marginTop : px[1] } );
var point=[0,0,0,0];
var px=[0,0];
                document.onkeydown=function(event){
                    switch(event.keyCode){
                        case 37://left
                            point[0]=1;
                            if(point[1]){
                                point[1]=0;
                                set.spd=set.SPD;
                            }
                            break;
                        case 39://right
                            if(point[0]){
                                point[0]=0;
                                set.spd=set.SPD;
                            }
                            point[1]=1;
                            break;
                        case 40://top
                            point[2]=1;
                            if(point[3]){
                                point[3]=0;
                                set.spd=set.SPD;
                            }
                            break;
                        case 38://bottom
                                if(point[2]){
                                    point[2]=0;
                                    set.spd=set.SPD;
                                }
                                point[3]=1;
                            break;
                    }
                    if(set.spd<=set.Maxspd)
                        set.spd+=set.a;
                }
                document.onkeyup=function(event){//키 눌렀다 땔때
                    switch(event.keyCode){
                        case 37:
                            point[0]=0;
                            break;
                        case 39:
                            point[1]=0;
                            break;
                        case 40:
                            point[2]=0;
                            break;
                        case 38:
                                point[3]=0;

                            break;
                        case 13:
                            sendMSG();
                            break;
                    }
                    set.spd=set.SPD;
                }
                function move(){
                    var spd=(typeof(set.spd)=="number")?set.spd:0;
                    if(point[0]){
                        px[0]-=spd;
                    }
                    if(point[1]){
                        px[0]+=spd;
                    }
                    if(point[2]){
                        px[1]+=spd;
                    }
                    if(point[3]){
                        px[1]-=spd;
                    }
        
                    if(px[0]<0){
                        px[0]=0;
                    }
                    if(px[1]<0){
                        px[1]=0;
                    }
                    if(this.px[0]>set.map_width-set.block){
                        this.px[0]=set.map_width-set.block;
                    }
                    if(this.px[1]>set.map_height-set.block){
                        this.px[1]=set.map_height-set.block;
                    }
                    UserPosition(myid,px);
                    if(point[0]||point[1]||point[2]||point[3])
                        socket.emit('move user',px);
                }