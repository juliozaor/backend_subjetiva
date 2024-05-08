export class Respuesta {
    mensaje: string
    estado: number

    constructor({ mensaje, estado}: { mensaje: string, estado: number }) {
        this.mensaje = mensaje
        this.estado = estado
    }
}