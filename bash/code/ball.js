def("ball", class extends Actor {
    constructor() {
        super(v(), "ball"); 
        this.size = v(16);
        this.dirAngle = a(90);
        this.spd = this.dirAngle.dir();
        this.speed = 5;
        this.color = "white";
        this.mask = circlePoly(this.size.x * 3);
    }
    tick() {

        this.spd = this.dirAngle.dir();
        
        let dist = distanceBetween(this.pos, v(this.pos.x + this.spd.x * this.speed, this.pos.y + this.spd.y * this.speed));

        for(let i = 0; i < Math.round(dist); i++) {
            let coll = collides(this, Instance.filter(["wall"]), v(this.pos.x + this.spd.x, this.pos.y + this.spd.y));
            if(coll.is) {
                let keys = Object.keys(coll.other);
                console.log(coll);
                this.collided(Instance.get(keys[0], coll.other[keys[0]][0]).faceAngle);
                this.spd = this.dirAngle.dir();
            } 
            this.pos.x += this.spd.x;
            this.pos.y += this.spd.y;

        }


    }
    draw() {
        Draw.ellipse(this.size, this.pos, this.color);
    }
    collided(angle) {
        this.dirAngle = a(angle.deg - (this.dirAngle.deg - 180) + angle.deg);
    }

})