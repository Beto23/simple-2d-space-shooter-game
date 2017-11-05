export function golpear(a:any,b:any) : boolean {
    let golpear : boolean = false;
    if(b.x + b.width >= a.x && b.x < a.x + a.width) {
        if(b.y + b.height >= a.y && b.y  < a.y + a.height){
            golpear = true;
        }
    }
    if(b.x <= a.x && b.x + b.width >= a.x + a.width) {
        if(b.y <= a.y && b.y + b.height >= a.y + a.height){
            golpear = true;
        }
    }
    if(a.x <= b.x && a.x + a.width >= b.x + b.width){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            golpear = true;
        }
    }
    return golpear;
}