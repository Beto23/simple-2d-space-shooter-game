import { juegoDO, enemigoDO, naveDisparosDO } from '../shared/displayObjectGame';
import { golpear } from '../shared/golpear';
import { aleatorio } from '../shared/getNumeroAleatorio';


export class Enemigo {
    enemigos : Array<enemigoDO> = []
    ctx : any;
    canvas: any;

    constructor(ctx: any, canvas: any){
        this.ctx = ctx;
        this.canvas = canvas;
    }

    dibujarEnemigos() : void {
        this.enemigos.map(enemigo => {
            this.ctx.save();
            enemigo.estado === 'vivo' ? this.ctx.fillStyle = enemigo.type : null;
            enemigo.estado === 'muerto' ? this.ctx.fillStyle = 'black' : null; 
            this.ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);           
        });
    }

    actualizaEnemigos(juego: juegoDO) : void {
        function agregarDisparosEnemigos(enemigo: enemigoDO){
            return {
                x: enemigo.x,
                y: enemigo.y,
                width: 10,
                height: 33,
                contador: 0
            }
        }
        // crear enemigos
        if(juego.estado === 'iniciando') {
            for(let i = 0; i<10; i++) {
                let color = 'red';
                if(i >= 0 && i<= 3) {
                    color = 'blue'
                } else if (i>3 && i<=6) {
                    color = 'green';
                }
                this.enemigos.push({
                    x: 10 + (i*50),
                    y: 10,
                    height: 40,
                    width: 40,
                    estado: 'vivo',
                    contador: 0,
                    type: color
                });
            }
            juego.estado = 'jugando';
        }
        for(let i in this.enemigos) {
            const enemigo = this.enemigos[i];
            if(!enemigo) continue;
            if(enemigo && enemigo.estado === 'vivo') {
                enemigo.contador++;
                enemigo.x += Math.sin(enemigo.contador * Math.PI/90)*5;
                if(aleatorio(0,this.enemigos.length * 10) === 4) {
                    (<any>window).disparosEnemigos.push(agregarDisparosEnemigos(enemigo));
                }
            }
            //Eliminar enemigos
            if(enemigo && enemigo.estado == 'golpeado') {
                enemigo.contador++;
                if(enemigo.contador >= 2) {
                    enemigo.estado = 'muerto';
                    enemigo.contador = 0;
                }
            }
            this.enemigos = this.enemigos.filter(enemigo => {
                if(enemigo && enemigo.estado != 'muerto') return true;
                return false;
            });
        }
    }

    verificarGolpe() : void {
        (<any>window).disparos.map((disparo:naveDisparosDO) => {
            this.enemigos.map(enemigo => {
                if(golpear(disparo,enemigo)) {
                    enemigo.estado = 'golpeado';
                    enemigo.contador = 0;
                }
            });
        });
    }

    // Disparos
    dibujarDisparosEnemigos() : void{
        (<any>window).disparosEnemigos.map((disparo: naveDisparosDO) => {
            this.ctx.save();
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
            this.ctx.restore();
        })
    }

    moverDisparosEnemigos() : void {
        (<any>window).disparosEnemigos.map((disparo: naveDisparosDO) => {
            disparo.y +=3;
        });
        (<any>window).disparosEnemigos = (<any>window).disparosEnemigos
            .filter((disparo: naveDisparosDO) => {
                return disparo.y < this.canvas.height;
            })
    }
}