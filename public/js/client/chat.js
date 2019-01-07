var set={
    block:35,//캐릭터 사이즈(전체캐릭터)
    SPD:R(0,4),//default
    Maxspd:R(3,9),//최고속력
    spd:this.SPD,//현재속력
    a:R(1,4)/10,//가속도
    map_width:1000,
    map_height:700,
    //G:true//중력
}
var idSet=(id)=> id.replace(/\./g,"x").replace(/\:/g,"");
