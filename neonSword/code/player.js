const s0 = new Scene("s0",v(1024,576),
{
    player:[[]],
    cursor: [[]],
    enemy:[],
    spawner:[[]],
    collisionblock:cfg.s0.collisionblock
}, {
    bkg:[["noimage"], "solid", "black"],
    main:[["bck_black"], "tiled"]
},{
    "block.main":cfg.s0["block.main"]
}, () => {
    bck.main.setScale(v(2,2));
    bck.main.margin = v(16);
    vport.resize(v(1024, 576))
}, () => {}, 60,60);

const LIGHT = new Sprite(["light"], 1, 0);

GAME.onbeforetick = function() {
    LIGHT.update();
    camera.angle.set(Math.sin(new Date() / 1000) * 1 - 0.5);
    camera.scale.x = camera.scale.y = 1 +  (Math.sin(new Date() / (1000  * (1 / dt))) * 0.025 - 0.0125);
    
    if(scene.name == "s0") {
        if(!Key.check("shift")) {
            camera.pos.x = lerp(camera.pos.x, ins.player[0].pos.x, 0.05 * dt);
            camera.pos.y = lerp(camera.pos.y, ins.player[0].pos.y, 0.05 * dt);
        } else {
            camera.pos.x = lerp(camera.pos.x, lerp(ins.player[0].pos.x, Mouse.x, 0.75), 0.05 * dt);
            camera.pos.y = lerp(camera.pos.y, lerp(ins.player[0].pos.y, Mouse.y, 0.75), 0.05 * dt);
        }
    }
}

function insertDraw(fn, depth)  {
    $MAIN.cLAY.insert(new Layer(depth, fn));
}

def("player", class extends Actor {
    constructor() {
        super(v(), "player");
        this.size = v(32, 32);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["player"], 4, 2);
        this.speed = 8;
        this.spd = v();
        this.lastpos = v();
        this.weapons = ["sword", "crossbow", "shotgun"];
        this.weapon = 0;
        this.depth = 10;
        Instance.spawn("sword", [this.pos]);
        Instance.spawn("crossbow", [this.pos]);
        Instance.spawn("shotgun", [this.pos]);
        Instance.get("crossbow", 0).togglePause();
        Instance.get("shotgun", 0).togglePause();
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

        when(Key.check("q"), () => {
            Instance.get(this.weapons[this.weapon], 0).togglePause();
            this.weapon = wrap_np(this.weapon + 1, 0 ,2);
            Instance.get(this.weapons[this.weapon], 0).togglePause();
        })

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.spd.x * this.speed * dt, this.pos.y)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is && i < this.spd.x * this.speed  * dt) {
                this.pos.x += Math.sign(this.spd.x);
                i++;
            }
            this.spd.x = 0;
        }

        this.pos.x += this.spd.x * this.speed * dt;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed * dt)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is && i < this.spd.y * this.speed * dt) {
                this.pos.y += Math.sign(this.spd.y);
                i++;
            }
            this.spd.y = 0;
        }
        
        this.pos.y += this.spd.y * this.speed * dt;

        this.sprite.update();
        insertDraw(() => {
            ctx.save();
            ctx.globalAlpha = 0.5;
            LIGHT.draw(this.pos, v(256,256));
            ctx.restore();
        }, 5);
        
    }
    draw() {
        
        this.sprite.draw(this.pos, this.size, this.angle);
    }
}, ["solid"])

def("sword", class extends Actor {
    constructor(player_pos) {
        super(v(), "sword");
        this.pp = player_pos;
        this.apos = v();
        this.aangle = new Angle();
        this.apos.x = 64;
        this.depth = 11;
        this.size = v(64,10);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["sword"], 1, 0);
        this.depth = 100;    
    }
    tick() {
        let prevang = this.aangle.deg;
        this.aangle.between(this.pos.origin, Mouse)
        this.angle.interpolate(this.aangle, Key.check("mouse") ? 1 : 0.1 * dt);
        this.apos.toOrigin(this.pp);
        this.pos.copy(this.apos);
        this.pos.rotate(this.angle);
        if(Key.check("mouse")) {
            let angdiff = this.aangle.deg - prevang;
            if(Math.abs(angdiff) > 5) {
                Instance.spawn("sword_trail", [this.pos, this.angle, this.size.y]);
                let coll = collides(this, Instance.filter(["enemy"]));
                if(coll.is) {
                    Object.keys(coll.other).forEach(x => {
                        coll.other[x].forEach(e => {
                            Instance.get(x, e).hit(new Angle("deg", this.angle.deg + 90 * Math.sign(angdiff)));
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
    togglePause() {
        this.isPaused = !this.isPaused;
    }


}, ["weapon"]);

def("crossbow", class extends Actor {
    constructor(player_pos) {
        super(v(), "crossbow");
        this.pp = player_pos;
        this.apos = v();
        this.aangle = new Angle();
        this.apos.x = 48;
        this.depth = 11;
        this.size = v(48,48);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["crossbow"], 2, 0);
        this.depth = 100;    
        this.counter = 0;
        this.counterLen = 60;
        this.arrow = null;
    }
    tick() {
        let prevang = this.aangle.deg;
        this.aangle.between(this.pos.origin, Mouse)
        this.angle.interpolate(this.aangle, 0.5 * dt);
        this.apos.toOrigin(this.pp);
        this.pos.copy(this.apos);
        this.pos.rotate(this.angle);
        this.counter = clamp(this.counter - 1, 0, this.counterLen * (1/dt));
        
        when(this.counter == 0, () => {
            this.arrow = Instance.get("arrow", Instance.spawn("arrow", [this.pp, this.angle]));
            this.sprite.index = 1;
        })
        when(this.counter == 0 && Key.check("mouse"), () => {
            this.arrow.fire();
            this.arrow = null;
            this.counter = this.counterLen * (1/dt);
            this.sprite.index = 0;
        })

        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
    togglePause() {
        this.isPaused = !this.isPaused;
        if(this.arrow) {
            this.arrow.isPaused = !this.arrow.isPaused;
        }
    }
}, ["weapon"])

def("arrow", class extends Actor {
    constructor(pos, angle) {
        super(v(), "arrow");
        this.pp = pos;
        this.angle = angle;
        this.apos = v();
        this.apos.x = 64;
        this.speed = 20;
        this.size = v(48, 8);
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.isFired = false;
        this.sprite = new Sprite(["arrow"], 1, 0);
        this.depth = 150;
        this.mult = v();
        this.depth = 12;
        this.counter = 60 * 2;
    }
    tick() {
        if(!this.isFired) {
            this.apos.toOrigin(this.pp);
            this.pos.copy(this.apos);
            this.pos.rotate(this.angle);
            this.sprite.update();
        } else {
            let coll = collides(this, Instance.filter(["enemy"]));
            if(coll.is) {
                this.counter -= 1 * dt;
                let keys = Object.keys(coll.other);
                for(let i = 0; i < keys.length; i++) {
                    for(let e = 0; e < coll.other[keys[i]].length; e++) {
                        Instance.get(keys[i], coll.other[keys[i]][e]).hit(this.angle);
                    }
                }
                if(this.counter < 0) {
                    Instance.destroy("arrow", this.id);
                }
            }
            this.pos.x += this.mult.x * this.speed * dt;
            this.pos.y += this.mult.y * this.speed * dt;
            
        }
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
    fire() {
        this.isFired = true;
        this.mult = this.angle.dir();
        let ag = new Angle("deg", this.angle.deg);
        this.angle = ag;
    }
}, ["weapon"]);

def("sword_trail", class extends Actor {
    constructor(pos, angle, width) {
        super(v(), "sword_trail");
        this.pos.copy(pos);
        this.angle.set(angle.deg);
        this.size = v(64,width);
        this.depth = 99;
    }
    tick() {
        this.size.x -= 5 * dt;
        this.size.y -= 5 * dt;
        if(this.size.x < 0) {
            Instance.destroy(this.name, this.id);
        }
    }
    draw() {
        ctx.save();
        ctx.setFillStyle("white");
        ctx.translate(this.pos);
        ctx.rotate(this.angle);
        ctx.fillRect(v(-this.size.x / 2, -this.size.y), this.size);
        ctx.restore();
    }
}, ["effect","trail"]);

def("shotgun", class extends Actor {
    constructor(player_pos) {
        super(v(), "shotgun");
        this.pp = player_pos;
        this.apos = v();
        this.aangle = new Angle();
        this.apos.x = 64;
        this.size = v(64,12);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["shotgun"], 6, 12);
        this.depth = 100;    
    }
    tick() {
        let prevang = this.aangle.deg;
        this.aangle.between(this.pos.origin, Mouse)
        this.angle.interpolate(this.aangle, 0.5 * dt);
        this.apos.toOrigin(this.pp);
        this.pos.copy(this.apos);
        this.pos.rotate(this.angle);

        when(this.sprite.index == 5, () => {
            this.sprite.setFps(0);
        })

        when(this.sprite.index == 5 && Key.check("mouse"), () => {
            this.fire();
            this.sprite.index = 0;
            this.sprite.setFps(12);
        })

        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
    togglePause() {
        this.isPaused = !this.isPaused;
    }
    fire() {
        for(let i = 0; i < 4; i++) {
            Instance.spawn("shotgun_shell", [this.pos, new Angle("deg", this.angle.deg + [-15,-5,5,15][i])]);
        }
    }
}, ["weapon"])

def("shotgun_shell", class extends Actor {
    constructor(pos, angle) {
        super(v(), "shotgun_shell");
        this.pos.copy(pos);
        this.angle = angle;
        this.apos = v();
        this.apos.x = 64;
        this.speed = 20;
        this.size = v(16, 4);
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.isFired = false;
        this.sprite = new Sprite(["shotgun_shell"], 4, 4);
        this.depth = 150;
        this.mult = this.angle.dir();
        let ag = new Angle("deg", this.angle.deg);
        this.angle = ag;
        this.depth = 12;
        this.counter = 60 * 2;
    }
    tick() {
        let coll = collides(this, Instance.filter(["enemy"]));
        this.counter -= 1 * dt;
        if(coll.is) {
            
            let keys = Object.keys(coll.other);
            for(let i = 0; i < keys.length; i++) {
                for(let e = 0; e < coll.other[keys[i]].length; e++) {
                    Instance.get(keys[i], coll.other[keys[i]][e]).hit(this.angle);
                }
            }
            Instance.destroy("shotgun_shell", this.id);
            
        }
        if(this.counter < 0) {
            Instance.destroy("shotgun_shell", this.id);
        }
        this.pos.x += this.mult.x * this.speed * dt;
        this.pos.y += this.mult.y * this.speed * dt;
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
}, ["weapon"]);

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



