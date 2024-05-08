import { FiltrosTarifas } from "../Datos/Entidades/Dtos/FiltrosTarifas";
import { Tarifa } from "../Datos/Entidades/Tarifa";
import { Paginable } from "../Tipos/Tipos";

export interface RepositorioTarifas{
    obtenerTarifas(pagina: number, limite: number, filtrosTarifas: FiltrosTarifas): Promise<Paginable<Tarifa>>
    guardarTarifa(tarifa: Tarifa): Promise<Tarifa>
    eliminarTarifa(tarifaId: number): Promise<void>
}