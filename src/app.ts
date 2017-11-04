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

let juego = {
    estado: 'iniciando'
}

let teclado : any = {}
//Array para disparos
let disparos : Array<any> = [];
//Arreglo que almacena enemigos
let enemigos : Array<any> = [];

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

function dibujarEnemigos() : void {
    for(let i in enemigos) {
        const enemigo = enemigos[i];
        ctx.save();
        if(enemigo.estado === 'vivo') ctx.fillStyle = 'red';
        if(enemigo.estado === 'muerto') ctx.fillStyle = 'black';
        ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
    }
}

function moverNave() : void {
    if(teclado[37]) {
        // Movimiento a la izquierda, disminuye x
        nave.x -= 6;
        if(nave.x < 0) nave.x = 0 // limite de nave en x lado izquierdo
    }
    if(teclado[39]) {
        // Movimiento a la derecha, aumenta x
        const limite = canvas.width - nave.width; // limite de nave en x lado derecho
        nave.x += 6;
        if(nave.x > limite) nave.x = limite;
    }
    if(teclado[32]) {
        //Disparos
        console.log(teclado);
        if(!teclado.fire) {
            fire();
            teclado.fire = true
        }
    } else teclado.fire = false;
}

function actualizaEnemigos() {
    if(juego.estado === 'iniciando') {
        for(let i = 0; i<10; i++) {
            enemigos.push({
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
    for(let i in enemigos) {
        const enemigo = enemigos[i];
        if(!enemigo) continue;
        if(enemigo && enemigo.estado === 'vivo') {
            enemigo.contador++;
            enemigo.x += Math.sin(enemigo.contador * Math.PI/90)*5;
        }
    }
}

function moverDisparos() : void {
    for(let i in disparos) {
        const disparo = disparos[i];
        disparo.y -= 2;
    }
    //Elimina disparo en posicion 0 en y
    disparos = disparos.filter(disparo => {
        return disparo.y > 0;
    })
}

//Agregar disparos
function fire() {
    disparos.push({
        x: nave.x + 20,
        y: nave.y -10,
        width: 10,
        height: 30
    })
}

function dibujarDisparos() : void {
    ctx.save();
    ctx.fillStyle = 'white';
    for(let i in disparos){
        const disparo = disparos[i];
        ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
    }
    ctx.restore();
}

function frameLoop() : void {
    moverNave();
    actualizaEnemigos();
    moverDisparos();
    dibujarFondo();
    dibujarEnemigos();
    dibujarDisparos();
    dibujarNave();
}

function agregarEventosTeclado() : void {
    agregarEvento(document, 'keydown', (e) => {
        //ponemos en true la tecla presionada
        teclado[e.keyCode] = true;
    });
    agregarEvento(document, 'keyup', (e) => {
        //ponemos en false la tecla que dejo de ser presionada
        teclado[e.keyCode] = false;
    });
    function agregarEvento (elemento : any, nombreEvento, f)  {
        if(elemento.addEventListener) {
            elemento.addEventListener(nombreEvento,f,false)
        } else if (elemento.attachEvent) {
            // internet Explorer
            elemento.attachEvent(nombreEvento,f)
        }
    } 
}

//Ejecucion de funciones
agregarEventosTeclado();
loadMedia();