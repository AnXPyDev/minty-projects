const s0 = new Scene(v(1024,1024),
{
    box:[[v()],[v(32,32)],[v(64,64)],[v(0,64)]],
    player:[[]]
}, {
    main:[["bck_wood"], "tiled"]
}, () => {
    bck.main.setScale(v(2,2));
}, () => {}, 60,60);

GAME.onload.set(function() {
    s0.load();
})

def("box", class extends Actor {
    constructor(pos) {
        super(pos, "box");
        this.size = v(32,32);
        this.mask = new Polygon();
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["box"], 1, 0);
    }
    tick() {
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
}, undefined, ["solid"]);

def("player", class extends Actor {
    constructor() {
        super(v(-100,0), "player");
        this.size = v(32, 32);
        this.mask = new Polygon();
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["box"], 1, 0);
        this.speed = 1;
        this.spd = v();
        this.lastpos = v();
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
            if (Key.check("w") && Key.check("s")) {
                return 0
            } else if (Key.check("w")) {
                return -1;
            } else if (Key.check("s")) {
                return 1;
            } else {
                return 0;
            }

        }()

        
        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.spd.x * this.speed, this.pos.y)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is) {
                this.pos.x += Math.sign(this.spd.x);
            }
            this.spd.x = 0;
        }

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is) {
                this.pos.y += Math.sign(this.spd.y);
            }
            this.spd.y = 0;
        }

        if(this.spd.x != 0 || this.spd.y != 0) {
            let off = Random.int(-1, 1);
            console.log(off)
            bck.main.setOffset(v(off,off));
        } else {
            bck.main.setOffset(v());
        }

        this.pos.x += this.spd.x * this.speed;
        this.pos.y += this.spd.y * this.speed;
    
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
})

