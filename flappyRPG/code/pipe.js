let pipeSize = v(32 * 3.5, 192 * 3.5);

def("pipe", class extends Actor {
    constructor(pos) {
        super(pos, "pipe");
        this.size = pipeSize;
        this.speed = 4;
        this.sprite = new Sprite(["pipe"], 1, 0);
    }
    tick() {
        this.pos.x -= this.speed;
        if(this.pos.x < -vport.size.x / 2 - pipeSize.x / 2) {
            Instance.destroy(this.name, this.id);
        }
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size);
    }
})

def("pipespawner", class extends Actor {
    constructor() {
        super(v(), "pipespawner");
        this.isCollidable = false;
        this.isHidden = true;
        this.pipeGap = 128;
        this.loop("spawnpipe", () => {
            this.spawn();
        }, 90);
    }
    spawn() {
        let pipePos = Random.int(-200,200);

        Instance.spawn("pipe", [v(vport.size.x / 2 + pipeSize.x / 2, pipePos - this.pipeGap / 2 - pipeSize.y / 2)]);
        Instance.spawn("pipe", [v(vport.size.x / 2 + pipeSize.x / 2, pipePos + this.pipeGap / 2 + pipeSize.y / 2)]);
    }

})