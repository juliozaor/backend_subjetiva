import { RepositorioTarifas } from "App/Dominio/Repositorios/RepositorioTarifas";
import { PeticionCrearTarifa } from "./Dtos/PeticionCrearTarifa";
import { Tarifa } from "../Entidades/Tarifa";
import { FiltrosTarifas } from "../Entidades/Dtos/FiltrosTarifas";

export class ServicioTarifas{
    constructor(private repositorio: RepositorioTarifas){}

    obtenerTarifas(pagina: number, limite: number, filtros: FiltrosTarifas){
        return this.repositorio.obtenerTarifas(pagina, limite, filtros)
    }

    eliminarTarifa(tarifaId: number){
        return this.repositorio.eliminarTarifa(tarifaId)
    }

    guardarTarifa(peticion: PeticionCrearTarifa){
        let tarifa = new Tarifa({
            actoAdministrativoDocumento: peticion.actoAdministrativoDocumento,
            actoAdministrativoOriginal: peticion.actoAdministrativoOriginal,
            actoAdministrativoRuta: peticion.actoAdministrativoRuta,
            estructuraCostosDocumento: peticion.estructuraCostosDocumento,
            estructuraCostosOriginal: peticion.estructuraCostosOriginal,
            estructuraCostosRuta: peticion.estructuraCostosRuta,
            idServicioModalidad: peticion.idServicioModalidad,
            tarifaAutorizada: peticion.tarifaAutorizada,
            vigencia: peticion.vigencia,
            idVigilado: peticion.idVigilado
        })
        return this.repositorio.guardarTarifa(tarifa)
    }
}