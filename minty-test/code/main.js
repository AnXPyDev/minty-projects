const sc0 = new Scene(v(1024, 1024), 
    {},{main:[]},() => {}, () => {}, 60, 60);
GAME.onload.set(function() { new Background()
    sc0.load();
})

def("main", class extends Actor {
    constructor() {
        super(v(), "main");

    }
})

