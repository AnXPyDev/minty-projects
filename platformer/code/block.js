def("block", class extends Actor {
    constructor(x,y) {
        super(v(x,y), "block");
        this.size = v(32,32);
    } 
    draw() {
        Draw.rect(this.size,this.pos,"black");
    }
}, ["solid", "static"]);