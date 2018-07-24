def("player", class extends Actor {
    constructor() {
        super(v(), "player");
        this.speed = 4;
        this.jumpspeed = 20;
        this.spd = v();
        this.size = v(32,32);

        this.isJump = false;
    }
    tick() {
        this.key_left = -Key.check("a");
        this.key_right = Key.check("d");
        this.key_jump = false;
        
        when(Key.check(" "), () => {
            this.key_jump = true;
        })

        this.move = this.key_left + this.key_right;
        this.spd.x = this.speed * this.move;
        if(this.spd.y < 10) {this.spd.y += scene.vars.gravity}

        if(collides(this, Instance.filter(["solid", "static"]), v(this.pos.x, this.pos.y + 1)).is) {
            this.spd.y = this.key_jump * -this.jumpspeed;
        }

        if(collides(this, Instance.filter(["solid", "static"]), v(this.pos.x + this.spd.x, this.pos.y)).is) {
            while(!collides(this, Instance.filter(["solid", "static"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is) {
                this.pos.x += Math.sign(this.spd.x);
            }
            this.spd.x = 0;
        }

        this.pos.x += this.spd.x;

        if(collides(this, Instance.filter(["solid", "static"]), v(this.pos.x, this.pos.y + this.spd.y)).is) {
            while(!collides(this, Instance.filter(["solid", "static"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is) {
                this.pos.y += Math.sign(this.spd.y);
            }
            this.spd.y = 0;
        }

        this.pos.y += this.spd.y;

    }
    draw() {
        Draw.rect(this.size, this.pos, "green");
    }
}, ["solid","dynamic"])