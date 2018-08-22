cfg.sc_00.ball = [[]];


const sc_00 = new Scene("sc_00", v(800), cfg.sc_00,
{
    main:[[["noimage"]], "solid", "black"]
}, {

}, () => {
    vport.resize(scene.size);
}, () => {}, 60,60);

GAME.onload = function() {
    sc_00.load();
}

