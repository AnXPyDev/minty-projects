const sc_00 = new Scene("sc_00", v(480,640), 
{
    bird:[[]]
}, {
    main:[["noimage"], "solid", "lightblue"]
}, {

}, () => {
    vport.resize(v(480,640));
}, () => {}, 60, 60);

GAME.onload = function() {
    sc_00.load();
}