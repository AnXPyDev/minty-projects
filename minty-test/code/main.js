const s0 = new Scene("s0", v(600,600), {
    main_emm:[[]]
},{
    main:[["noimage"], "solid", "white"]
}, {

}, () => {}, () => {}, 60,60);

GAME.onload = function() {
    s0.load();
}

class part extends Particle {
    constructor(pos, life, velocity) {
        super(pos, life, "noimage", 1, 0);
        this.velocity = velocity;
        this.speed = 4;
        this.size = v(64,64);
    }
    tick() {
        this.size.y -= 1;
        this.size.x -= 1;
        this.pos.x += this.velocity.x * this.speed;
        this.pos.y += this.velocity.y * this.speed;
    }
    draw() {
        Draw.ellipse(this.size, this.pos, "blue");
        
    }
}

def("main_emm", class extends Emitter {
    constructor() {
        super(() => {
            this.spawnParticle(part, this.pos, 64, new Angle("deg", wave(0,360,3)).dir());
        }, 2, "main_emm");
    }
})