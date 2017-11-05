import {
    Nave,
    Enemigo,
    agregarEventosTeclado
}  from './game/';
import { naveDO, juegoDO, naveDisparosDO } from './shared/displayObjectGame';
import { dibujaTexto } from './shared/dibujarTexto';

// Objetos importantes de canvas
const canvas : any = document.getElementById('main');
const ctx = canvas.getContext('2d');
console.log(ctx);

const naveObject : naveDO = {
    x: 100,
    y: canvas.height -70,
    width: 50,
    height: 50,
    contador: 0,
}

let textoRespuesta = {
    contador: -1,
    titulo: '',
    subtitulo: ''
}

let juego : juegoDO = {
    estado: 'iniciando'
}

//Definicion de variables para imagenes
let fondo : any;
let teclado : any = {};

(<any>window).disparos = [];
(<any>window).disparosEnemigos = [];

const nave = new Nave(canvas, ctx, naveObject, teclado);
const enemigo = new Enemigo(ctx, canvas);

//Definicion de funciones
function loadMedia() : void {
    fondo = new Image();
    fondo.src = './images/fondo.jpeg';
    fondo.onload = () => {
        const intervalo = window.setInterval(frameLoop, 1000/55);
    }
}

function dibujarFondo() : void {
    ctx.drawImage(fondo,0,0)
}

function actualizarEstadoJuego() : void {
    if(juego.estado === 'jugando' && enemigo.enemigos.length == 0){
        juego.estado = 'victoria';
        textoRespuesta.titulo = 'Derrotaste a los enemigos';
        textoRespuesta.subtitulo = 'Presiona la tecla R para reiniciar';
        textoRespuesta.contador = 0;
    }
    textoRespuesta.contador >= 0 ? textoRespuesta.contador++ : null;
}

function frameLoop() : void {
    actualizarEstadoJuego();
    nave.moverNave(juego,textoRespuesta);
    enemigo.actualizaEnemigos(juego);
    nave.moverDisparos();
    enemigo.moverDisparosEnemigos();
    dibujarFondo();
    enemigo.dibujarEnemigos();
    enemigo.verificarGolpe();
    nave.verificarGolpe();
    enemigo.dibujarEnemigos();
    enemigo.dibujarDisparosEnemigos();
    nave.dibujarDisparos();
    dibujaTexto(ctx,textoRespuesta,juego,enemigo.enemigos);
    nave.dibujarNave();
}

//Ejecucion de funciones
agregarEventosTeclado(teclado);
loadMedia();