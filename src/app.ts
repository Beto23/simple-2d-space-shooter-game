window.addEventListener('load', init);

function init () : void {
    console.log('cargado');
    const canvas : any = document.getElementById('micanvas');
    const ctx = canvas.getContext('2d'); //context canvas
    ctx.fillRect(20,20,50,50); // Dibujando cuadrado
}