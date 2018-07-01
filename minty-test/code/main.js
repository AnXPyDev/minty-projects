const sc0 = new Scene(v(1024, 1024), 
    {main:[[]]},{main:cfg.bckpreset.main},() => {
        vport.resize(v(512, 512));
        vport.element.style.cursor = "default";
        bck.main.scale = v(0.25,0.25);
    }, () => {}, 60, 60);

GAME.onload.set(function() {
    sc0.load();
})

def("main", class extends Actor {
    constructor() {
        super(v(), "main");
        this.sprite = new Sprite("player", 1, 0);
        this.sprite.attach("main", "att", 1, 0, 1);
        this.size = v(32,32);
        this.spd = v();
        this.speed = 5;
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
        bck.main.scale.x = bck.main.scale.y = Math.abs(Math.sin(new Date() / 1000)) + 0.2;
        this.angle.between(this.pos, Mouse);
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
})

