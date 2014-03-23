var test = require('tap').test;
var API  = require('../index.js')();

var GET = {
  method  : 'GET',
  route   : '/users/:name',
  options : {
    order: 'desc',
    limit: 100
  }
};

var POST = {
  method  : 'POST',
  route   : '/users/:name',
  options : {
    order: 'desc',
    limit: 100
  }
};

test("derive handle", function (t){
  var api = API.New();

  api.add('userCat', POST);

  var match = api.handle('GET', '/users/bob');

  t.equal(match, null);
  t.end();
});
