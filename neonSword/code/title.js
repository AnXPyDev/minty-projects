const s_title = new Scene(v(), {
    title:[[]]
}, {}, () => {}, () => {
    vport.resize(v(1024,576));
}, 60, 60)


GAME.onload.set(function() {
    s_title.load();
})

def("title", class extends Actor {
    constructor() {
        super(v(), "title");
        this.isCollidable = false;
        this.size = vport.size;
        this.sprite = new Sprite(["logo"], 3, 60 / 10);
    }
    tick() {
        this.sprite.update();
        when(Key.check("mouse"), () => {s0.load()});
    }
    draw() {
        this.sprite.draw(this.pos, this.size);
    }
})