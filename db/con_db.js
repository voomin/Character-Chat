var mysql = require('mysql');
var config = require('../db/info').local;
module.exports = function () {
  return {
    init: function () {
      return mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
      })
    },
    test_open: function (con) {
      con.connect(function (err) {
        if (err) {
          console.error('mysql connection error :' + err);
        } else {
          console.info('+ mysql is connected successfully.');
        }
      })
    },
  sql: function (con,sql) {
      con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          return result;
        });
      })
      
  }
  
  
  }
};
