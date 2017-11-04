// Objetos importantes de canvas
const canvas : any = document.getElementById('main');
const ctx = canvas.getContext('2d');
console.log(ctx);

// creando objeto de la nave (class)
const nave = {
    x: 100,
    y: canvas.height -70,
    width: 50,
    height: 50
}

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

function dibujarFondo() : void {
    ctx.drawImage(fondo,0,0)
}

function dibujarNave() : void {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(nave.x, nave.y, nave.width, nave.height);
    ctx.restore();
}

function frameLoop() : void {
    dibujarFondo();
    dibujarNave();
}

//Ejecucion de funciones
loadMedia();