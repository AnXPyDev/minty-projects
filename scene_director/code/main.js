const s0 = new Scene("s0", v(1024,1024), 
{
    main_logic:[[]],
    cursor:[[]]
},
{
    grid:[["grid"], "tiled"]
}, () => {
    bck.grid.setOffset(v(16,16));
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
let gridsize = v(32,32);

let steps = [];

function setInfo(name, size, gs = size) {
    info.name = name;
    info.size = size;
    
    if(!colors[name]) {
        colors[name] = `rgb(${Random.int(0,255)},${Random.int(0,255)},${Random.int(0,255)})`;
    }

    bck.grid.setScale(v(gs.x / 32, gs.y / 32)); 
    gridsize = gs;
}

def("main_logic", class extends Actor {
    constructor() {
        super(v(), "main_logic");
        this.isCollidable = false;
    }
    tick() {
        camera.pos.x += (-Key.check("arrowleft") + Key.check("arrowright")) * 8;
        camera.pos.y += (-Key.check("arrowup") + Key.check("arrowdown")) * 8;
        when(Key.check("control") && Key.check("z"), () => {
            Instance.destroy("block", steps[steps.length - 1]);
            steps.splice(-1, 1);
        })
        when(Key.check("control") && Key.check("c"), () => {
            camera.pos.x = 0;
            camera.pos.y = 0;
        })
    }
    mousedown() {
        steps.push(Instance.spawn("block", [v(Math.floor((Mouse.x - gridsize.x / 2) / gridsize.x + 1) * gridsize.x, Math.floor((Mouse.y - gridsize.y / 2 + 1) / gridsize.y + 1) * gridsize.y), info.size]));
    }
    draw() {
        Draw.line(v(-vport.size.x / 2 + camera.pos.x, 0), v(vport.size.x / 2 + camera.pos.x, 0),"lime", 4);
        Draw.line(v(0, -vport.size.y / 2 + camera.pos.y), v(0, vport.size.y / 2 + camera.pos.y),"lime", 4);
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
        this.depth = 1000;
        this.size = v(8,8);
    }
    draw() {
        Draw.line(v(-vport.size.x + Mouse.x, Mouse.y),v(vport.size.x + Mouse.x, Mouse.y), "white", 2);
        Draw.line(v(Mouse.x, -vport.size.y + Mouse.y),v(Mouse.x, vport.size.y + Mouse.y), "white", 2);
        Draw.text(`${Mouse.x}, ${Mouse.y}`, v(Mouse.x + 64, Mouse.y + 40), "white", 16);
        Draw.text(`${Math.floor((Mouse.x - gridsize.x / 2) / gridsize.x + 1)}, ${Math.floor((Mouse.y - gridsize.y / 2) / gridsize.y + 1) }`, v(Mouse.x + 64, Mouse.y + 80), "white", 16);
    }
})
