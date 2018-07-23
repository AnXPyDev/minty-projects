def("player", class extends Actor {
    constructor() {
        super(v(), "player");
        this.speed = 4;
        this.spd = v();
        this.size = v(32,32);
    }
    tick() {
        this.spd.x = function() {
            if (Key.check("a") && Key.check("d")) {
                return 0
            } else if (Key.check("a")) {
                return -1;
            } else if (Key.check("d")) {
                return 1;
            } else {
                return 0;
            }
        }()

        this.spd.y = function() {
            if(Key.check(" ")) {
                return -scene.vars.gravity;
            } else {
                return scene.vars.gravity;
            }
        }();

        if(collides(this, Instance.filter(["solid", "static"]), v(this.pos.x + this.spd.x * this.speed * dt, this.pos.y)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid", "static"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is && i < this.spd.x * this.speed  * dt) {
                this.pos.x += Math.sign(this.spd.x);
                i++;
            }
            this.spd.x = 0;
        }

        this.pos.x += this.spd.x * this.speed * dt;

        if(collides(this, Instance.filter(["solid", "static"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed * dt)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid", "static"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is && i < this.spd.y * this.speed * dt) {
                this.pos.y += Math.sign(this.spd.y);
                i++;
            }
            this.spd.y = 0;
        }
        
        this.pos.y += this.spd.y * this.speed * dt;

    }
    draw() {
        Draw.rect(this.size, this.pos, "green");
    }
}, ["solid","dynamic"])