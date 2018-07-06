const s0 = new Scene(v(1024,1024),
{
    box:[[v()],[v(32,32)],[v(64,64)],[v(0,64)]],
    player:[[]],
    cursor: [[]]
}, {
    main:[["bck_black"], "tiled"]
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
}, undefined, ["solid","enemy"]);

def("player", class extends Actor {
    constructor() {
        super(v(-100,0), "player");
        this.size = v(32, 32);
        this.mask = new Polygon();
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["player"], 4, 2);
        this.speed = 4;
        this.spd = v();
        this.lastpos = v();
        Instance.spawn("sword", [this.pos]);
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

        let cc = 0;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.spd.x * this.speed, this.pos.y)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is) {
                this.pos.x += Math.sign(this.spd.x);
            }
            this.spd.x = 0;
        }

        this.pos.x += this.spd.x * this.speed;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed)).is) {
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is) {
                this.pos.y += Math.sign(this.spd.y);
            }
            this.spd.y = 0;
        }
        
        this.pos.y += this.spd.y * this.speed;
    
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
})

def("sword", class extends Actor {
    constructor(player_pos) {
        super(v(), "sword");
        this.pp = player_pos;
        this.apos = v();
        this.aangle = new Angle();
        this.apos.x = 64;
        this.size = v(64,10);
        this.mask = new Polygon();
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["sword"], 1, 0);
    }
    tick() {
        let prevang = this.aangle.deg;
        this.aangle.between(this.pos.origin, Mouse)
        this.angle.interpolate(this.aangle, 0.5);
        this.apos.toOrigin(this.pp);
        this.pos.copy(this.apos);
        this.pos.rotate(this.angle);
        
        if(Math.abs(prevang - this.aangle.deg) > 30) {
            let coll = collides(this, Instance.filter(["enemy"]));
            if(coll.is) {
                Object.keys(coll.other).forEach(x => {
                    coll.other[x].forEach(e => {
                        Instance.destroy(x, e);
                    })
                })
            }
        }

        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }


}, undefined, ["weapon"]);

def("cursor", class extends Actor {
    constructor() {
        super(Mouse, "cursor");
        this.sprite = new Sprite(["cursor"], 1, 0);
        this.depth = 1000;
        this.size = v(8,8);
    }
    tick() {
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size)
    }
})