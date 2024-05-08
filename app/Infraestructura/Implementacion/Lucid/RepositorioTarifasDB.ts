import { FiltrosTarifas } from "App/Dominio/Datos/Entidades/Dtos/FiltrosTarifas";
import { Tarifa } from "App/Dominio/Datos/Entidades/Tarifa";
import { RepositorioTarifas } from "App/Dominio/Repositorios/RepositorioTarifas";
import { Paginable } from "App/Dominio/Tipos/Tipos";
import { TblTarifas } from "App/Infraestructura/Datos/Entidad/Tarifas";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { Exception } from "@adonisjs/core/build/standalone";

export class RepositorioTarifasDB implements RepositorioTarifas{
    
    async obtenerTarifas(pagina: number, limite: number, filtros: FiltrosTarifas): Promise<Paginable<Tarifa>> {
        const query = TblTarifas.query()
        if(filtros.idVigilado){
            query.where('tar_id_vigilado', filtros.idVigilado)
        }
        if(filtros.vigencia){
            query.where('tar_vigencia', filtros.vigencia)
        }
        const paginador = await query.paginate(pagina, limite)
        const paginacion = MapeadorPaginacionDB.obtenerPaginacion(paginador)
        const datos = paginador.all().map( tarifaDb => tarifaDb.obtenerTarifa() )
        return {
            datos,
            paginacion
        }
    }

    async guardarTarifa(tarifa: Tarifa): Promise<Tarifa> {
        let tarifaBd = new TblTarifas()
        tarifaBd.establecerTarifa(tarifa)
        return (await tarifaBd.save()).obtenerTarifa()
    }
    
    async eliminarTarifa(tarifaId: number): Promise<void> {
        try{
            let resultado = await TblTarifas.query().delete().where('tar_id', tarifaId)
            if(resultado.length < 1){
                throw new Exception(`No se pudo eliminar la tarifa`, 500)    
            }
        }catch(e){
            throw new Exception(`No se pudo eliminar la tarifa: ${e.message}`, 500)
        }
    }

}