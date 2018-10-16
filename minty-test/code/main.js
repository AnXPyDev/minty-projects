const s0 = new Scene("s0", v(600,600), {
    main_emm:[[]]
},{
    main:[[["noimage"]], "solid", "white"]
}, {

}, () => {}, () => {}, 60,60);

GAME.onload = function() {
    s0.load();
}

class part extends Particle {
    constructor(pos, life, velocity) {
        super(pos, life, "noimage", 1, 0);
        this.velocity = velocity;
        this.speed = 1;
        this.fullLife = life;
        this.size = v(64,64);
        this.color = "blue";
    }
    tick() {
        this.size.y -= 64 / this.fullLife;
        this.size.x -= 64 / this.fullLife;
        this.pos.x += this.velocity.x * this.speed;
        this.pos.y += this.velocity.y * this.speed;
    }
    draw() {
        Draw.opacity(Math.pow(this.life / this.fullLife, 2), () => {
            Draw.ellipse(this.size, this.pos, this.color);
        })
    }
}

def("main_emm", class extends Emitter {
    constructor() {
        super(() => {
            this.spawnParticle(part, this.pos, 240, new Angle("deg", wave(0,360,5)).dir());
        }, scene.tps / 2, "main_emm");
    }
}) 
