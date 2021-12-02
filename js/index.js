// Screen Resize
import * as Screen from './mods/screen_manager.js';

const { ipcRenderer } = require('electron');


window.addEventListener('load', function(){

    // Context
    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.debug = false;
            this.resolution = {w: 1088, h: 640};
            this.size = size;
            this.timeStamp = 1;

            this.penID = 13;
            this.eraserID = 0;
            this.padID = 0;

            this.PenPressureCurve = `0 28 70 100`;

            this.images = {};

            this.ctx = ctx;
            this.overlayCtx = overlayCtx;

            this.canvas_list = [
                {cx: ctx, ca: canvas}, 
                {cx: overlayCtx, ca: overlay},
            ];

            this.mouse = {
                pos:{x:0, y:0},
                size:{w:64, h:64},
                click:false,
            }

            this.objects = [];
        }

        init(){
            if (this.debug) console.log("Game Started");
        }

        update(deltaTime){
            // Update Objects
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){

            // this.canvas_list[0].cx.fillText("Test", 32, 32);
        }

        instance(_list, _ob, _pos, _size, _speed) {
            if (_ob !== null){
                _list.push(new _ob(this, _pos, _size, _speed));
                _list[_list.length-1].init();

                _list.sort(function(a,b){
                    return a.pos.y - b.pos.y;
                });
            }
        }

        remove_instance(_list, _ob){
            _list = _list.filter(_ob => !_ob.markedForDeletion)
        }

    }


    // Update loop ---------------------------------------
    const game = new Game( {w:canvas.width, h:canvas.height} );
    Screen.Init(game);
    game.init();


    // Return Values
    listHome.addEventListener("click", function(e){
        ipcRenderer.send('run-cmd', 'ls ~/.');
    });

    listDevices.addEventListener("click", function(e){
        ipcRenderer.send('run-cmd', 'xsetwacom --list devices');
    });

    listMonitors.addEventListener("click", function(e){
        ipcRenderer.send('run-cmd', 'xrandr --listactivemonitors');
    });

    penPressure.addEventListener("change", function(e){
        console.log(`Pressure: ${e.target.value}`)
        // ipcRenderer.send('run-cmd', 'xsetwacom --list-devices');
    });

    // Run Apps
    appBlender.addEventListener("click", function(e){
        ipcRenderer.send('run-cmd', 'blender');
    });

    // ID Set
    idPen.addEventListener("change", function(e){
        game.penID = Number(e.target.value);
        console.log(`Pen: ${e.target.value}`)
    });

    idPad.addEventListener("change", function(e){
        game.padID = Number(e.target.value);
        console.log(`Pad: ${e.target.value}`)
    });

    idEraser.addEventListener("change", function(e){
        game.eraserID = Number(e.target.value);
        console.log(`Eraser: ${e.target.value}`)
    });

    // Set monitor values
    edp1.addEventListener("click", function(e){
        ipcRenderer.send('run-cmd', `xsetwacom set ${game.penID} MapToOutput "eDP1"`);
    });

    hdmi1.addEventListener("click", function(e){
        ipcRenderer.send('run-cmd', `xsetwacom set ${game.penID} MapToOutput "HDMI1"`);
    });


    // Set Pen values
    penPressure.addEventListener("click", function(e){
        game.PenPressureCurve = `xsetwacom set ${game.penID} PressureCurve 0 ${Math.floor(e.target.value * 0.5)} ${Math.floor(e.target.value)} 100`;
        ipcRenderer.send('run-cmd', `${game.PenPressureCurve}`);
        console.log(`${game.PenPressureCurve}`);
    });


    // Mouse.Move(game, canvas);
    // Mouse.Leave(game);
    // Mouse.Down(game);
    // Mouse.Up(game);

    let lastTime = 1;
    function animate(timeStamp) {
        for (let i = 0; i < game.canvas_list.length; ++i) game.canvas_list[i].cx.clearRect(0,0,game.canvas_list[i].ca.width, game.canvas_list[i].ca.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();
});