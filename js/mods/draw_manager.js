export function Text(_ctx, _text, _font, _size, _align, _color, _a, _pos){
    _ctx.globalAlpha = _a;
    _ctx.textAlign = _align;
    _ctx.fillStyle = _color;

    if (_font){
        _ctx.font = `${_size}px ${_font}`;
    } else {
        _ctx.font = `${_size}px ${"Noto Sans"}`;
    }

    _ctx.fillText(`${_text}`, _pos.x, _pos.y);
    _ctx.globalAlpha = 1;
}


export function Box(_ctx, _size, _color, _a, _pos){
    _ctx.globalAlpha = _a;
    _ctx.fillStyle = _color;
    _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h);
    _ctx.globalAlpha = 1;
}


export function Bevel_Outline(_ctx, _x, _y, _w, _h, _r, _color, _a){
    _ctx.beginPath();

    _ctx.strokeStyle = _color;
    _ctx.globalAlpha = _a;

    // Set faux rounded corners
    _ctx.lineJoin = "round";
    _ctx.lineWidth = _r;

    // Stroke Outline
    _ctx.strokeRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);
    
    _ctx.closePath();
    _ctx.globalAlpha = 1.0;
  }


export function Line(_ctx, _pos_start, _pos_end, offset, _thickness, _color, _a) {
    _ctx.strokeStyle = _color;
    _ctx.globalAlpha = _a;
    _ctx.lineWidth = _thickness;

    if ( !offset ) { 
        offset = {w: offset.w, h: offset.h};
    }

    // draw a red line
    _ctx.beginPath();
    _ctx.moveTo(_pos_end.x+offset.w*0.5, _pos_end.y+offset.h*0.5);
    _ctx.lineTo(_pos_start.x+offset.w*0.5, _pos_start.y+offset.h*0.5);
    _ctx.stroke();

    _ctx.globalAlpha = 1.0;
}


export function Image(_ctx, _image, _frame, _pos, _size, _rot, _spriteSize, _a){
    _ctx.globalAlpha = _a;

    _ctx.save();
    _ctx.translate(_pos.x, _pos.y);
    _ctx.rotate(_rot);

    _ctx.drawImage(_image, 
    _frame.x, _frame.y, _spriteSize.w, _spriteSize.h, 
    _pos.x-_pos.x-_size.w*0.5, _pos.y-_pos.y-_size.h*0.5, 
    _size.w, _size.h);

    _ctx.restore();
    _ctx.globalAlpha = 1.0;
}




