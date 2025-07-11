import { TblActualEstados } from "App/Infraestructura/Datos/Entidad/ActualEstados";
import { TblLogEstados } from "App/Infraestructura/Datos/Entidad/LogEstados";
import { TblReporte } from "App/Infraestructura/Datos/Entidad/Reporte";

export class ServicioEstados {

  public async Log(vigiladoId: string, estadoId: number, vigencia: number, formularioId: number) {
   const existe = await TblLogEstados.query().where(
    {'tle_vigilado_id': vigiladoId, 'tle_estado_id': estadoId, 'tle_formulario_id': formularioId, 'tle_anio_activo': vigencia}).first()
      if (!existe) {
        const logEstados = new TblLogEstados()
        logEstados.vigiladoId = vigiladoId
        logEstados.estadoId = estadoId
        logEstados.formularioId = formularioId
        logEstados.vigencia = vigencia
        await logEstados.save()

        this.estadoReporte(vigiladoId,estadoId,vigencia,formularioId)
        this.actualizarReporte(vigiladoId,estadoId,vigencia,formularioId)
      }
  }



  public async estadoReporte(vigiladoId: string, estadoId: number, vigencia: number, formularioId: number) {

    const existe = await TblActualEstados.query().where(
      {'tae_vigilado_id': vigiladoId, 'tae_formulario_id': formularioId, 'tae_anio_activo': vigencia}).first()
        if (!existe) {
          console.log("no existe ", estadoId);

          const logEstados = new TblActualEstados()
          logEstados.vigiladoId = vigiladoId
          logEstados.estadoId = estadoId
          logEstados.formularioId = formularioId
          logEstados.vigencia = vigencia
          await logEstados.save()
        }else{
          console.log("existe ", estadoId);

          existe.estadoId = estadoId
          await existe.save()
        }


  }

  public async consultarEnviado(vigiladoId: string, vigencia: number, formularioId: number): Promise<boolean> {

    const existe = await TblActualEstados.query().where(
      {'tae_vigilado_id': vigiladoId,
      'tae_formulario_id': formularioId,
      'tae_anio_activo': vigencia,
      'tae_estado_id': 1004})
      .first()

        if (!existe) {
          return true
        }

        return false


  }

  public async actualizarReporte(vigiladoId: string, estadoId: number, vigencia: number, formularioId: number) {
    const existe = await TblReporte.query().where(
      {'tbr_vigilado_id': vigiladoId, 'tbr_formulario_id': formularioId, 'tbr_anio_activo': vigencia}).first()

    if (!existe) {
      const reporte = new TblReporte()
      reporte.vigiladoId = vigiladoId
      reporte.estadoId = estadoId
      reporte.formularioId = formularioId
      reporte.vigencia = vigencia
      await reporte.save()
    } else {
      existe.estadoId = estadoId
      await existe.save()
    }
  }

}
