# lib-http-api

## install

```bash
npm install --save lib-http-api
```

## usage

define an interface

```javascript
var search = {
  method : 'GET',
  route  : '/search/:query',
  options: {
    limit: 100,
    order: 'asc'
  }
};
```

create the api

```javascript
var API = require('lib-http-api')();
var api = API.New();

api.add('search', search);
```

create the client request

```javascript
api.request('search', {query: 'spicy+noodles'}, {order: 'desc'});
// { path   : '/search/spicy+noodles?order=desc&limit=100',
//   method : 'GET',
//   host   : 'localhost',
//   port   : 100 }
```

switch off a server request

```javascript
api.handle('GET', '/search/spicy+noodles?order=desc&limit=100');
// search
```

You'll want to associate the tokens returned with route handlers.

## see also

- [lib-route-generator](https://github.com/groundwater/node-lib-route-generator)
- [lib-route-matcher](https://github.com/groundwater/node-lib-route-matcher)
