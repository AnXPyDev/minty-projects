const s0 = new Scene("s0", v(800,600), {
    ship:[[]],
    cursor:[[]],
    spawner:[[]]
},{
    main:["noimage", "solid", "black"]
}, () => {
    vport.resize(v(800,600));
}, () => {}, 60, 60);

GAME.onload = function() {
    s0.load();
}

def("ship", class extends Actor {
    constructor() {
        super(v(), "ship");
        this.mask.isRect = false;
        this.mask.set([[-1,-1],[0,0],[-1,1]]);
        this.size = v(32,24);
        this.sprite = new Sprite(["ship"], 1, 0);
        this.speed = 4;
    }
    tick() {
        let ang = new Angle("deg", 0);
        ang.between(this.pos, Mouse);
        this.angle.approach(ang, 8);
        
        if(Key.check("shift")) {
            let dir = this.angle.dir();
            this.pos.x += this.speed * dir.x;
            this.pos.y += this.speed * dir.y;
        }

        when(Key.check("mouse"), () => {
            let sp = v(this.pos.x, this.pos.y);
            sp.setorigin(this.pos);
            sp.x += this.size.x / 2;
            sp.rotate(this.angle);
            Instance.spawn("bullet", [sp, this.angle]);
        })

        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
}, ["ship"]);

def("cursor", class extends Actor {
    constructor() {
        super(Mouse, "cursor");
        this.size = v(4,4);
    }
    draw() {
        Draw.ellipse(this.size, this.pos, "white");
    }
})

const asteroidSizes = [128,64,32,16];
const walls = [[[-400,400],[-556,-428]], [[528,656],[-300,300]], [[-400,400],[428,556]], [[-656,-528],[-300,300]]];

def("asteroid", class extends Actor {
    constructor(ix, rnd = true, pos = v(), angle = new Angle("deg", 0)) {
        super(v(), "asteroid");
        this.wall = Random.int(0,3);
        this.ix = ix;
        this.angle = angle;
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        if(rnd) {
            this.pos.x = Random.int(...walls[this.wall][0]);
            this.pos.y = Random.int(...walls[this.wall][1]);
            this.angle.between(this.pos, v());
            this.angle.set(this.angle.deg + Random.int(-25,25));
        }
        this.size = v(asteroidSizes[ix], asteroidSizes[ix]);
        this.speed = Random.int(1,2);
    }
    tick() {
        let dir = this.angle.dir();
        this.pos.x += this.speed * dir.x;
        this.pos.y += this.speed * dir.y;
        if(this.pos.x > 450 || this.pos.x < -450 || this.pos.y > 606 || this.pos.y < -606) {
            Instance.destroy("asteroid", this.id);
        }
    }
    draw() {
        Draw.ellipseS(this.size, this.pos, "white", 1);
    }
    hit() {
        if (this.ix < asteroidSizes.length - 1) {
            Instance.spawn("asteroid", [this.ix + 1, false, this.pos, new Angle("deg", this.angle.deg + 20)]);
            Instance.spawn("asteroid", [this.ix + 1, false, this.pos, new Angle("deg", this.angle.deg - 20)]);
        }
        Instance.destroy("asteroid", this.id);
    }
    
}, ["solid"]);

def("bullet", class extends Actor {
    constructor(pos, angle) {
        super(pos, "bullet");
        this.angle = new Angle("deg", angle.deg);
        this.speed = 5;
        this.size = v(4,4);
    }
    tick() {
        let dir = this.angle.dir();
        this.pos.x += this.speed * dir.x;
        this.pos.y += this.speed * dir.y;
        let coll = collides(this, ["asteroid"]);
        if(coll.is) {
            Instance.get("asteroid", coll.other.asteroid[0]).hit();
            this.angle.set(this.angle.deg + 90);
        }
        if(this.pos.x > 450 || this.pos.x < -450 || this.pos.y > 606 || this.pos.y < -606) {
            this.angle.set(this.angle.deg + 90);
        }
    }
    draw() {
        Draw.ellipse(this.size, this.pos, "white");
    }
})

def("spawner", class extends Actor {
    constructor() {
        super(v(), "spawner");
        this.isCollidable = false;
        this.loop("spawm", () => {Instance.spawn("asteroid", [0])}, 30);
    }
})