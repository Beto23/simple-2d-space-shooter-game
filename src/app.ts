import {
    Nave,
    agregarEventosTeclado
}  from './game/';
import { naveDO } from './shared/displayObjectGame';
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

//Definicion de variables para imagenes
let fondo : any;
let teclado : any = {};

const nave = new Nave(canvas, ctx, naveObject, teclado);

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

function frameLoop() : void {
    dibujarFondo();
    nave.dibujarNave();
    nave.moverNave();
}

//Ejecucion de funciones
agregarEventosTeclado(teclado);
loadMedia();