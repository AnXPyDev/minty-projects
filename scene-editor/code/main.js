const sc0 = new Scene(v(600,600), {main:[[]], grid:[[]]}, {main:["noimage", "solid", "white"]},
    function () {
        camera = new Camera();
    },
    function () {},
    30)

GAME.onload = function() {
    sc0.load();
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
        this.linew = 2;
    }
    tick() {
        camera.pos.x += 5;
        camera.pos.y += 5;
    }
    draw() {
        let start = v(
            this.block.x * Math.floor(camera.pos.x / this.block.x),
            this.block.y * Math.floor(camera.pos.y / this.block.y)
        )
        ctx.save()
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.linew;
        for(let x = 0; x < Math.ceil(vport.size.x / this.block.x) + 1; x++) {
            for(let y = 0; y < Math.ceil(vport.size.y / this.block.y) + 1; y++) {
                ctx.strokeRect(start.x + this.block.x * x, start.y + this.block.y * y, this.block.x, this.block.y);
            }
            
        }
        
        ctx.restore();
    }
})