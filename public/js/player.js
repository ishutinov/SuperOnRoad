function player(id) {
    this.id = id;
    this.speed = 10;
    this.turn = .1;
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

    this.sprite = new truck(id);
    if (level) {
        this.sprite.spawnAt(level.startX, level.startY);
    } else {
        this.sprite.spawnAt(app.renderer.width / 2, app.renderer.height / 2);
    }
    this.sprite.setTint(getRandomColor());

    this.update = function() {
        if (this.left + this.right != 0) {
            this.sprite.setRotation(this.sprite.getRotation() + (this.left + this.right));
            info = {
                id: this.id,
                x: this.sprite.getX(),
                y: this.sprite.getY(),
                rotation: this.sprite.getRotation()
            };
            socket.emit('update', info);
        }
        if (this.forward + this.back != 0) {
            var x = Math.round(this.sprite.getX() + ((this.forward + this.back) * this.boostVal) * Math.cos(this.sprite.getRotation()));
            var y = Math.round(this.sprite.getY() + ((this.forward + this.back) * this.boostVal) * Math.sin(this.sprite.getRotation()));
            if (level) {
                if (level.contains(x, y)) {
                    this.sprite.setPos(x, y);
                }
            } else {
                this.sprite.setPos(x, y);
            }
            info = {
                id: this.id,
                x: this.sprite.getX(),
                y: this.sprite.getY(),
                rotation: this.sprite.getRotation()
            };
            socket.emit('update', info);
        }

        if (this.boostStart > 0 && Date.now() - this.boostStart > this.boostDuration) {
            this.boostVal = 1;
            this.boostStart = 0;
            this.boostEnd = Date.now();
        }
    }

    this.pressForward = function() {
        this.forward = this.speed;
    }
    this.pressLeft = function() {
        this.left = -this.turn;
    }
    this.pressBack = function() {
        this.back = -this.speed;
    }
    this.pressRight = function() {
        this.right = this.turn;
    }
    this.releaseForward = function() {
        this.forward = 0;
    }
    this.releaseLeft = function() {
        this.left = 0;
    }
    this.releaseBack = function() {
        this.back = 0;
    }
    this.releaseRight = function() {
        this.right = 0;
    }
    this.boost = function() {
        if (this.boostEnd == 0 || Date.now() - this.boostEnd >= this.boostCooldown) {
            this.boostVal = this.boostVel;
            this.boostStart = Date.now();
        }
    }

    setupInput();
    this.initialized = true;

    function getRandomColor() {
        var c = '';
        while (c.length < 7) {
            c += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return '0x' + c;
    }
}