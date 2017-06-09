function level1() {
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0x784800);
    this.shape.drawEllipse(0, 0, 250, 250);
    this.shape.endFill();
    this.shape.x = app.renderer.width / 2; // - this.shape.width / 2;
    this.shape.y = app.renderer.height / 2; // - this.shape.height / 2;
    app.stage.addChild(this.shape);

    this.shape2 = new PIXI.Graphics();
    this.shape2.beginFill(0xFFFFFF);
    this.shape2.drawEllipse(0, 0, 150, 150);
    this.shape2.endFill();
    this.shape2.x = app.renderer.width / 2;
    this.shape2.y = app.renderer.height / 2;
    app.stage.addChild(this.shape2);

    this.startX = this.shape.x - this.shape.width / 2 + 100;
    this.startY = this.shape.y - this.shape.height / 2 + 100;
    this.centerX = this.shape.x;
    this.centerY = this.shape.y;
    this.radius = this.shape.width / 2;

    this.contains = function (w, x, y) {
        var a = x - this.centerX;
        var b = y - this.centerY;

        var c = Math.sqrt(a * a + b * b);
        if (c < this.radius - w / 2 && c > this.radius - this.shape2.width / 2 + w * 2)
            return true;
        else
            return false;
    }
}

function level2() {
    var draw = "\
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
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                                                                                                                     X#############$\
#############X                                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                  X#############$\
#############X                                 X#################################################################X                                 X#############$\
#############X                                X###################################################################X                                X#############$\
#############X                               X#####################################################################X                               X#############$\
#############X                              X#######################################################################X                              X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                             X#########################################################################X                             X#############$\
#############X                              X#######################################################################X                              X#############$\
#############X                               X#####################################################################X                               X#############$\
#############X                                X###################################################################X                                X#############$\
#############X                                 X#################################################################X                                 X#############$\
#############X                                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                  X#############$\
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
#################################################################################################################################################################$";
    var boundsX = [];
    var boundsY = [];
    var x = 0;
    var y = 0;
    for (var i = 0; i < draw.length; i++) {
        if (draw[i] == '$') {
            x = -tileSize;
            y += tileSize;
        } else if (draw[i] == '#') {
            var shape = new PIXI.Graphics();
            shape.beginFill(0x784800);
            shape.drawRect(x, y, tileSize, tileSize);
            shape.endFill();
            app.stage.addChild(shape);
        } else if (draw[i] == 'X') {
            var shape = new PIXI.Graphics();
            shape.beginFill(0x000000);
            shape.drawRect(x, y, tileSize, tileSize);
            shape.endFill();
            app.stage.addChild(shape);
        } else if (draw[i] == ' ') {
            boundsX.push(x / tileSize);
            boundsY.push(y / tileSize);
        }
        x += tileSize;
    }
    this.startX = 200;
    this.startY = 150;
    this.contains = function (x, y) {
        console.log(x + " " + y);
        x = Math.round(x / tileSize);
        y = Math.round(y / tileSize);
        console.log(x + " " + y);
        for (i = 0; i < boundsX.length; i++) {
            if (boundsX[i] == x && boundsY[i] == y)
                return true;
        }
        return false;
    }
}
