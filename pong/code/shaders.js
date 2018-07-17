const shader_brighten = new Shader(
    function() {
        return [true, 1];
    },
    function(c, args) {
        let color = new Color(c.r, c.g, c.b, c.a);
        color.r = 255//color.r + 10 * args[0];
        color.b = 255//color.b + 10 * args[0];
        color.g = 255//color.g + 10 * args[0];
        color.clamp();
        return color;
    }
)