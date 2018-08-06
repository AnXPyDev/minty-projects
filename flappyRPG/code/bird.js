def("bird", class extends Actor {
    constructor() {
        super(v(), "bird");
        this.size = v(25 * 2, 14 * 2);

        this.grav = 20;
        this.jumpspeed = 10;

        this.jumpTimer = 0;
        this.jumpTimerLen = 15;
        this.acc = 3;
        
        this.sp = v();

        this.ang = 0;
        this.angacc = 10;

        this.sprite = new Sprite(["bird_yellow"], 1, 0);
    }
    tick() {
        
        this.jumpTimer = clamp(this.jumpTimer - 1, 0, this.jumpTimerLen);
        
        if(this.jumpTimer != 0) {
            this.sp.y -= this.acc;
            this.ang -= this.angacc;
        } else {
            this.sp.y += this.acc;
            this.ang += this.angacc;
        }

        this.sp.y = clamp(this.sp.y, -this.jumpspeed, this.grav);
        this.ang = clamp(this.ang, -45, 45);
        
        if(when(Key.check(" "))) {
            this.jumpTimer = this.jumpTimerLen;
        }

        this.angle.set(this.ang);
        this.pos.y += this.sp.y;

        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
})