const Define = require('./Define');
class Character {
    constructor (obj) {
        if (typeof obj.id === 'undefined') return;
        if (typeof obj.displayName === 'undefined') return;

        obj.id = obj.id.replace('/', '');
        obj.id = obj.id.replace('#', '');

        this.id = obj.id;
        this.displayName = obj.displayName;
        this.x = 0;
        this.y = 0;
        this.photoURL = Define.RANDOM_IMG_URL();
        this.direction = {
            north: false,
            east: false,
            south: false,
            west: false
        };
        this.spd = Define.DEFAULT_SPD();
        this.SPD = this.spd + 3;
        this.Maxspd = this.spd * 5;
        this.a = 1;
    }
};
module.exports = {
    Character
};

// import Define from './Define';
// const init = () => {
//     const $ = {
//         _id: null,
//         _displayName: null,
//         _x: 0,
//         _y: 0,
//         _photoURL: null,
//         _direction: {
//             north: false,
//             east: false,
//             south: false,
//             west: false
//         },
//         _spd: 0
//         // _SPD: 0,
//         // _Maxspd: 0,
//         // _a: 0
//     };
//     return class {
//         constructor (obj) {
//             if (typeof obj.id === 'undefined') return;
//             if (typeof obj.displayName === 'undefined') return;

//             this._id = obj.id;
//             this._displayName = obj.displayName;
//             this._photoURL = Define.RANDOM_IMG_URL();
//             this._spd = Define.DEFAULT_SPD();
//         }

//         static get get () {
//             return $;
//         }
//     };
// };
// module.exports.init = () => {
//     const $ = {
//         _id: null,
//         _displayName: null,
//         _x: 0,
//         _y: 0,
//         _photoURL: null,
//         _direction: {
//             north: false,
//             east: false,
//             south: false,
//             west: false
//         },
//         _spd: 0
//         // _SPD: 0,
//         // _Maxspd: 0,
//         // _a: 0
//     };
//     return class {
//         constructor (obj) {
//             if (typeof obj.id === 'undefined') return;
//             if (typeof obj.displayName === 'undefined') return;

//             this._id = obj.id;
//             this._displayName = obj.displayName;
//             this._photoURL = Define.RANDOM_IMG_URL();
//             this._spd = Define.DEFAULT_SPD();
//         }

//         static get get () {
//             return $;
//         }
//     };
// };
