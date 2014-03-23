"use strict";

var assert = require('assert');
var url    = require('url');

function RequestAPI() {
  this.host    = null;
  this.port    = 0;
}

function pathify(route, opts) {
  Object.keys(opts).forEach(function (key) {
    route = route.replace(':' + key, opts[key]);
  });

  return route;
}

function querify(options, opts) {
  var out = {};

  Object.keys(options).forEach(function (key) {
    if (opts[key]) out[key] = opts[key];
    else out[key] = options[key];
  });

  return out;
}

function makePath(path, query) {
  var out = [];
  Object.keys(query).forEach(function (key){
    out.push(key + '=' + query[key]);
  });

  if (out.length > 0) path += '?' + out.join('&');

  return path;
}

RequestAPI.prototype.encode = function formatClient(iface, opts) {
  var $ = this.$;

  var options = iface.options;
  var route   = iface.route;
  var method  = iface.method;
  var path    = $.pathify(iface.route, opts);
  var query   = $.querify(options, opts);

  if (path.indexOf(':') >= 0) throw new Error('unconsumed token');

  var out = {
    host   : this.host,
    port   : this.port,
    path   : $.makePath(path, query),
    method : method
  };

  return out;
};

RequestAPI.NewEmpty = function () {
  var req = new RequestAPI();
  Object.defineProperty(req, "$", {value: this});
  return req;
};

RequestAPI.New = function () {
  var api = this.NewEmpty();

  return api;
};

function inject(deps) {
  return Object.create(RequestAPI, deps);
}

function defaults() {
  var deps = {
    Tokenizer: {
      value: require('./tokenizer.js')
    },
    pathify: {value: pathify},
    querify: {value: querify},
    makePath: {value: makePath},
  };
  return inject(deps);
}

module.exports = function INIT(deps) {
  if (typeof deps === 'object') return inject(deps);
  else if (deps === undefined)  return defaults();
  else                          throw new Error('injection error');
};
module.exports.RequestAPI = RequestAPI;
