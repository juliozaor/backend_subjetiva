import { FiltrosMesPatioModalidad } from "../Datos/Entidades/Dtos/FiltrosMesPatioModalidad";
import { MesPatioModalidad } from "../Datos/Entidades/MesPatioModalidad";
import { Paginable } from "../Tipos/Tipos";

export interface RepositorioMesPatioModalidad{
    obtenerPorId(id: number): Promise<MesPatioModalidad | null>
    actualizar(mesPatioModalidad: MesPatioModalidad): Promise<MesPatioModalidad>
    filtrar(filtros: FiltrosMesPatioModalidad): Promise<MesPatioModalidad[]>
}