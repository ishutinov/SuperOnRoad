var app;
var socket;
var id;
var player;
var mobile;
var players = [];
var lerpMag = .3;
var tileSize = 5;
var seq = 0;
var updates = [];

window.onload = function start() {
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  app = new PIXI.Application(800, 1000, {
    backgroundColor: 0xFFFFFF,
    antialias: true
  });
  document.body.appendChild(app.view);
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.top = 0;
  app.renderer.view.style.left = 0;

  openSocket();

  setupInput();

  update();

  var lastFrame = 0;

  function update() {
    requestAnimationFrame(update);
    var delta = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();

    if (player)
      player.update(delta);

    for (var i in players) {
      if (i != id) {
        players[i].setPos(
          lerp(players[i].getX(), players[i].update.x, lerpMag),
          lerp(players[i].getY(), players[i].update.y, lerpMag)
        );
        players[i].setRotation(
          lerp(players[i].getRotation(), players[i].update.rotation, lerpMag)
        );
      }
    }
  }

  if (isMobile.any)
    setupMobile();
}

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}