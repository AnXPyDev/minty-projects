const sc0 = new Scene(v(600,600), {main:[[]], grid:[[]]}, {main:["noimage", "solid", "white"]},
    function () {
        camera = new Camera();
    },
    function () {},
    60)

GAME.onload = function() {
    sc0.load();
    vport.element.style = "cursor:default";
}

def("main", class extends Actor {
    constructor() {
        super();
    }
})

def("grid", class extends Actor {
    constructor() {
        super();
        this.block = v(40,40);
        this.linew = 1;
        this.omp = v()
        this.mp = v();
    }
    tick() {
        when(Key.check("mouse"), () => {
            this.mp = v(Mouse.x - camera.pos.x, Mouse.y - camera.pos.y);
            console.log("yes");
        })
        if (Key.check("mouse")) {
            this.omp = this.mp;
            this.mp = v(Mouse.x - camera.pos.x, Mouse.y - camera.pos.y);
            camera.pos.x += this.omp.x - this.mp.x;
            camera.pos.y += this.omp.y - this.mp.y;
            console.log("no");
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