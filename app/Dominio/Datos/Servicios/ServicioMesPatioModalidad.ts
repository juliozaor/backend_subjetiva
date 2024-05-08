import { RepositorioMesPatioModalidad } from "App/Dominio/Repositorios/RepositorioMesPatioModalidad";
import { FiltrosMesPatioModalidad } from "../Entidades/Dtos/FiltrosMesPatioModalidad";
import { PeticionActualizarMesPatioModalidad } from "./Dtos/PeticionActualizarMesPatioModalidad";
import { MesPatioModalidad } from "../Entidades/MesPatioModalidad";
import { Respuesta } from "../Entidades/Respuesta";
import { Resultado } from "App/Dominio/Resultado";

export class ServicioMesPatioModalidad{

    constructor(private repositorio: RepositorioMesPatioModalidad){ }

    filtrar(filtros: FiltrosMesPatioModalidad){
        return this.repositorio.filtrar(filtros)
    }

    async actualizar(id: number, peticion: PeticionActualizarMesPatioModalidad):Promise<Resultado<MesPatioModalidad>>{
        let mesPatioModalidad = await this.repositorio.obtenerPorId(id)
        if(!mesPatioModalidad){
            return new Resultado({
                exitoso: false,
                estado: 404
            })
        }
        mesPatioModalidad.actualizar(peticion)
        mesPatioModalidad = await this.repositorio.actualizar(mesPatioModalidad)
        return new Resultado({
            exitoso: true,
            estado: 200,
            datos: mesPatioModalidad
        })
    }
}