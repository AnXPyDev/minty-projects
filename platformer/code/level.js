const sc_00 = new Scene("sc_00", v(1024,576), {
    player: [[]],
    collisionblock:cfg.sc_00.collisionblock
}, {
    main: [[["noimage"]], "solid", "lightblue"]
}, {
    "wall.main":cfg.sc_00["wall.main"]
}, () => {
    vport.resize(v(1024,576));
}, () => {}, 60,60);

GAME.onload = function() {
    sc_00.load();
}