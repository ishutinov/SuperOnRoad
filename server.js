var express = require('express');
var app = express();
var server = require('http').createServer(app);
app.get('/', function(req, res) {
  res.sendFile(__dirname, 'public/index.html');
});
app.use(express.static('public'));
var port = process.env.PORT || 80;
server.listen(port);

var io = require('socket.io')(server);
var players = {};
var sprites = ['ambulance', 'audi', 'black_viper', 'car', 'mini_truck', 'mini_van', 'police', 'sedan', 'sonic', 'taxi', 'trashmaster', 'truck'];
var tileSize = 5;
var inputs = [];

io.on('connection', function(socket) {
  socket.emit('initialize', socket.id);

  socket.on('disconnect', function() {
    delete players[socket.id];
    io.emit('destroy', socket.id);
  });

  socket.on('input', function(data) {
    inputs.push(data);
  });

  socket.on('level', function(data) {
    players[socket.id] = new Player(loadLevel(data));
    io.emit('create', players);
  });

});

var Player = function(level) {
  this.speed = 5;
  this.turn = .05;
  this.x = level.startX;
  this.y = level.startY;
  this.rotation = 1.5708;
  this.type = sprites[getRandomInt(0, sprites.length - 1)];
  this.level = level;
  this.boostVel = 2;
  this.boostVal = 1;
  this.boostDuration = 500;
  this.boostCooldown = 1000;
  this.updateData;
}

var tps = 60;
const gameloop = require('node-gameloop');
const id = gameloop.setGameLoop(function(deltaTime) {
    var len = inputs.length;
    for (var i = 0; i < len; i++) {
      var data = inputs.shift();
      var player = players[data.id];
      if (player) {
        player.rotation = player.rotation + (-data.left + data.right) * player.turn * data.delta;
        var x = player.x + (data.forward - data.back) * player.speed * player.boostVal * Math.sin(player.rotation) * data.delta;
        var y = player.y - (data.forward - data.back) * player.speed * player.boostVal * Math.cos(player.rotation) * data.delta;
        if (player.level.contains(x, y)) {
          player.x = x;
          player.y = y;
        }
        player.updateData = {
          id: data.id,
          x: player.x,
          y: player.y,
          rotation: player.rotation,
          seq: data.seq
        };
      }
    }
    var update = [];
    for (var i in players) {
      if (players[i].updateData)
        update.push(players[i].updateData);
    }
    if (update.length > 0)
      io.emit('update', update);
  },
  1000 / tps);


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadLevel(level) {
  if (level == 1)
    return new Level1();

  function Level1() {
    var map = "\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#################$\
################X                                                                                                                               X################$\
###############X                                                                                                                                 X###############$\
##############X                                                                                                                                   X##############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                          X#############$\
#############X                         X#################################################################################X                         X#############$\
#############X                        X###################################################################################X                        X#############$\
#############X                       X#####################################################################################X                       X#############$\
#############X                      X#######################################################################################X                      X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                     X#########################################################################################X                     X#############$\
#############X                      X#######################################################################################X                      X#############$\
#############X                       X#####################################################################################X                       X#############$\
#############X                        X###################################################################################X                        X#############$\
#############X                         X#################################################################################X                         X#############$\
#############X                          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                          X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
##############X                                                                                                                                   X##############$\
###############X                                                                                                                                 X###############$\
################X                                                                                                                               X################$\
#################XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX#################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$\
#################################################################################################################################################################$";
    this.bounds = load(map);
    this.startX = 200;
    this.startY = 150;
    this.contains = function(x, y) {
      return (this.bounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)])
    }

  }

  function load(map) {
    var bounds = {};
    var x = 0;
    var y = 0;
    for (var i = 0; i < map.length; i++) {
      if (map[i] == '$') {
        x = -tileSize;
        y += tileSize;
      } else if (map[i] == ' ') {
        bounds[x / tileSize + "," + y / tileSize] = true;
      }
      x += tileSize;
    }
    return bounds;
  }
}