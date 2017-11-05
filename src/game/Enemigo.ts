import { juegoDO, enemigoDO, naveDisparosDO } from '../shared/displayObjectGame';
import { golpear } from './golpear';


export class Enemigo {
    enemigos : Array<enemigoDO> = []
    ctx : any;

    constructor(ctx: any){
        this.ctx = ctx;
    }

    dibujarEnemigos() : void {
        this.enemigos.map(enemigo => {
            this.ctx.save();
            enemigo.estado === 'vivo' ? this.ctx.fillStyle = 'red' : null;
            enemigo.estado === 'muerto' ? this.ctx.fillStyle = 'black' : null; 
            this.ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);           
        });
    }

    actualizaEnemigos(juego: juegoDO) : void {
        // crear enemigos
        if(juego.estado === 'iniciando') {
            for(let i = 0; i<10; i++) {
                this.enemigos.push({
                    x: 10 + (i*50),
                    y: 10,
                    height: 40,
                    width: 40,
                    estado: 'vivo',
                    contador: 0
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
            }

            if(enemigo && enemigo.estado == 'golpeado') {
                enemigo.contador++;
                if(enemigo.contador >= 20) {
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
                    console.log('hubo contacto');
                }
            });
        });
    }
}