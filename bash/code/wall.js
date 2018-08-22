class wall extends Actor {
    constructor(pos, angle, name) {
        super(pos, name);
        this.faceAngle = a(angle);
        this.size = v(32);
    }
}


def("wall_0", class extends wall {
    constructor(x,y) {
        super(v(x,y), 0, "wall_0");
    }
    draw() {
        Draw.rect(this.size, this.pos, "white");
    }
    
},["wall"]);

def("wall_45", class extends wall {
    constructor(x,y) {
        super(v(x,y), 45, "wall_45");
        this.mask= p([[-1,-1],[1,1],[-1,1]]);
        this.angle = a(this.faceAngle.deg + 45);
    }
    draw() {
        MorphPolygon(this.mask, this).draw("white", "rgba(255,255,255,0)");
    }
    
},["wall"]);

def("wall_90", class extends wall {
    constructor(x,y) {
        super(v(x,y), 90, "wall_90");
    }
    draw() {
        Draw.rect(this.size, this.pos, "white");
    }
    
},["wall"]);

def("wall_135", class extends wall {
    constructor(x,y) {
        super(v(x,y), 135, "wall_135");
        this.mask= p([[-1,-1],[1,1],[-1,1]]);
        this.angle = a(this.faceAngle.deg + 45);    
    }
    draw() {
        MorphPolygon(this.mask, this).draw("white", "rgba(255,255,255,0)");
    }
    
},["wall"]);

def("wall_180", class extends wall {
    constructor(x,y) {
        super(v(x,y), 180, "wall_180");
    }
    draw() {
        Draw.rect(this.size, this.pos, "white");
    }
    
},["wall"]);

def("wall_225", class extends wall {
    constructor(x,y) {
        super(v(x,y), 225, "wall_225");
        this.mask= p([[-1,-1],[1,1],[-1,1]]);
        this.angle = a(this.faceAngle.deg + 45);    
    }
    draw() {
        MorphPolygon(this.mask, this).draw("white", "rgba(255,255,255,0)");
    }
    
},["wall"]);

def("wall_270", class extends wall {
    constructor(x,y) {
        super(v(x,y), 270, "wall_270");
    }
    draw() {
        Draw.rect(this.size, this.pos, "white");
    }
    
},["wall"]);

def("wall_315", class extends wall {
    constructor(x,y) {
        super(v(x,y), 315, "wall_315");
        this.mask= p([[-1,-1],[1,1],[-1,1]]);
        this.angle = a(this.faceAngle.deg + 45);    
    }
    draw() {
        MorphPolygon(this.mask, this).draw("white", "rgba(255,255,255,0)");
    }
    
},["wall"]);

