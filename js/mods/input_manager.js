export function Move(game) {
    window.addEventListener('mousemove', function(e) {
        let bounds = canvas.getBoundingClientRect();

        // get the mouse coordinates, subtract the canvas top left and any scrolling
        game.mouse.pos.x = e.pageX - bounds.left - scrollX;
        game.mouse.pos.y = e.pageY - bounds.top - scrollY;

        // first normalize the mouse coordinates from 0 to 1 (0,0) top left
        // off canvas and (1,1) bottom right by dividing by the bounds width and height
        game.mouse.pos.x /= bounds.width; 
        game.mouse.pos.y /= bounds.height; 

        // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
        game.mouse.pos.x *= canvas.width;
        game.mouse.pos.y *= canvas.height;
    });
}


export function Leave(game) {
    window.addEventListener('mouseleave', function(e) {
        game.mouse.pos.x = null;
        game.mouse.pos.y = null;

        game.mouse.click = false;
    });
}


// Key Input Inspired by Frank Poth 08/13/2017 https://youtu.be/8uIt9a2XBrw
export class Controller {
    constructor(game) {
        this.game = game;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.jump = false;

        this.keyListener = function(event) {
            this.key_state = (event.type === "keydown")?true:false;

            switch(event.key) {
                case "a":
                    this.left = this.key_state;
                    game.key_left = this.key_state;
                    // console.log("Pressed Left: ", this.left);
                    break;
                case "d":
                    this.right = this.key_state;
                    game.key_right = this.key_state;
                    // console.log("Pressed Right: ", this.right);
                    break;
                case "w":
                    this.up = this.key_state;
                    game.key_up = this.key_state;
                    // console.log("Pressed Up: ", this.up);
                    break;
                case " ":
                    this.jump = this.key_state;
                    game.key_jump = this.key_state;
                    // console.log("Pressed Jump: ", this.jump);
                    break;
            }
        }
    }
}



