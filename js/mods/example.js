// Draw Manager
import * as Graphics from '../modules/draw_manager.js';

// Collision Manager
import * as Colliders from '../modules/collision_manager.js';

// Towers
export class Example {
    constructor(game){
        this.game = game;
        this.name = `Gear_${this.game.objects.length}`;
        this.image = fusion;
        this.spriteSize = {w:36, h:42};
        this.angle = 0 * Math.PI / 180.0;
        this.interact = false;
        this.gravity = {x: 0, y: 3};
        this.drag = {x: 0.9, y: 0.9};
        this.jumping = false;
        this.jumpHeight = 70;
        this.velocity = {x:0, y:0};
        this.gravDir = true;
        this.test = false;
        this.floor_pos = canvas.height;
        this.markedForDeletion = false;
    }

    init(){
        if (this.game.debug) console.log("Added Gear", this.game.objects.length);

        // for (let x = 0; x < 4; ++x){
        //     for (let y = 0; y < 4; ++y){
        //         this.tileList.push({x: this.tileSize.w * x, y: this.tileSize.h * y});
        //     }
        // }
        // console.log(this.tileList);
    }

    jump() {
        if (this.jumping === false) {
            this.velocity.y -= this.jumpHeight;
            this.jumping = true;
        }
    }

    update(deltaTime){

        // Jump
        if (this.game.key_jump) {
            this.jump();
        }

        // Move Left
        if (this.game.key_left) {
            if (!this.jumping) {
                this.velocity.x -= 2.5;
            } else {
                this.velocity.x -= 2.5 * 0.65;
            }
        }

        // Move Right
        if (this.game.key_right) {
            if (!this.jumping) {
                this.velocity.x += 2.5;
            } else {
                this.velocity.x += 2.5 * 0.65;
            }
        }

        // Up / Down Friction
        if (this.velocity.y > 0 || this.velocity.y < 0) {
            this.velocity.y *= this.drag.y;
        }

        // LEft / Right Friction
        if (this.velocity.x > 0 || this.velocity.x < 0) {
            this.velocity.x *= this.drag.x;
        }

        // Collision Left
        if (this.pos.x < 0) {
            this.pos.x = canvas.width;
        }

        // Collision Right
        if (this.pos.x > canvas.width) {
            this.pos.x = 0;
        }
        
        // Gravity
        if (this.pos.y < canvas.height - this.size.h *0.5) {
            this.velocity.y += this.gravity.y;
        }
        
        // Move Left
        // this.velocity.x -= 1;

        if (this.pos.y > canvas.height - this.size.h *0.5) {
            this.velocity.y = 0;
            this.pos.y = canvas.height - this.size.h *0.5;
            this.jumping = false;
            // this.jump();
        }

        // Move Object
        this.pos.x += Math.round(this.velocity.x);
        this.pos.y += Math.round(this.velocity.y);

        // Rotate
        this.angle += Math.round(this.speed * Math.PI / 180.0);

        // Mouse inside self gear check
        // if (this.interact !== interact_area_self(this.game.mouse, this)){
        //     this.interact = interact_area_self(this.game.mouse, this);
        // }

        // Mouse inside area gear check
        if (this.interact !== Colliders.Area(this.game.mouse, this)){
            this.interact = Colliders.Area(this.game.mouse, this);
        }

        if (Math.round(this.velocity.x) > 0) {
            console.log(this.velocity.x % deltaTime);
        }
    } 

    draw(){
        
        // Display image, rotate canvas, reset canvas rotation
        if (!this.game.debug) {
            if (this.interact) {
                Graphics.Image(this.game.ctx, this.image, {x:0, y:0}, {x:this.pos.x, y:this.pos.y}, this.size, this.angle, this.spriteSize, 1);
            } else {
                Graphics.Image(this.game.ctx, this.image, {x:0, y:0}, {x:this.pos.x, y:this.pos.y}, this.size, this.angle, this.spriteSize, 1);   
            }
        } else {
            Graphics.Line(this.game.ctx, {x: this.pos.x, y: this.pos.y + this.size.h * 0.5}, {x: this.pos.x, y: canvas.height}, {w: 0, h: 0} , 3, "Red", 1);
            Graphics.Image(this.game.ctx, this.image, {x:0, y:0}, {x:this.pos.x, y:this.pos.y}, this.size, this.angle, this.spriteSize, 0.3);   
            Graphics.Bevel_Outline(this.game.ctx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Black', 1);
        }

        // Show Mouse Interact Bounds
        if (this.interact && this.game.debug){
            // Graphics.Line(this.game.overlayCtx, this.pos, {x: this.pos.x, y: canvas.height}, 0, 3, "Red", 1);
            Graphics.Bevel_Outline(this.game.overlayCtx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Red', 1);
            Graphics.Text(this.game.overlayCtx, this.name, null, 50, "center", "Teal", 1, {x:this.pos.x, y:this.pos.y-this.size.h*0.5-8});
        } 

        if (this.test){
            Graphics.Bevel_Outline(this.game.overlayCtx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Gold', 1);
        }

    }
}


export class Gear_01 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    }
}


export class Gear_02 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    }
}


export class Gear_03 extends Example {
    constructor(game, pos, size, speed){
        super(game);
        this.pos = pos;
        this.size = size;
        this.speed = speed;
    }
}


