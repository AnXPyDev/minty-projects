const s0 = new Scene(v(1024,1024),
{
    box:[[v()],[v(32,32)],[v(64,64)]],
    player:[[]]
}, {
    main:[["bck_glass"], "tiled"]
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
        super(v(), "player");
        this.size = v(32,32);
        this.mask = new Polygon();
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["box"], 1, 0);
        this.speed = 5;
        this.spd = v();
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
        
        


        this.pos.x += this.spd.x * this.speed;
        this.pos.y += this.spd.y * this.speed;
            
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
})

