def("game__", class extends Actor {
    constructor() {
        super(v(), "game__");
        this.isCollidable = false;
        this.isHidden = true;
        this.isRoundedPosAfterTick = false;
        // Wind 
        this.windAngle = new Angle("deg", 270);
        this.actualWindAngle = new Angle("deg", 270);
        this.windSpeed = 4;

        this.loop("windAngleChange", () => {
            if(chance(5)) {
                this.actualWindAngle.set(this.actualWindAngle.deg + Random.sign() * Random.int(10,40));
                console.log("windAngleChanged");
            }
            console.log("tryedWindAngleChanged");
        }, 1);

        // End Wind

        // Water
        this.water = new Background([["water"]], "tiled");
        this.water.setScale(v(5));
        this.water.setScroll(v(this.windSpeed, 0));
        this.water.alpha = 1;
        this.water.angle = this.windAngle;
        // End Water

        this.camLerpMult = 0.2;


    }
    tick() {
        // Wind
        this.windAngle.interpolate(this.actualWindAngle, 0.05);
        
        
        // End Wind

        // Water
        this.water.update();
        // End Water


        camera.pos.x = lerp(camera.pos.x, ins.player[0].pos.x, this.camLerpMult);
        camera.pos.y = lerp(camera.pos.y, ins.player[0].pos.y, this.camLerpMult);
    }
})