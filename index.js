"use strict";

var assert = require('assert');

function API() {
  this.handles = {};
  this.host    = null;
  this.port    = 0;
  this.matches = {};
}

/*

  Add a handle that represents the given interface

    1. handles must be unique
    2. handles must be tokens

*/
API.prototype.add = function add(handle, iface) {
  var props = {};
  var opts = iface.options || {};

  this.handles[handle] = {
    iface     : iface,
    generator : this.$.Generator.NewFromString(iface.route),
  };

  var method = iface.method;
  var matches = this.matches;

  if (!matches[method]) matches[method] = this.$.Matcher.New();

  matches[method].add(iface.route, handle);
};

/*

  Generate an http request object for the associated handle,
  given the params and options object.

*/
API.prototype.request = function request(handle, params, options) {
  var face = this.handles[handle];
  assert(face, 'interface "' + handle + '" does not exit');

  var gen  = face.generator;

  var base = face.iface.options || {};
  var opts = this.$.shadow(options || {}, base);

  var out = {
    path   : gen.format(params, opts),
    method : face.iface.method,
    host   : this.host,
    port   : this.port,
  };

  return out;
};

/*

  Return the handle associated with the method, and path

  The returned value includes the handle, and the parsed query

*/
API.prototype.handle = function handle(method, path) {
  var matcher = this.matches[method];

  var out;
  if (matcher) out = matcher.match(path);
  else         out = null;

  return out;
};

API.NewEmpty = function NewEmpty() {
  var api = new API();

  Object.defineProperty(api, '$', {
    value: this
  });

  return api;
};

API.New = function New(port, host) {
  var api = this.NewEmpty();

  api.host    = host;
  api.port    = port;

  return api;
};

function shadow(top, base) {
  var out = {};

  Object.keys(base).forEach(function (key) {
    out[key] = base[key];
  });

  Object.keys(top).forEach(function (key) {
    out[key] = top[key];
  });

  return out;
}

function inject(deps) {
  return Object.create(API, deps);
}

function defaults() {
  var deps = {
    Generator: {
      value: require('lib-route-generator')()
    },
    Matcher: {
      value: require('lib-route-matcher')()
    },
    shadow: {
      value: shadow
    }
  };
  return inject(deps);
}

module.exports = function INIT(deps) {
  if (typeof deps === 'object') return inject(deps);
  else if (deps === undefined)  return defaults();
  else                          throw new Error('injection error');
};
