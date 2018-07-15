const s0 = new Scene("s0", v(1024,1024), 
{
    main_logic:[[]],
    cursor:[[]]
},
{
    white:[["noimage"], "solid", "lightgreen"],
    grid:[["grid"], "tiled"]
}, () => {
}, () => {

}, 60,60)

GAME.onload = function() {
    s0.load();
}

const exports = {};
const info = {
    name: "none",
    size: v(32,32)
}
const colors = {};
const gridsize = v(32,32);


function setInfo(name, size, gs = size) {
    info.name = name;
    info.size = size;
    
    if(!colors[name]) {
        colors[name] = `rgb(${Random.int(0,255)},${Random.int(0,255)},${Random.int(0,255)})`;
    }

    bck.grid.setScale(v(gs.x / 32, gs.y / 32));
}

def("main_logic", class extends Actor {
    constructor() {
        super(v(), "main_logic");
        this.isCollidable = false;
    }
    mousedown() {
        Instance.spawn("block", [v(Math.floor(Mouse.x / gridsize.x) * gridsize.x + gridsize.x / 2, Math.floor(Mouse.y / gridsize.y) * gridsize.y + gridsize.y / 2), info.size]);
    }
});

def("block", class extends Actor {
    constructor(pos, size) {
        super(pos, "block");
        this.size = size;
        this.NAME = info.name;
        exports[this.NAME] ? exports[this.NAME].push([this.pos.x, this.pos.y]) : exports[this.NAME] = [[this.pos.x, this.pos.y]];
    }
    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.fillStyle = colors[this.NAME];
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        ctx.restore();
    }
})

def("cursor", class extends Actor {
    constructor() {
        super(Mouse, "cursor");
        this.sprite = new Sprite(["cursor"], 1, 0);
        this.depth = 1000;
        this.size = v(8,8);
    }
    tick() {
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size)
    }
})
