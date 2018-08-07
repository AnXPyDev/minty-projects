let pipeSize = v(32 * 3.5, 96 * 3.5);

def("pipe", class extends Actor {
    constructor(pos, rot) {
        super(pos, "pipe");
        this.size = pipeSize;
        this.rot = rot;
        this.speed = 4;
        this.sprite = new Sprite(["pipe"], 1, 0);
    }
    tick() {
        this.pos.x -= this.speed;
        this.sprite.update();
    }
    draw() {
        Draw.scale(v(1, this.rot), this.pos, () => {
            this.sprite.draw(this.pos, this.size);
        })
    }
})

def("pipespawner", class extends Actor {
    constructor() {
        super(v(), "pipespawner");
        this.isCollidable = false;
        this.isHidden = true;
        this.pipeGap = 128;
    }
    spawn() {
        let pipePos = Random.int(-200, 200);

        Instance.spawn("pipe", [v(vport.size.x / 2 + pipeSize.x / 2, pipePos - this.pipeGap / 2 - pipeSize.y / 2), -1]);
        Instance.spawn("pipe", [v(vport.size.x / 2 + pipeSize.x / 2, pipePos + this.pipeGap / 2 + pipeSize.y / 2), 1]);
    }

})