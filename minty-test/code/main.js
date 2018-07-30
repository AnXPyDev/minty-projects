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
        this.size = v(32,32);
    }
    tick() {
        this.size.x -= 0.5;
        this.size.y -= 0.5;
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
            this.spawnParticle(part, this.pos, 60, new Angle("deg", wave(0,360,3)).dir());
        }, 2, "main_emm");
    }
})