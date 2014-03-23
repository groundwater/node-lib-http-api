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

  api.add('userCat', GET);

  var match = api.handle('GET', '/users/bob');

  t.equal(match.handle, 'userCat');
  t.deepEqual(match.params, {
    name: 'bob'
  });
  t.end();
});


test("derive handle with query", function (t){
  var api = API.New();

  api.add('userCat', GET);

  var match = api.handle('GET', '/users/bob?order=asc&limit=20');

  t.equal(match.handle, 'userCat');
  t.deepEqual(match.params, {
    name: 'bob'
  });
  t.deepEqual(match.query, {
    order: 'asc',
    limit: '20'
  })
  t.end();
});

test("can mix get and post handles", function (t){
  var api = API.New();

  api.add('userGET', GET);
  api.add('userPOST', POST);

  var match1 = api.handle('GET', '/users/bob');
  t.equal(match1.handle, 'userGET');

  var match2 = api.handle('POST', '/users/bob');
  t.equal(match2.handle, 'userPOST');
  t.end();
});
