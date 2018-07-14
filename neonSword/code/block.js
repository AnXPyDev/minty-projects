def("block", class extends Actor {
    constructor(x,y) {
        console.log(x,y);
        super(v(x,y), "block");
        this.size = v(32,32);
        this.mask = new Polygon("rect");
        this.mask.set([[-1,-1],[1,-1],[1,1],[-1,1]]);
        this.sprite = new Sprite(["block"], 6, 10);
        this.sprite.index = Random.int(0,this.sprite.len - 1);
        this.depth = 8;
        
    }
    tick() {
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size, this.angle);
    }
}, undefined, ["solid"]);