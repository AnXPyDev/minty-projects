const s0 = new Scene("s0", v(1024,1024), 
{
    cursor:[[]]
},
{
    white:[["noimage"], "solid", "lightgreen"],
    grid:[["grid"], "tiled"]
}, () => {
}, () => {

}, 60,60)

GAME.onload = function() {
    s0.load();
}

def("cursor", class extends Actor {
    constructor() {
        super(Mouse, "cursor");
        this.isCollidable = false;
    }
    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(-vport.size.x * (1 / vport.scale.x), 0);
        ctx.lineTo(vport.size.x * (1 / vport.scale.x), 0);
        ctx.stroke();
        ctx.restore();
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(0,-vport.size.y * (1 / vport.scale.y));
        ctx.lineTo(0,vport.size.y * (1 / vport.scale.y));
        ctx.stroke();
        ctx.restore();

    }
})