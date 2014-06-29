var test = require('tap').test;
var API  = require('../index.js')();
var assert = require('assert')

var GET = {
  method  : 'GET',
  route   : '/users/:name',
  options : {
    order: 'desc',
    limit: 100
  }
};


test("derive handle", function (t){
  var api = API.New();

  api.add('user', GET);

  t.throws(function(){
    api.request('user')
  }, new assert.AssertionError({message: 'params cannot be empty'}))

  t.end()
});
