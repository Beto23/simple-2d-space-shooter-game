import { naveDisparosDO } from '../shared/displayObjectGame';

export class Nave {
    nave: any;
    ctx: any;
    teclado: any;
    canvas: any;
    disparos : Array<naveDisparosDO> = [];

    constructor(canvas: any, ctx:any, nave:any, teclado: any){
        this.nave = nave;
        this.ctx = ctx;
        this.teclado = teclado;
        this.canvas = canvas;
    }

    dibujarNave() : void {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.nave.x, this.nave.y, this.nave.width, this.nave.height);
        this.ctx.restore();
    }

    moverNave() : void {
        if(this.teclado[37]) {
            // Movimiento a la izquierda, disminuye x
            this.nave.x -= 6;
            if(this.nave.x < 0) this.nave.x = 0 // limite de nave en x lado izquierdo
        }
        if(this.teclado[39]) {
            // Movimiento a la derecha, aumenta x
            const limite = this.canvas.width - this.nave.width; // limite de nave en x lado derecho
            this.nave.x += 6;
            if(this.nave.x > limite) this.nave.x = limite;
        }
        if(this.teclado[32]) {
            //Disparos
            if(!this.teclado.fire) {
                this.fire();
                this.teclado.fire = true
            }
        } else this.teclado.fire = false;
    }

    //Disparos
    moverDisparos() : void {
        this.disparos.map(disparo => {
            disparo.y -=2;
        });
        //Elimina disparo en posicion 0 en y
        this.disparos = this.disparos.filter(disparo => {
            return disparo.y > 0;
        });
    }

    dibujarDisparos() : void {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.disparos.map(disparo => {
            this.ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height)
        });
        this.ctx.restore();
    }

    private fire() {
        this.disparos.push({
            x: this.nave.x + 20,
            y: this.nave.y -10,
            width: 10,
            height: 30
        })
    }
} 