function Player(x, y, rotation, speed, turn, type, levelBounds) {
  this.truck = new Truck(type);
  this.truck.spawnAt(200, 150);
  this.seq = 0;
  this.updates = [];
  this.lastUpdate = false;
  this.speed = speed;
  this.turn = turn;
  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.type = type;
  this.levelBounds = levelBounds;
  this.boostVel = 2;
  this.boostVal = 1;
  this.boostDuration = 1000;
  this.boostCooldown = 3000;
  this.boostStart = 0;
  this.boostEnd = 0;
  this.update = function(delta) {
    var updateData = player.truck.update;
    if (updateData.seq != this.lastUpdate.seq) {
      this.lastUpdate = updateData;
      this.x = updateData.x;
      this.y = updateData.y;
      this.rotation = updateData.rotation;
      for (var i = updateData.seq; i < this.seq; i++) {
        console.log(i);
        player.updatePos(this.updates[i]);
      }
    }
    var data = {
      forward: +forward.isDown,
      back: +back.isDown,
      left: +left.isDown,
      right: +right.isDown,
      boost: +boost.isDown,
      delta: delta,
      time: Date.now(),
      seq: this.seq++
    };
    this.updates.push(data);
    this.updatePos(data);
    socket.emit('input', data);
  }
  this.updatePos = function(data) {
    if (this.boostStart == 0 && data.boost) {
      //if (this.boostEnd == 0 || data.time - this.boostEnd >= this.boostCooldown) {
      this.boostVal = this.boostVel;
      this.boostStart = data.time;
      //}
    } else {
      if (data.time - this.boostStart >= this.boostDuration) {
        this.boostVal = 1;
        this.boostEnd = data.time;
        this.boostStart = 0;
      }
    }
    this.rotation = this.rotation + (-data.left + data.right) * this.turn * data.delta;
    var x = this.x + (data.forward - data.back) * this.speed * this.boostVal * Math.sin(this.rotation) * data.delta;
    var y = this.y - (data.forward - data.back) * this.speed * this.boostVal * Math.cos(this.rotation) * data.delta;
    if (this.levelBounds[Math.round(x / tileSize) + "," + Math.round(y / tileSize)]) {
      this.x = x;
      this.y = y;
    }
  }
  this.show = function() {
    this.truck.setPos(this.x, this.y);
    this.truck.setRotation(this.rotation);
  }
}