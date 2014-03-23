var assert = require('assert');

var test = require('tap').test;
var API  = require('../index.js')();

var iface = {
  method  : 'GET',
  route   : '/users/:name/cat/:category',
  options : {
    order: 'desc',
    limit: 100
  }
};

test("full request", function (t){
  var api = API.New();

  t.throws(function () {
    api.add('userCat');
  });

  t.throws(function () {
    api.request('userCat', {}, {});
  });

  api.add('user', iface);

  t.throws(function () {
    api.request('user');
  });

  t.throws(function () {
    api.request('userCat', {name: 'bob'}, {});
  });

  t.end();
});
