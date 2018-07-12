def("enemy", class extends Actor {
    constructor(pos) {
        super(v(), "enemy");
        this.pos.copy(pos);
        this.size = v(32, 32);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["enemy"], 4, 2);
        this.speed = 2;
        this.spd = v();
        this.depth = 9
        this.aa = new Angle("deg", 0);
    }
    tick() {
        this.aa.between(this.pos, Instance.get("player", 0).pos);
        this.spd = this.aa.dir(); 

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x + this.spd.x * this.speed * dt, this.pos.y)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x + Math.sign(this.spd.x), this.pos.y)).is && i < this.spd.x * this.speed * dt) {
                this.pos.x += Math.sign(this.spd.x);
                i++;
            }
            this.spd.x = 0;
        }

        this.pos.x += this.spd.x * this.speed * dt;

        if(collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + this.spd.y * this.speed * dt)).is) {
            let i = 0;
            while(!collides(this, Instance.filter(["solid"]), v(this.pos.x, this.pos.y + Math.sign(this.spd.y))).is && i < this.spd.y * this.speed * dt) {
                this.pos.y += Math.sign(this.spd.y);
                i++;
            }
            this.spd.y = 0;
        }
        
        this.pos.y += this.spd.y * this.speed * dt;
    
        this.sprite.update();
        insertDraw(() => {
            ctx.save();
            ctx.globalAlpha = 0.5;
            LIGHT.draw(this.pos, v(256,256));
            ctx.restore();
        }, 5);
    }
    draw() {
        this.sprite.draw(this.pos, this.size);
    }
    hit(angle) {
        Instance.spawn("blood", [this.pos, angle]);
        Instance.destroy("enemy", this.id);
    }
}, undefined, ["enemy", "solid"]);

def("spawner", class extends Actor {
    constructor() {
        super(v(), "spawner");
        this.points = [v(-scene.size.x / 2, -scene.size.y / 2), v(scene.size.x / 2, -scene.size.y / 2), v(scene.size.x / 2, scene.size.y / 2), v(-scene.size.x / 2, scene.size.y / 2)];
        this.loop("spawn" ,() => {if(ins.enemy.length < 50) {Instance.spawn("enemy", [this.points[Random.int(0,3)]])}}, 60);   
    }
})

def("blood", class extends Actor {
    constructor(pos, angle) {
        super(v(), "blood");
        this.pos.copy(pos);
        this.pos.x += 16;
        this.pos.rotate(angle);
        this.angle = angle;
        this.size = v(32,32);
        this.depth = 2;
        this.sprite = new Sprite(["blood"], 5, 60 / 5 * (1 / dt));
    }
    tick() {
        if(this.sprite.index == this.sprite.len - 1) {
            this.sprite.setFps(0);
        }
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
})