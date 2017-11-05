import { juegoDO, textoRespuestaDO, enemigoDO } from './displayObjectGame';

export function dibujaTexto(ctx: any, textoRespuesta: textoRespuestaDO, juego: juegoDO , enemigos: Array<enemigoDO>) : void {
    if(textoRespuesta.contador === -1) return;
    const alpha = textoRespuesta.contador/50.0;
    if(alpha>1) {
        for(let i in enemigos) {
            delete enemigos[i];
        }
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    if(juego.estado === 'perdido') {
        ctx.fillStyle = 'white';
        ctx.font = 'Bold 40pt Arial';
        ctx.fillText(textoRespuesta.titulo, 140,200);
        ctx.font = '14pt Arial';
        ctx.fillText(textoRespuesta.subtitulo, 190, 250);
        
    }
    if(juego.estado === 'victoria') {
        ctx.fillStyle = 'white';
        ctx.font = 'Bold 40pt Arial';
        ctx.fillText(textoRespuesta.titulo, 140,200);
        ctx.font = '14pt Arial';
        ctx.fillText(textoRespuesta.subtitulo, 190, 250);
        
    }
}