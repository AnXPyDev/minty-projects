def("player", class extends Actor {
    constructor() {
        super(v(), "player");
        this.size = v(32);
    
        this.grav = 14;
        this.jumpspeed = 18;
        this.movespeed = 12;
        this.acceleration = v(2,2);

        this.sp = v();
    
        this.jumpTimer = 0;
        this.jumpTimerLength = 7;

    }
    tick() {
        let move = -Key.check("a") + Key.check("d");

        if(move != 0) {
            this.sp.x += this.acceleration.x * move;
        } else {
            this.sp.x -= this.acceleration.x * Math.sign(this.sp.x);    
        }

        this.sp.x = clamp(this.sp.x, -this.movespeed, this.movespeed);

        if(this.jumpTimer > 0) {
            this.jumpTimer -= dt;
            this.sp.y -= this.acceleration.y * dt;
        } else {
            this.sp.y += this.acceleration.y * dt;
        }

        this.sp.y = clamp(this.sp.y, -this.jumpspeed, this.grav);
	
        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.sp.x * dt, this.pos.y)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.sp.x * dt), this.pos.y)).is) {
                this.pos.x += Math.sign(this.sp.x * dt);
            }
            this.sp.x = 0;
        }

        this.pos.x += this.sp.x * dt;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.sp.y * dt)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.sp.y * dt))).is) {
                this.pos.y += Math.sign(this.sp.y * dt);
            }
            if(this.sp.y * dt > 0 && when(Key.check(" "))) {
                this.jumpTimer = this.jumpTimerLength;
            }
            this.sp.y = 0;
        }
        
        this.pos.y += this.sp.y * dt;

        
    }
    draw() {
        Draw.rect(this.size, this.pos, "fuchsia");
    }
})
