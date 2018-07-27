const scene_0 = new Scene("scene_0", v(800, 600), 
{
    player:[[]],
    block:cfg.scene_0.block
},
{
    main:[["noimage"], "solid", "white"]
},{
    
}, () => {
    vport.resize(v(800,600));
}, () => {}, 60,60);

scene_0.vars.gravity = 2;