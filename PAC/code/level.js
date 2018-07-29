const sc_00 = new Scene("sc_00", v(544,544), 
{
    collisionblock:cfg.sc_00.collisionblock
},{
    main:[["noimage"], "solid", "white"]
},{
    "ground.UL":cfg.sc_00["ground.UL"],
    "ground.UR":cfg.sc_00["ground.UR"],
    "ground.U":cfg.sc_00["ground.U"],
    "ground.L":cfg.sc_00["ground.L"],
    "ground.R":cfg.sc_00["ground.R"],
    "ground.D":cfg.sc_00["ground.D"],
    "ground.DL":cfg.sc_00["ground.DL"],
    "ground.DR":cfg.sc_00["ground.DR"]
},() => {
    vport.resize(v(544,544));
}, () => {}, 60, 60);

GAME.onload = function() {
    sc_00.load();
}