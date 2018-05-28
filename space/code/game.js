const r0 = new Scene(
    v(600,600),
    {
        main: [[]],
        spawner: [[]]
    },
    {
        main: ["bck", "tiled"]
    },
    () => {
        bck.main.spd = v(0,5);
        bck.main.scale = v(1,1);
        camera = new Camera();
        vport.resize(scene.size);
    },
    () => {},
    60
)


GAME.onload = function() {
    r0.load();
}

function prect(sz) {
    let p = new Polygon();
    p.set([[0,0],[sz.x,0],[sz.x,sz.y],[0,sz.y]]);
    p.center(v());
    return p;
}

def("main", class extends Actor {
    constructor() {
        super();
        this.pos.y = Math.floor(scene.size.y * 0.8 - scene.size.y / 2);
        this.pos.x = Math.floor(scene.size.x * 0.5 - scene.size.x / 2);
        this.mask = prect(v(1,1));
        this.size = v(60,80);
        this.sprite = new Sprite("spaceship", 1, 0);
        this.depth = 15;
        this.loop("shoot",() => {if (Key.check("mouse")) { 
                Instance.spawn("bullet", [v(this.pos.x, this.pos.y)]);
            }
        }, 7);
    }
    tick() {
        this.pos.x = lerp(this.pos.x, Mouse.x, 0.5 * dt, true);
    }
    draw() {
        //let p = MorphPolygon(this.mask, this);
        //p.draw((collides(this, "enemy").is ? "red" : "green"));
        this.sprite.draw(this.pos, this.size);
    }
    
}) 

def("spawner", class extends Actor {
    constructor() {
        super();
        this.loop("spn", () => {Instance.spawn("enemy", [])}, 5);
    }
}) 

def("enemy", class extends Actor {
    constructor() {
        super();
        this.pos.x =  Math.floor(Math.random() * scene.size.x - scene.size.x / 2);
        this.pos.y = -scene.size.y / 2 - 60;
        this.size = v(Random.int(20,40),Random.int(40,80));
        this.spd = Random.int(5,20); 
        this.mask = prect(v(40,40));
        this.isFading = false;
        this.alpha = 1;
    }
    tick() {
        if(this.isFading) {
            this.alpha -= 0.05 * dt;
        }
        this.pos.y += this.spd * dt;
        if(this.pos.y > scene.size.y + this.size.y / 2 || this.alpha < 0.05) {
            Instance.destroy("enemy", this.id);
        }
        this.angle.set(this.angle.deg + (this.spd/4 * dt), "deg");
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        MorphPolygon(this.mask, this).draw();
        ctx.restore();
    }
    fade() {
        this.isFading = true;
        this.isCollidable = false;
    }
})

def("bullet", class extends Actor {
    constructor(pos) {
        super()
        this.pos = pos;
        this.mask = prect(v(5,20));
        this.size = v(5,20);
        this.spd = 15;
        this.depth = 7;
    }
    tick() {
        this.pos.y -= this.spd * dt;
        let c = collides(this, "enemy");
        if(c.is) {
            c.id.forEach(x => {
                Instance.get("enemy", x).fade();
            })
            Instance.destroy("bullet", this.id);
        }
        if(this.pos.y < -scene.size.y - 5) {
            Instance.destroy("bullet", this.id);
        }
    }
    draw() {
        MorphPolygon(this.mask, this).draw("red");
    }
})