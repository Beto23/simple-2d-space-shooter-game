// Objetos importantes de canvas
const canvas : any = document.getElementById('main');
const ctx = canvas.getContext('2d');

//Definicion de variables para imagenes
let fondo : any;

//Definicion de funciones
function loadMedia() : void {
    fondo = new Image();
    fondo.src = './images/fondo.jpeg';
    fondo.onload = () => {
        const intervalo = window.setInterval(frameLoop, 1000/55);
    }
}

function drawBackgraoud() : void {
    ctx.drawImage(fondo,0,0)
}

function frameLoop() : void {
    drawBackgraoud();
}

//Ejecucion de funciones
loadMedia();