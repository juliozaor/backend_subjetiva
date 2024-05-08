import { DateTime } from "luxon"

export class Tarifa {
    id?: number
    idServicioModalidad: number
    idVigilado: string
    vigencia: number
    tarifaAutorizada: number
    actoAdministrativoDocumento: string
    actoAdministrativoRuta: string
    actoAdministrativoOriginal: string
    estructuraCostosDocumento: string
    estructuraCostosRuta: string
    estructuraCostosOriginal: string
    creado: DateTime
    actualizado: DateTime

    constructor({
        id,
        idServicioModalidad,
        idVigilado,
        vigencia,
        tarifaAutorizada,
        actoAdministrativoDocumento,
        actoAdministrativoRuta,
        actoAdministrativoOriginal,
        estructuraCostosDocumento,
        estructuraCostosRuta,
        estructuraCostosOriginal,
        creado,
        actualizado
    }: {
        id?: number,
        idServicioModalidad: number,
        idVigilado: string,
        vigencia: number,
        tarifaAutorizada: number,
        actoAdministrativoDocumento: string,
        actoAdministrativoRuta: string,
        actoAdministrativoOriginal: string,
        estructuraCostosDocumento: string,
        estructuraCostosRuta: string,
        estructuraCostosOriginal: string,
        creado?: DateTime,
        actualizado?: DateTime
    }) {
        this.id = id
        this.idServicioModalidad = idServicioModalidad
        this.idVigilado = idVigilado
        this.vigencia = vigencia
        this.tarifaAutorizada = tarifaAutorizada,
        this.actoAdministrativoDocumento = actoAdministrativoDocumento
        this.actoAdministrativoRuta = actoAdministrativoRuta
        this.actoAdministrativoOriginal = actoAdministrativoOriginal
        this.estructuraCostosDocumento = estructuraCostosDocumento
        this.estructuraCostosRuta = estructuraCostosRuta
        this.estructuraCostosOriginal = estructuraCostosOriginal
        this.creado = creado ?? DateTime.now()
        this.actualizado = actualizado ?? DateTime.now()
    }
}