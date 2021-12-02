export function Init(game){
    if (game.debug) console.log("Screen Manager Loaded");

    const WIDTH = game.resolution.w;
    const HEIGHT = game.resolution.h;

    for (let i = 0; i < game.canvas_list.length; ++i) {
        game.canvas_list[i].ca.width = WIDTH;
        game.canvas_list[i].ca.height = HEIGHT;

        Resize(game, game.canvas_list[i].cx, game.canvas_list[i].ca);
    }

    window.addEventListener('resize', function(e) {
        for (let i = 0; i < game.canvas_list.length; ++i) {    
            Resize(game, game.canvas_list[i].cx, game.canvas_list[i].ca);
        }
    });

}


export function Resize(game, _ctx, _canvas){
    const border = 100;
    const aspect = {w:6.5, h:4};
    const img_smooth = false;
    let w = window.innerWidth;
    let h = w * (aspect.h / aspect.w);

    if (h < window.innerHeight){
        // Check window width
        w = window.innerWidth;
        h = w * (aspect.h / aspect.w);
    } else {
        // Check window height
        h = window.innerHeight;
        w = h * (aspect.w / aspect.h);
    }

    if (game.debug) console.log("Resized", "W", Math.floor(w), "H", Math.floor(h));

    _canvas.style.width = `${w - border}px`;
    _canvas.style.height = `${h - border}px`;

    // Graphic sharpness
    _ctx.mozImageSmoothingEnabled = img_smooth;
    _ctx.msImageSmoothingEnabled = img_smooth;
    _ctx.imageSmoothingEnabled = img_smooth;
}

