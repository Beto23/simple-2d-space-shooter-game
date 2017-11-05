export interface naveDO {
    x: number,
    y: number,
    width: number,
    height: number,
    contador: number,
    estado?: string
}

export interface naveDisparosDO {
    x: number
    y: number
    width: number,
    height: number
}

export interface juegoDO {
    estado: string;
}

export interface enemigoDO {
    x: number,
    y: number,
    height: number,
    width: number,
    estado: string,
    contador: number
}

export interface textoRespuestaDO {
    contador: number,
    titulo: string,
    subtitulo: string
}