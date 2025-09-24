import { Paginador } from 'App/Dominio/Paginador';
import { RepositorioReporteSimple } from 'App/Dominio/Repositorios/RepositorioReporteSimple';
import { TblReporte } from 'App/Infraestructura/Datos/Entidad/Reporte';



export class RepositorioReporteDB implements RepositorioReporteSimple {

  async listarPorFormulario(documento: string, formularioId: number, pagina?: number, limite?: number): Promise<{ reportes: any[], paginacion?: Paginador }> {
    try {
      let query = TblReporte.query().preload('estados')
        .where('tbr_vigilado_id', documento)
        .where('tbr_formulario_id', formularioId)
        .orderBy('tbr_anio_activo', 'desc');

      let paginacion: Paginador | undefined = undefined;
      if (pagina !== undefined && limite !== undefined) {
        const resultado = await query.paginate(pagina, limite);
        paginacion = new Paginador(
          resultado.total,
          resultado.currentPage,
          resultado.lastPage
        );
        const reportes = resultado.all().map(reporte => ({
          id: reporte.id,
          vigiladoId: reporte.vigiladoId,
          estadoId: reporte.estados.nombre,
          formularioId: reporte.formularioId,
          vigencia: reporte.vigencia,
          creacion: reporte.creacion,
          actualizacion: reporte.actualizacion
        }));
        return { reportes, paginacion };
      } else {
        const reportes = await query;
        return {
          reportes: reportes.map(reporte => ({
            id: reporte.id,
            vigiladoId: reporte.vigiladoId,
            estadoId: reporte.estados.nombre,
            formularioId: reporte.formularioId,
            vigencia: reporte.vigencia,
            creacion: reporte.creacion,
            actualizacion: reporte.actualizacion
          }))
        };
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error al consultar reportes por formulario');
    }
  }

  async crearReportesSiNoExisten(documento: string, formularioId: number): Promise<void> {
    try {
      // Importar aquí para evitar dependencias circulares
      const { TblAnioVigencias } = await import('App/Infraestructura/Datos/Entidad/AnioVigencia');

      // Obtener años activos
      const anosActivos = await TblAnioVigencias.query().where('anv_estado', true);

      for (const ano of anosActivos) {
        const existeReporte = await TblReporte.query()
          .where('tbr_vigilado_id', documento)
          .where('tbr_formulario_id', formularioId)
          .where('tbr_anio_activo', ano.anio)
          .first();

        if (!existeReporte) {
          const nuevoReporte = new TblReporte();
          nuevoReporte.vigiladoId = documento;
          nuevoReporte.estadoId = 1002; // Estado inicial
          nuevoReporte.formularioId = formularioId;
          nuevoReporte.vigencia = ano.anio;
          await nuevoReporte.save();
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear reportes faltantes');
    }
  }

}
