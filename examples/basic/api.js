var API = require('../../index.js')();

/*

  Create your interface

*/
var ifaces = {
  getUser: {
    method: 'GET',
    route: '/user/:name'
  },
  setUser: {
    method: 'PUT',
    route: '/user/:name'
  },
  listUsers: {
    method: 'GET',
    route: '/users',
    options: {
      limit: 2
    }
  }
};

var api = API.New(8080, 'localhost');

// add interfaces
for (key in ifaces) {
  api.add(key, ifaces[key]);
}

module.exports = api;
