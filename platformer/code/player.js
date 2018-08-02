def("player", class extends Actor {
    constructor() {
        super(v(), "player");
        this.size = v(32);
    
        this.grav = 14;
        this.jumpspeed = 18;
        this.movespeed = 8;
        this.acceleration = v(1,2);

        this.sp = v();
    
        this.jumpTimer = 0;
        this.jumpTimerLength = 8;

    }
    tick() {
        let move = -Key.check("a") + Key.check("d");
        console.log(move);

        if(move != 0) {
            this.sp.x += this.acceleration.x * move;
        } else {
            this.sp.x -= this.acceleration.x * Math.sign(this.sp.x);    
        }

        this.sp.x = clamp(this.sp.x, -this.movespeed, this.movespeed);

        if(this.jumpTimer > 0) {
            this.jumpTimer --;
            this.sp.y -= this.acceleration.y;
        } else {
            this.sp.y += this.acceleration.y;
        }

        this.sp.y = clamp(this.sp.y, -this.jumpspeed, this.grav);

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.sp.x, this.pos.y)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.sp.x), this.pos.y)).is) {
                this.pos.x += Math.sign(this.sp.x);
            }
            this.sp.x = 0;
        }

        this.pos.x += this.sp.x;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.sp.y)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.sp.y))).is) {
                this.pos.y += Math.sign(this.sp.y);
            }
            if(this.sp.y > 0 && when(Key.check(" "))) {
                this.jumpTimer = this.jumpTimerLength;
            }
            this.sp.y = 0;
        }
        
        this.pos.y += this.sp.y;

        
    }
    draw() {
        Draw.rect(this.size, this.pos, "fuchsia");
    }
})