export function agregarEventosTeclado(teclado) : void {
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