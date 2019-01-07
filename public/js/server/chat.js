var imgs_src = [
    //"public/images/js.png",
    "jsface.png",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png",
    "http://file.sayclub.co.kr/charimg/item_real2/i_s_u_01_10196_01_03.gif",
    "http://files-cloud.enjin.com/smiley/173_6.png?1411091018",
    "http://ext.fmkorea.com/filesn/iconshop/9c100424974311c9b8d37b9b581a7850.gif",
    "http://smiley.org.uk/smilies/movie-tv/dorothy.gif",
    "http://icons.iconarchive.com/icons/martin-berube/character/256/Kid-icon.png",
    "http://icons.iconarchive.com/icons/martin-berube/character/256/Pirate-icon.png",
    "https://marketplace.canva.com/MAB6v043Ud8/1/thumbnail/canva-robot-electric-avatar-icon-MAB6v043Ud8.png",
    "http://vignette2.wikia.nocookie.net/character/images/9/97/%EC%BB%A4%EB%B9%84.png/revision/latest?cb=20131201021153&path-prefix=ko",
    "http://characters.turbomilk.com/i/smynx/first.png",
    "http://vignette4.wikia.nocookie.net/drslump/images/f/f3/517557-tortue_gniale.png/revision/latest?cb=20140121194858",
    "https://stickershop.line-scdn.net/stickershop/v1/product/718/LINEStorePC/main@2x.png;compress=true",
    "https://i.pinimg.com/originals/ba/87/e1/ba87e16015995f9e4e8a5ff094c3b623.jpg",
    "https://stickershop.line-scdn.net/stickershop/v1/product/1026/LINEStorePC/main@2x.png;compress=true",
    "https://ubistatic19-a.akamaihd.net/resource/en-us/game/southpark/thefracturedbutwhole/spfbw-characters-teamcoon-mosquito-day.png",
    "http://e1kad.com/d/wp-content/uploads/2011/06/msn-with-beg-03.png",
    "https://i1.wp.com/www.ideatel.org/wp-content/uploads/2014/11/31.png",
    "https://kr.seaicons.com/wp-content/uploads/2016/03/Monsters-Character-Young-Mikes-icon.png",
    "https://marketplace.canva.com/MAB4rQQeTPc/1/thumbnail/canva-buddha-icon-indian-culture-design--MAB4rQQeTPc.png",
    "https://s3.amazonaws.com/gs.apps.icons/TxsqKi0WEeOFTBIxPR901Q_/Spungebob.png",
    "http://moziru.com/images/mario-clipart-red-mushroom-5.png",
    "https://upload.wikimedia.org/wikipedia/en/1/14/Ralph_Wiggum.png",
    "http://moziru.com/images/the-simpsons-clipart-animated-gif-3.gif",
    "https://free.clipartof.com/171-Dark-Blue-Avatar-Character-Free-Vector-Clipart-Illustration.png",
    "https://s3.amazonaws.com/gameartpartnersimagehost/wp-content/uploads/edd/2015/07/pirate-royalty-free-game-art.png",
    "https://d1k5w7mbrh6vq5.cloudfront.net/images/cache/87/3b/3e/873b3ede3983595a465588419ce1dd5a.png",
    "https://free.clipartof.com/151-Free-Military-Vector-Clipart-Illustration-Of-A-Camouflage-Soldier-Avatar-Character.png",
    "http://cfile22.uf.tistory.com/image/261D883D563412662A0BF5",
    "http://www.pngall.com/wp-content/uploads/2016/07/Anonymous-Mask-Free-Download-PNG.png",
    "https://vignette.wikia.nocookie.net/plantsvszombies/images/4/42/Shrek_emoji.png/revision/latest?cb=20160413203711",
    "http://www.allthetests.com/quiz32/picture/pic_1436838828_1001.png",
    "http://icons.iconarchive.com/icons/jommans/briefness/256/My-Computer-icon.png",    
    "http://www.freepngimg.com/thumb/face/3-face-png-image-thumb.png",
    
];
var RimgNo= () => parseInt(Math.random()*imgs_src.length);
exports.user = function(id,name){
    this.id=id;
    this.name=name;
    this.count=1;//소켓 카운트
    this.imgSrc=imgs_src[RimgNo()];
    this.px=[0,0];
    this.msg="";
  }
exports.src=imgs_src;