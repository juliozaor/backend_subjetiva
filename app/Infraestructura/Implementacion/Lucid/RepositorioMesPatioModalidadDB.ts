import { FiltrosMesPatioModalidad } from "App/Dominio/Datos/Entidades/Dtos/FiltrosMesPatioModalidad";
import { MesPatioModalidad } from "App/Dominio/Datos/Entidades/MesPatioModalidad";
import { RepositorioMesPatioModalidad } from "App/Dominio/Repositorios/RepositorioMesPatioModalidad";
import { TblVehiculosMeses } from "App/Infraestructura/Datos/Entidad/VehiculoMes";

export class RepositorioMesPatioModalidadDB implements RepositorioMesPatioModalidad {
    
    async obtenerPorId(id: number): Promise<MesPatioModalidad | null> {
        const mesVehiculoDb = await TblVehiculosMeses.find(id)
        return mesVehiculoDb ? mesVehiculoDb.obtenerMesPatioModalidad() : null 
    }
    async actualizar(mesPatioModalidad: MesPatioModalidad): Promise<MesPatioModalidad> {
        const vehiculoMesDb = new TblVehiculosMeses()
        vehiculoMesDb.establecerVehiculoMes(mesPatioModalidad, true)
        return (await vehiculoMesDb.save()).obtenerMesPatioModalidad()
    }
    async filtrar(filtros: FiltrosMesPatioModalidad): Promise<MesPatioModalidad[]> {
        const consulta = TblVehiculosMeses.query()
        if(filtros.tipo){
            console.log('tipo', filtros.tipo)
            consulta.where('vem_tipo', filtros.tipo)
        }
        if(filtros.estado !== undefined){
            consulta.where('vem_estado', filtros.estado)
        }
        consulta.orderBy('vem_mes', 'asc')
        return (await consulta).map( mesPatioModalidadDb => mesPatioModalidadDb.obtenerMesPatioModalidad())
    }

}