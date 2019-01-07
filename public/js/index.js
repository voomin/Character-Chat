
//for(i=0;i<menu.length;i++){
//  document.write("<div class='ip_img' id='pr"+i+"' onclick=pr_click("+i+") style='margin-left:"+R(20,80)+"%; top:"+R(10,70)+"%;' title='"+menu[i][0]+"'><img src='/"+menu[i][2]+"'></img></div>")
//}
var Logo_top=80+"%";
window.onload=function(){
    $(".pan .ip_img").hide();
    $("#footer_image").animate({top:Logo_top},1000);
    setTimeout('reshow()',1000);
    
  //
  //$(".ip_img").fadeIn(1000);
}
$(function(){
  $("#footer_image").click(function(){
    collect();
    reshow();
  });
});
function collect(){//모으기
    for(i=1;i<=$( ".pan .ip_img" ).length;i++){
        $(".pan .ip_img:nth-child("+i+")").animate({top:Logo_top,left:47.5+"%"},1500);
    }
}

function reshow(){//퍼트리기
    $(".pan .ip_img").show();
    $(".ip_img").css({top:Logo_top,left:"47.5%"});
    for(i=1;i<=$( ".pan .ip_img" ).length;i++){
        $(".pan .ip_img:nth-child("+i+")").animate({top:R(10,70)+"%",left:R(20,80)+"%"},500);
    }
}
var move=setInterval(function(){

},3000);
function pr_click(url){//production click 메뉴들 클릭.
    //console.log(url);
    location.href=url;
}
function R(minrnum,maxrnum){
    return Math.round(Math.random()*(maxrnum-minrnum))+minrnum;
}
