const sc_00 = new Scene("sc_00", v(800, 600), 
{
    paddle:[[]],
    paddle_ai:[[]],
    ball:[[]]
}, {
    main:[[["noimage"]], "solid", "white"]
}, {}, () => {
    vport.resize(sc_00.size);
}, () => {}, 60, 60);

GAME.onload = function() {
    sc_00.load();
}

def("paddle", class extends Actor {
    constructor() {
        super(v(scene.bounds.corner.min.x + 64, 0), "paddle");
        this.size = v(12, 80);
        this.speed = 8;
    }
    tick() {
        this.pos.y += (-Key.check("ArrowUp") + Key.check("ArrowDown")) * this.speed;
        this.pos.y = clamp(this.pos.y, scene.bounds.corner.min.y, scene.bounds.corner.max.y);
    }
    draw() {
        Draw.rect(this.size, this.pos, "black");
    }
}, ["paddle"]);

def("paddle_ai", class extends act.paddle {
    constructor() {
        super();
        this.name = "paddle_ai";
        this.pos.x = scene.bounds.corner.max.x - 64;
    }
    tick() {
        this.pos.y = approach(this.pos.y, ins.ball[0].pos.y, this.speed / 1.5);
    }
}, ["paddle"])

def("ball", class extends Actor {
    constructor() {
        super(v(), "ball");
        this.size = v(12);
        this.spd = v(Random.int(4,8) * Random.sign(), Random.int(4,8) * Random.sign());
    }
    tick() {
        if(collides(this, Instance.filter(["paddle"]), v(this.pos.x + this.spd.x, this.pos.y + this.spd.y)).is) {
            this.spd.x *= -1;
        }
        if(!collides(this, ["sceneBounds"], v(0, this.pos.y + this.spd.y)).is) {
            this.spd.y *= -1;
        }
        if(!collides(this, ["sceneBounds"], v(this.pos.x + this.spd.x, 0)).is) {
            sc_00.load();
        }
        this.pos.x += this.spd.x;
        this.pos.y += this.spd.y;
    }
    draw() {
        Draw.ellipse(this.size, this.pos, "black");
    }
}) 