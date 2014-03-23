var test = require('tap').test;
var API  = require('../index.js')();

test("simple request", function (t){
  var iface = {
    method  : 'GET',
    route   : '/',
  }
  var api = API.New(100, 'localhost');

  api.add(1, iface);
  var req = api.request(1, {});

  t.equal(req.path, '/');
  t.equal(req.method, 'GET');
  t.equal(req.host, 'localhost');
  t.equal(req.port, 100);

  t.end();
});

test("second request", function (t){
  var iface = {
    method  : 'POST',
    route   : '/user',
  }
  var api = API.New();

  api.add(1, iface);
  var req = api.request(1, {});

  t.equal(req.path, '/user');
  t.equal(req.method, 'POST');

  t.end();
});

test("request with parameter", function (t){
  var iface = {
    method  : 'POST',
    route   : '/:id',
  }
  var api = API.New();

  api.add(1, iface);
  var req = api.request(1, {id: 'bob'});

  t.equal(req.path, '/bob');
  t.equal(req.method, 'POST');

  t.end();
});

test("request with options", function (t){
  var iface = {
    method  : 'POST',
    route   : '/',
    options: {
      name: 'bob'
    }
  }
  var api = API.New();

  api.add(1, iface);
  var req = api.request(1, {}, {name: 'jacob'});

  t.equal(req.path, '/?name=jacob');
  t.equal(req.method, 'POST');

  t.end();
});

test("request applies default options", function (t){
  var iface = {
    method  : 'POST',
    route   : '/',
    options: {
      name: 'jacob'
    },
  }
  var api = API.New();

  api.add(1, iface);
  var req = api.request(1, {});

  t.equal(req.path, '/?name=jacob');
  t.equal(req.method, 'POST');

  t.end();
});
