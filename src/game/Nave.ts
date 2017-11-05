import { naveDisparosDO, juegoDO, textoRespuestaDO, naveDO } from '../shared/displayObjectGame';
import { golpear } from '../shared/golpear';


export class Nave {
    nave: naveDO;
    ctx: any;
    teclado: any;
    canvas: any;

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

    moverNave(juego: juegoDO, textoRespuesta: textoRespuestaDO) : void {
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
        if(this.nave.estado === 'golpeado') {
            this.nave.contador++;
            if(this.nave.contador >= 20) {
                this.nave.contador = 0;
                this.nave.estado = 'muerto';
                juego.estado = 'perdido';
                textoRespuesta.titulo = 'Game Over';
                textoRespuesta.subtitulo = 'Presiona la tecla R para continuar';
                textoRespuesta.contador = 0;
            }
        }
    }

    //Disparos
    moverDisparos() : void {
        (<any>window).disparos.map((disparo:naveDisparosDO) => {
            disparo.y -=2;
        });
        //Elimina disparo en posicion 0 en y
        (<any>window).disparos = (<any>window).disparos.filter((disparo:naveDisparosDO) => {
            return disparo.y > 0;
        });
    }

    dibujarDisparos() : void {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        (<any>window).disparos.map((disparo:naveDisparosDO) => {
            this.ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height)
        });
        this.ctx.restore();
    }

    verificarGolpe() : void {
        if(this.nave.estado === "golpeado" || this.nave.estado === "muerto") return;
        (<any>window).disparosEnemigos.map((disparo: naveDisparosDO) => {
            if(golpear(disparo, this.nave)){
                this.nave.estado = 'golpeado';
                console.log('contacto');
            }
        })
    } 

    private fire() {
        (<any>window).disparos.push({
            x: this.nave.x + 20,
            y: this.nave.y -10,
            width: 10,
            height: 30
        })
    }
} 