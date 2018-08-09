const sc_main = new Scene("sc_main", v(),{
    game__:[[]],
    player:[[]]
}, {
    ground:[[["noimage"]], "solid", "grey"]
}, {

}, () => {
    vport.resize(v(1024,576));
    game = ins.game__[0];
}, () => {}, 60, 60);

let game;

GAME.onload = function() {
    sc_main.load();
}

