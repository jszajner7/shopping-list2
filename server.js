/* #1 requiering external resourses*/
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


/* #2 creating objects and constructors*/
var Storage = {
  add: function(name) {
    var item = {
      name: name,
      id: this.setId
    };
    this.items.push(item);
    this.setId += 1;
    return item;
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));



/* #3 api end points */
app.get('/items', function(request, response) {
  response.json(storage.items);
});
app.post('/items', jsonParser, function(request, response) {
  if (!('name' in request.body)) {
    return response.sendStatus(400);
  }
  var item = storage.add(request.body.name);
  response.status(201).json(item);
});
app.delete('/items/:id', jsonParser, function(request, response) {
  if (!request.body) {
    return response.sendStatus(400);
  }
  var item = storage.delete(request.params.id);
  response.status(200).json(item);
});
app.put('/items/:id/:name', jsonParser, function(request, response) {
    //if there is a PUT, but no body, send a 400 error
    if (!request.body) {
        return response.sendStatus(400);
    }
    var id = request.params.id;
    var name = request.params.name;
    //gets the item request name, creates a new object, calls add method, sends response 200 'ok'
    var item=storage.update(id,name);
    response.status(200).json(item);
});

/* #4 server settings*/
app.listen(process.env.PORT || 8080, process.env.IP);