export function Origin(ob_a, ob_b) {
    const inAreaZone = ob_a.pos.x > ob_b.pos.x-ob_b.size.w*0.5 && 
                        ob_a.pos.x < ob_b.pos.x-ob_b.size.w*0.5 + ob_b.size.w &&
                        
                        ob_a.pos.y > ob_b.pos.y-ob_b.size.h*0.5 && 
                        ob_a.pos.y < ob_b.pos.y-ob_b.size.h*0.5 + ob_b.size.h;
    return inAreaZone;
} 


export function Area(ob_a, ob_b) {
    const inAreaZone = ob_a.pos.x+ob_b.size.w*0.5 > ob_b.pos.x-ob_a.size.w*0.5 && 
                        ob_a.pos.x-ob_b.size.w-ob_a.size.w*0.5 < ob_b.pos.x-ob_b.size.w*0.5 &&

                        ob_a.pos.y+ob_b.size.h*0.5 > ob_b.pos.y-ob_a.size.h*0.5 &&
                        ob_a.pos.y-ob_b.size.h-ob_a.size.h*0.5 < ob_b.pos.y-ob_b.size.h*0.5;
    return inAreaZone;
} 


export function Pos_Top(ob, _pos) {
    const inAreaZone = ob.pos.x + ob.size.w * 0.5 > _pos.x &&
                        ob.pos.y - ob.size.w * 0.5 < _pos.y
    return inAreaZone;
} 


export function Pos_Bottom(ob, _pos) {
    const inAreaZone = ob.pos.x + ob.size.w * 0.5 > _pos.x &&
                        ob.pos.y + ob.size.h * 0.5 > _pos.y
    return inAreaZone;
} 

