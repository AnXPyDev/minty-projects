def("player", class extends Actor {
    constructor() {
        super(v(), "player");
        this.sp = v();
        this.size = v(32);
        this.speed = 4;
        this.depth = 50;
        this.wsMultiplier = 0.75;
    }
    tick() {
        let axis = v();
        axis.x = -Key.check("a") + Key.check("d");
        axis.y = -Key.check("w") + Key.check("s");

        let windDir = game.windAngle.dir();


        this.sp.x = axis.x * this.speed + windDir.x * game.windSpeed * this.wsMultiplier;
        this.sp.y = axis.y * this.speed + windDir.y * game.windSpeed * this.wsMultiplier;

        this.pos.x += this.sp.x;
        this.pos.y += this.sp.y;
    }
    draw() {
        Draw.rect(this.size, this.pos, "lime");
    }
})