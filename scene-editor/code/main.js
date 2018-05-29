const editor_main_scene = new Scene(v(600,600), {editor_main:[[]], editor_grid:[[]]}, {main:["noimage", "solid", "white"]},
    function () {
        camera = new Camera();
    },
    function () {},
    60
)

editor_main_scene.ignore_persistant = true;

GAME.onload.set(function() {
    editor_main_scene.load();
    vport.element.style = "cursor:default";
});

def("editor_main", class extends Actor {
    constructor(pos) {
        super(pos);
        let actKeys = Object.keys(act);
        for(let i in actKeys) {
            if(actKeys[i].split("_")[0] != "editor") {
                act[actKeys[i]].prototype.tick = () => {};
                act[actKeys[i]].prototype.mousedown = () => {};
                act[actKeys[i]].prototype.loop = () => {};
                act[actKeys[i]].prototype.destroyloop = () => {};
            }
        }
    }
    mousedown() {
        Instance.spawn("main", [Mouse]);
    }
})

def("editor_grid", class extends Actor {
    constructor(pos) {
        super(pos);
        this.block = v(40,40);
        this.linew = 1;
        this.omp = v()
        this.mp = v();
    }
    tick() {
        when(Key.check("mouse"), () => {
            this.mp = v(Mouse.x - camera.pos.x, Mouse.y - camera.pos.y);
        })
        if (Key.check("mouse")) {
            this.omp = this.mp;
            this.mp = v(Mouse.x - camera.pos.x, Mouse.y - camera.pos.y);
            camera.pos.x += this.omp.x - this.mp.x;
            camera.pos.y += this.omp.y - this.mp.y;
        }
    }
    draw() {
        let start = v(
            this.block.x * Math.floor((camera.pos.x - vport.size.x / 2) * camera.scale.x / this.block.x),
            this.block.y * Math.floor((camera.pos.y - vport.size.y / 2) * camera.scale.y / this.block.y)
        )
        ctx.save()
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.linew;
        for(let x = 0; x < Math.ceil(vport.size.x * camera.scale.x / this.block.x) + 1; x++) {
            for(let y = 0; y < Math.ceil(vport.size.y * camera.scale.y  / this.block.y) + 1; y++) {
                ctx.strokeRect(start.x + this.block.x * x, start.y + this.block.y * y, this.block.x, this.block.y);
            }   
        }
        ctx.restore();
    }
})