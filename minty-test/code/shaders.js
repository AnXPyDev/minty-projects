const shader_brighten = new Shader(
    function() {
        return [true, 1];
    },
    function(c, args) {
        let color = new Color(c.r, c.g, c.b, c.a);
        color.r = color.r * args[0];
        color.b = color.b * args[0];
        color.g = color.g * args[0];
        color.clamp();
        return color;
    }
)