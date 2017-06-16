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

io.on('connection', function(socket) {
	socket.emit('initialize', socket.id);

	socket.on('disconnect', function() {
		delete players[socket.id];
		io.emit('destroy', socket.id);
	});

	socket.on('key', function(key) {
		if (players[socket.id])
			players[socket.id].input(key);
	});

	socket.on('level', function(data) {
		players[socket.id] = new Player(socket.id, 200, 150, 1.5708, sprites[getRandomInt(0, sprites.length - 1)], loadLevel(data));
		io.emit('create', players);
	});

});

var Player = function(id, x, y, rotation, type, level) {
	this.id = id;
	this.speed = 300;
	this.turn = 3;
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.type = type;
	this.level = level;
	this.forward = 0;
	this.back = 0;
	this.left = 0;
	this.right = 0;
	this.boostVel = 2;
	this.boostVal = 1;
	this.boostDuration = 1000;
	this.boostCooldown = 3000;
	this.boostStart = 0;
	this.boostEnd = 0;
	this.input = function(data) {
		if (data == 'pressForward')
			this.forward = this.speed;
		if (data == 'releaseForward')
			this.forward = 0;
		if (data == 'pressBack')
			this.back = this.speed;
		if (data == 'releaseBack')
			this.back = 0;
		if (data == 'pressLeft')
			this.left = -this.turn;
		if (data == 'releaseLeft')
			this.left = 0;
		if (data == 'pressRight')
			this.right = this.turn;
		if (data == 'releaseRight')
			this.right = 0;
		if (data == 'boost')
			this.boost();
	}
	this.boost = function() {
		if (this.boostStart == 0)
			if (this.boostEnd == 0 || Date.now() - this.boostEnd >= this.boostCooldown) {
				this.boostVal = this.boostVel;
				this.boostStart = Date.now();
			}
	}
}

const gameloop = require('node-gameloop');
let frameCount = 0;
const id = gameloop.setGameLoop(function(delta) {
	for (var i in players) {
		players[i].rotation = players[i].rotation + (players[i].left + players[i].right) * delta;
		if (players[i].boostStart > 0 && Date.now() - players[i].boostStart > players[i].boostDuration) {
			players[i].boostVal = 1;
			players[i].boostStart = 0;
			players[i].boostEnd = Date.now();
		}
		var x = players[i].x + (players[i].forward - players[i].back) * players[i].boostVal * delta * Math.sin(players[i].rotation);
		var y = players[i].y - (players[i].forward - players[i].back) * players[i].boostVal * delta * Math.cos(players[i].rotation);

		if (players[i].level)
			if (players[i].level.contains(x, y)) {
				players[i].x = x;
				players[i].y = y;
			}
		io.emit('update', {
			id: players[i].id,
			x: players[i].x,
			y: players[i].y,
			rotation: players[i].rotation
		});
	}
}, 1000 / 60);


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