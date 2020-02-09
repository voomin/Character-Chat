const urls = ['https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png', 'http://file.sayclub.co.kr/charimg/item_real2/i_s_u_01_10196_01_03.gif', 'http://files-cloud.enjin.com/smiley/173_6.png?1411091018', 'http://ext.fmkorea.com/filesn/iconshop/9c100424974311c9b8d37b9b581a7850.gif', 'http://icons.iconarchive.com/icons/martin-berube/character/256/Kid-icon.png', 'http://icons.iconarchive.com/icons/martin-berube/character/256/Pirate-icon.png', 'https://marketplace.canva.com/MAB6v043Ud8/1/thumbn…/canva-robot-electric-avatar-icon-MAB6v043Ud8.png', 'http://vignette2.wikia.nocookie.net/character/imag…/revision/latest?cb=20131201021153&path-prefix=ko', 'http://characters.turbomilk.com/i/smynx/first.png', 'http://vignette4.wikia.nocookie.net/drslump/images…rtue_gniale.png/revision/latest?cb=20140121194858', 'https://i.pinimg.com/originals/ba/87/e1/ba87e16015995f9e4e8a5ff094c3b623.jpg', 'https://ubistatic19-a.akamaihd.net/resource/en-us/…twhole/spfbw-characters-teamcoon-mosquito-day.png', 'http://e1kad.com/d/wp-content/uploads/2011/06/msn-with-beg-03.png', 'https://kr.seaicons.com/wp-content/uploads/2016/03/Monsters-Character-Young-Mikes-icon.png', 'https://marketplace.canva.com/MAB4rQQeTPc/1/thumbn…uddha-icon-indian-culture-design--MAB4rQQeTPc.png', 'https://s3.amazonaws.com/gs.apps.icons/TxsqKi0WEeOFTBIxPR901Q_/Spungebob.png', 'http://moziru.com/images/mario-clipart-red-mushroom-5.png', 'https://upload.wikimedia.org/wikipedia/en/1/14/Ralph_Wiggum.png', 'http://moziru.com/images/the-simpsons-clipart-animated-gif-3.gif', 'https://free.clipartof.com/171-Dark-Blue-Avatar-Character-Free-Vector-Clipart-Illustration.png', 'https://s3.amazonaws.com/gameartpartnersimagehost/…oads/edd/2015/07/pirate-royalty-free-game-art.png', 'https://d1k5w7mbrh6vq5.cloudfront.net/images/cache/87/3b/3e/873b3ede3983595a465588419ce1dd5a.png', 'https://free.clipartof.com/151-Free-Military-Vecto…tion-Of-A-Camouflage-Soldier-Avatar-Character.png', 'http://cfile22.uf.tistory.com/image/261D883D563412662A0BF5', 'http://www.pngall.com/wp-content/uploads/2016/07/Anonymous-Mask-Free-Download-PNG.png', 'https://vignette.wikia.nocookie.net/plantsvszombie…Shrek_emoji.png/revision/latest?cb=20160413203711', 'http://www.allthetests.com/quiz32/picture/pic_1436838828_1001.png', 'http://icons.iconarchive.com/icons/jommans/briefness/256/My-Computer-icon.png', 'http://www.freepngimg.com/thumb/face/3-face-png-image-thumb.png'];
module.exports = {
    CONFIG: () => {
        return {
            block_size: 35,
            MAP: {
                width: 1000,
                height: 700
            }
        };
    },
    IMG_URLS: () => {
        return urls;
    },
    RANDOM_IMG_URL: () => {
        const index = parseInt(Math.random() * urls.length);
        return urls[index];
    },
    DEFAULT_SPD: () => {
        return 5;
    }
};

// export default Define;
