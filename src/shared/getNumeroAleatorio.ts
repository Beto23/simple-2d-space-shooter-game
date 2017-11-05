export function aleatorio(inferior, superior) : number {
    let posibilidades : number  = superior - inferior;
    let aleatorio : number = Math.random() * posibilidades;
    aleatorio = Math.floor(aleatorio);
    return parseInt(inferior) + aleatorio;
}