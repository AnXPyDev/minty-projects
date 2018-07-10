const s0 = new Scene(v(1024,576),
{
    player:[[]],
    cursor: [[]],
    block: [[v(64,64)], [v(-64,64)], [v(-64, -64)], [v(64, -64)]],
    enemy:[],
    spawner:[[]]
}, {
    main:[["bck_black"], "tiled"]
}, () => {
    bck.main.setScale(v(2,2));
    vport.resize(v(1024, 576))
}, () => {}, 60,60);

GAME.onload.set(function() {
    s0.load();
})

def("block", class extends Actor {
    constructor(pos) {
        super(pos, "block");
        this.size = v(32,32);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["block"], 6, 10);
        this.sprite.index = Random.int(0,this.sprite.len - 1);
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
        super(v(), "player");
        this.size = v(32, 32);
        this.mask = new Polygon("rect");
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


        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.spd.x * this.speed, this.pos.y)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is && i < this.spd.x * this.speed) {
                this.pos.x += Math.sign(this.spd.x);
                i++;
            }
            this.spd.x = 0;
        }

        this.pos.x += this.spd.x * this.speed;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is && i < this.spd.y * this.speed) {
                this.pos.y += Math.sign(this.spd.y);
                i++;
            }
            this.spd.y = 0;
        }
        
        this.pos.y += this.spd.y * this.speed;
    
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
}, undefined, ["solid"])

def("sword", class extends Actor {
    constructor(player_pos) {
        super(v(), "sword");
        this.pp = player_pos;
        this.apos = v();
        this.aangle = new Angle();
        this.apos.x = 64;
        this.size = v(64,10);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["sword"], 1, 0);
        this.depth = 100;    
    }
    tick() {
        let prevang = this.aangle.deg;
        this.aangle.between(this.pos.origin, Mouse)
        this.angle.interpolate(this.aangle, Key.check("mouse") ? 1 : 0.1);
        this.apos.toOrigin(this.pp);
        this.pos.copy(this.apos);
        this.pos.rotate(this.angle);
        if(Key.check("mouse")) {
            let angdiff = prevang - this.aangle.deg;
            if(Math.abs(angdiff) > 5) {
                Instance.spawn("sword_trail", [this.pos, this.angle, this.size.y]);
                let coll = collides(this, Instance.filter(["enemy"]));
                if(coll.is) {
                    Object.keys(coll.other).forEach(x => {
                        coll.other[x].forEach(e => {
                            Instance.destroy(x, e);
                        })
                    })
                }
            }
        }

        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }


}, undefined, ["weapon"]);

def("crossbow", class extends Actor {}, undefined, ["weapon"])

def("sword_trail", class extends Actor {
    constructor(pos, angle, width) {
        super(v(), "sword_trail");
        this.pos.copy(pos);
        this.angle.set(angle.deg);
        this.size = v(64,width);
        this.depth = 99;
    }
    tick() {
        this.size.x -= 5;
        this.size.y -= 5;
        if(this.size.x < 0) {
            Instance.destroy(this.name, this.id);
        }
    }
    draw() {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle.rad);
        ctx.fillRect(-this.size.x / 2, -this.size.y, this.size.x, this.size.y);
        ctx.restore();
    }
}, undefined, ["effect","trail"]);

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

def("enemy", class extends Actor {
    constructor(pos) {
        super(v(), "enemy");
        this.pos.copy(pos);
        this.size = v(32, 32);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["enemy"], 4, 2);
        this.speed = 4;
        this.spd = v();
        this.aa = new Angle("deg", 0);
    }
    tick() {
        this.aa.between(this.pos, Instance.get("player", 0).pos);
        this.spd = this.aa.dir(); 

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.spd.x * this.speed, this.pos.y)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is && i < this.spd.x * this.speed) {
                this.pos.x += Math.sign(this.spd.x);
                i++;
            }
            this.spd.x = 0;
        }

        this.pos.x += Math.round(this.spd.x * this.speed);

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is && i < this.spd.y * this.speed) {
                this.pos.y += Math.sign(this.spd.y);
                i++;
            }
            this.spd.y = 0;
        }
        
        this.pos.y += Math.round(this.spd.y * this.speed);
    
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size);
    }
}, undefined, ["enemy", "solid"]);

def("spawner", class extends Actor {
    constructor() {
        super(v(), "spawner");
        this.points = [v(-scene.size.x / 2, -scene.size.y / 2), v(scene.size.x / 2, -scene.size.y / 2), v(scene.size.x / 2, scene.size.y / 2), v(-scene.size.x / 2, scene.size.y / 2)];
        this.loop("spawn" ,() => {if(ins.enemy.length < 50) {Instance.spawn("enemy", [this.points[Random.int(0,3)]])}}, 30);   
    }
})

