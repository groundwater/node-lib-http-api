var http = require('http');
var api = require('./api.js');

/*

  User the same API to generate client request info

*/


function setUser(done) {

  // generate set user request options
  var req_set = api.request('setUser', {name: 'bob'});

  http.request(req_set, function (res) {
    res.pipe(process.stdout);
    res.on('end', function(){
      console.log();
      if(done) done();
    })
  }).end();
}

function getUser(done) {

  // generate get user request options
  var req_get = api.request('getUser', {name: 'bob'});

  http.request(req_get, function (res) {
    res.pipe(process.stdout);
    res.on('end', function(){
      console.log();
      if(done) done();
    })
  }).end();
}

setUser(getUser);
