export class Nave {
    nave: any;
    ctx: any;
    constructor(nave:any, ctx:any){
        this.nave = nave;
        this.ctx = ctx;
    }

    dibujarNave() : void {
        console.log('dibujar nave');
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.nave.x, this.nave.y, this.nave.width, this.nave.height);
        this.ctx.restore();
    }  
} 