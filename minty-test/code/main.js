const s0 = new Scene("s0", v(640,640),{
    main:[[]]
}, {
    main:[["noimage"], "solid", "black"]
}, () => {
    vport.resize(v(640,640));
}, () => {}, 60,60);

GAME.onload = function() {
    s0.load();
}

const sh_invert = new Shader(
    function(c) {return [true, 1]},
    function(c, args) {
        return new Color(
            255,255,255,
            255
        )
    }
)

def("main", class extends Actor {
    constructor() {
        super(v(), "main");
    }
    draw() {
        sh_invert.apply(v(-10000,-10000), v(10000,10000));
    }
})