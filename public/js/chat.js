const socket = io();
const INIT_USER = (user) => {
    const displayName = user.displayName;
    $('.city').append(`<div>${displayName}</div>`);
    $('.city div:last-child').addClass('people').attr('id', `p${displayName}`).hide()
        .fadeIn(1000);

    $('.map').append(`<div id='u${displayName}' class='u'>` +
            '<textarea class=\'talk\' readonly></textarea>' +
            `<div class='character'><img src='${user.photoURL}'></img></div>` +
    // +"<div class='name'>"+obj.name+"</div>"
        '</div>');

    $(`#u${displayName} .talk`).hide();
    $('.map .u img').width(CONFIG.block_size);
    $('.map .u img').height(CONFIG.block_size);
};
const PX_USER = (user) => $(`#u${user.displayName}`).css({ marginLeft: user.x, marginTop: user.y });
let CONFIG = null;
let MINE_USER = null;
socket.on('setting config', (config) => {
    CONFIG = config;
    $('.map').css({ width: CONFIG.MAP.width, height: CONFIG.MAP.height });
});
socket.on('existing users', (obj) => {
    Object.keys(obj).forEach((key) => {
        INIT_USER(obj[key]);
    });
});
socket.on('mine user', (user) => {
    MINE_USER = user;
});
socket.on('enter user', (user) => {
    MINE_USER = user;
});
socket.on('Out user', (displayName) => {
    $(`#p${displayName}`).fadeOut(1000).remove();
    $(`#u${displayName}`).remove();
});
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:// left
            MINE_USER.direction.west = true;
            if (MINE_USER.direction.east) {
                MINE_USER.direction.east = false;
                MINE_USER.spd = MINE_USER.SPD;
            }
            break;
        case 39:// right
            if (MINE_USER.direction.west) {
                MINE_USER.direction.west = false;
                MINE_USER.spd = MINE_USER.SPD;
            }
            MINE_USER.direction.east = true;
            break;
        case 40:// top
            MINE_USER.direction.north = true;
            if (MINE_USER.direction.south) {
                MINE_USER.direction.south = false;
                MINE_USER.spd = MINE_USER.SPD;
            }
            break;
        case 38:// bottom
            if (MINE_USER.direction.north) {
                MINE_USER.direction.north = false;
                MINE_USER.spd = MINE_USER.SPD;
            }
            MINE_USER.direction.south = true;
            break;
    }
    if (MINE_USER.spd <= MINE_USER.Maxspd) { MINE_USER.spd += MINE_USER.a; }
};
document.onkeyup = function (event) { // 키 눌렀다 땔때
    switch (event.keyCode) {
        case 37:
            MINE_USER.direction.west = false;
            break;
        case 39:
            MINE_USER.direction.east = true;
            break;
        case 40:
            MINE_USER.direction.north = false;
            break;
        case 38:
            MINE_USER.direction.south = false;

            break;
        case 13:
            // sendMSG();
            break;
    }
    MINE_USER.spd = MINE_USER.SPD;
};
function move () {
    const spd = (typeof (MINE_USER.spd) === 'number') ? MINE_USER.spd : 0;
    if (MINE_USER.direction.west) {
        MINE_USER.x -= spd;
    }
    if (MINE_USER.direction.east) {
        MINE_USER.x += spd;
    }
    if (MINE_USER.direction.north) {
        MINE_USER.y += spd;
    }
    if (MINE_USER.direction.south) {
        MINE_USER.y -= spd;
    }

    if (MINE_USER.x < 0) {
        MINE_USER.x = 0;
    }
    if (MINE_USER.y < 0) {
        MINE_USER.y = 0;
    }
    if (MINE_USER.x > CONFIG.MAP.width - CONFIG.block_size) {
        MINE_USER.x = CONFIG.MAP.width - CONFIG.block_size;
    }
    if (MINE_USER.y > CONFIG.MAP.height - CONFIG.block_size) {
        MINE_USER.y = CONFIG.MAP.height - CONFIG.block_size;
    }
    PX_USER(MINE_USER);
    if (MINE_USER.direction.west || MINE_USER.direction.east || MINE_USER.direction.north || MINE_USER.direction.south) {
        socket.emit('move user', MINE_USER.px);
    }
}
// const R = (min, max) => parseInt(Math.random() * (max - min)) + min;// min <= return < max
// const CONFIG = {
//     block_size: 35,
//     MAP: {
//         width: 1000,
//         height: 700
//     }
// };
// const MINE_USER = {
//     user_name: null,
//     px: [0, 0],
//     WENS: [false, false, false, false], // west, east, north, south
//     SPD: R(0, 4), // default
//     Maxspd: R(3, 9), // 최고속력
//     spd: this.SPD, // 현재속력
//     a: R(1, 4) / 10 // 가속도
//     // G:true//중력
// };
// const idSet = (id) => id.replace(/\./g, 'x').replace(/\:/g, '');
// const UserPosition = (id, px) => $(`#u${id}`).css({ marginLeft: px[0], marginTop: px[1] });
// const socket = io();
// let thread = null;

// document.addEventListener('touchstart', touchHandler);
// document.addEventListener('touchmove', touchHandler);

// function touchHandler (e) {
//     if (e.touches) {
//         playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
//         playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
//         alert(`${playerX}=x, y=${playerY}`);
//     }
// }
// $(() => {
//     $('.map').css({ width: CONFIG.MAP.width, height: CONFIG.MAP.height });
//     $('#chat .chat').click(sendMSG);
//     $('#name').change('input', () => {
//         socket.emit('change name', $('#name').val());
//     });
// });
// socket.on('receive name', (id, name) => { // 4
//     nameSet(id, name);
// });
// socket.on('receive message', (id, msg) => { // 3
//     id = idSet(id);
//     receiveMSG(id, msg);
// });
// socket.on('Existing users', (obj) => {
//     Object.keys(obj).forEach((key) => {
//         createUser(obj[key]);
//     });
//     // for (i in arr) { createUser(arr[i]); }
//     // arraylength();
// });
// socket.on('My user', (obj) => {
//     console.log(obj);
//     MINE_USER.user_name = idSet(obj.id);
//     px = obj.px;
//     $('#name').val(obj.name);
//     if (thread === null) { thread = setInterval(move, 10); }
// });
// socket.on('Enter user', (obj) => {
//     createUser(obj);
//     // arraylength();
// });
// socket.on('Out user', (id) => {
//     id = idSet(id);
//     $(`#p${id}`).fadeOut(1000).remove();
//     $(`#u${id}`).remove();
//     // arraylength();
// });
// socket.on('receive move user', (id, px) => {
//     id = idSet(id);
//     UserPosition(id, px);
// });
// function receiveMSG (id, msg) {
//     if (msg == '') {
//         $(`#u${id} .talk`).hide();
//     } else {
//         $(`#u${id} .talk`).show();
//         $(`#u${id} .talk`).html(msg);
//         $(`#u${id} .talk`).css('left', -($(`#u${id} .talk`).width() / 2) + (CONFIG.block_size / 2));
//         $(`#u${id} .talk`).css('top', -$(`#u${id} .talk`).height() + 15);
//     }
// }
// function sendMSG () {
//     const msg = $('#message').val();
//     socket.emit('send message', msg.slice(0, msg.length - 1));
//     $('#message').val('');
//     $('#message').focus();
//     // e.preventDefault();
// }
// function nameSet (id, name) {
//     id = idSet(id);
//     $(`#p${id}`).html(name);
//     $(`#u${id}`).attr('title', `ip = ${id}\nname = ${name}`);
// }
// function createUser (obj) {
//     obj.id = idSet(obj.id);
//     $('.city').append(`<div>${obj.name}</div>`);
//     $('.city div:last-child').addClass('people').attr('id', `p${obj.id}`).hide()
//         .fadeIn(1000);

//     $('.map').append(`<div id='u${obj.id}' class='u'>` +
//             '<textarea class=\'talk\' readonly></textarea>' +
//             `<div class='character'><img src='${obj.imgSrc}'></img></div>` +
//     // +"<div class='name'>"+obj.name+"</div>"
//         '</div>');

//     $(`#u${obj.id} .talk`).hide();
//     $('.map .u img').width(CONFIG.block_size);
//     $('.map .u img').height(CONFIG.block_size);

//     nameSet(obj.id, obj.name);
//     receiveMSG(obj.id, obj.msg);
//     UserPosition(obj.id, obj.px);
// }

// document.onkeydown = function (event) {
//     switch (event.keyCode) {
//         case 37:// left
//             MINE_USER.direction.west = true;
//             if (MINE_USER.direction.east) {
//                 MINE_USER.direction.east = false;
//                 MINE_USER.spd = MINE_USER.SPD;
//             }
//             break;
//         case 39:// right
//             if (MINE_USER.direction.west) {
//                 MINE_USER.direction.west = false;
//                 MINE_USER.set.spd = MINE_USER.set.SPD;
//             }
//             MINE_USER.direction.east = true;
//             break;
//         case 40:// top
//             MINE_USER.direction.north = true;
//             if (MINE_USER.direction.south) {
//                 MINE_USER.direction.south = false;
//                 MINE_USER.spd = MINE_USER.SPD;
//             }
//             break;
//         case 38:// bottom
//             if (MINE_USER.direction.north) {
//                 MINE_USER.direction.north = false;
//                 MINE_USER.spd = MINE_USER.SPD;
//             }
//             MINE_USER.direction.south = true;
//             break;
//     }
//     if (MINE_USER.spd <= MINE_USER.Maxspd) { MINE_USER.spd += MINE_USER.a; }
// };
// document.onkeyup = function (event) { // 키 눌렀다 땔때
//     switch (event.keyCode) {
//         case 37:
//             MINE_USER.direction.west = false;
//             break;
//         case 39:
//             MINE_USER.direction.east = true;
//             break;
//         case 40:
//             MINE_USER.direction.north = false;
//             break;
//         case 38:
//             MINE_USER.direction.south = false;

//             break;
//         case 13:
//             sendMSG();
//             break;
//     }
//     MINE_USER.spd = MINE_USER.SPD;
// };
// function move () {
//     const spd = (typeof (MINE_USER.spd) === 'number') ? MINE_USER.spd : 0;
//     if (MINE_USER.direction.west) {
//         MINE_USER.x -= spd;
//     }
//     if (MINE_USER.direction.east) {
//         MINE_USER.x += spd;
//     }
//     if (MINE_USER.direction.north) {
//         MINE_USER.y += spd;
//     }
//     if (MINE_USER.direction.south) {
//         MINE_USER.y -= spd;
//     }

//     if (MINE_USER.x < 0) {
//         MINE_USER.x = 0;
//     }
//     if (MINE_USER.y < 0) {
//         MINE_USER.y = 0;
//     }
//     if (MINE_USER.x > CONFIG.MAP.width - CONFIG.block_size) {
//         MINE_USER.x = CONFIG.MAP.width - CONFIG.block_size;
//     }
//     if (MINE_USER.y > CONFIG.MAP.height - CONFIG.block_size) {
//         MINE_USER.y = CONFIG.MAP.height - CONFIG.block_size;
//     }
//     UserPosition(MINE_USER.user_name, MINE_USER.px);
//     if (MINE_USER.direction.west || MINE_USER.direction.east || MINE_USER.direction.north || MINE_USER.direction.south) { socket.emit('move user', MINE_USER.px); }
// }
