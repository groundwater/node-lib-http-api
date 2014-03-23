var test = require('tap').test;
var API  = require('../index.js')();

test("full request", function (t){
  var iface = {
    method  : 'GET',
    route   : '/users/:name/cat/:category',
    options : {
      order: 'desc',
      limit: 100
    }
  };

  var api = API.New();

  api.add('userCat', iface);

  var params = {name: 'bob', category: 'new'};
  var opts   = {limit: 40, age: 150};
  var out    = api.request('userCat', params, opts);

  t.equal(out.path, '/users/bob/cat/new?order=desc&limit=40&age=150');
  t.equal(out.method, 'GET');
  t.end();
});
