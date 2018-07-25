def("block", class extends Actor {
    constructor(x,y) {
        super(v(x,y), "block");
        this.size = v(32,32);
        this.sprite = new Sprite(["block"], 1, 0);
    } 
    tick() {
        this.sprite.update();
    }
    draw() {
        this.sprite.draw(this.pos, this.size);
    }
}, ["solid", "static"]);