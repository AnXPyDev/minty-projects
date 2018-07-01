const sc0 = new Scene(v(1024, 1024), 
    {},{main:cfg.bckpreset.main},() => {
        vport.resize(v(800, 600));
        bck.main.scale = v(0.5,0.5);
    }, () => {}, 60, 60);

GAME.onload.set(function() { new Background()
    sc0.load();
})

def("main", class extends Actor {
    constructor() {
        super(v(), "main");

    }
})

