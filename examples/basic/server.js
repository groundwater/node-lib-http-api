var api = require('./api.js');
/*

  Create a server class to handle incoming requests

*/
function Server() {
  this.users = {};
}

Server.prototype.getUser = function (req, res, params, query) {
  var name = params.name;
  var user = this.users[name];
  if (user)
    res.end('user ' + name + ' exists');
  else
    res.end('no user');
};

Server.prototype.setUser = function (req, res, params, query) {
  var name = params.name;
  this.users[name] = true;
  res.end('set user ' + name);
};

Server.prototype.listUsers = function (req, res, params, query) {
  var limit = query.limit;

  var items = 0;
  for(key in this.users) {
    if (++items > limit) break;

    res.write(key + '\n');
  }
  res.end();
};

/*

  Wire everything together

*/

var server = new Server();

server.name = 'bob';

var http = require('http');
var sock = http.createServer(function (req, res) {
  var route = api.handle(req.method, req.url);

  if (!route) {
    res.statusCode = 404;
    res.end('No Route: ' + req.url + '\n');

    return;
  }

  server[route.handle](req, res, route.params, route.query);
});

sock.listen(8080);
