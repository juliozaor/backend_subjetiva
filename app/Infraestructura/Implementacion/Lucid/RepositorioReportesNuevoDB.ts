import { RepositorioReporteSimple } from "App/Dominio/Repositorios/RepositorioReporteSimple";
import { TblReporte } from "App/Infraestructura/Datos/Entidad/Reporte";
import { TblAnioVigencias } from "App/Infraestructura/Datos/Entidad/AnioVigencia";
import { Paginador } from "App/Dominio/Paginador";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";

export class RepositorioReportesNuevoDB implements RepositorioReporteSimple {

  async listarPorFormulario(documento: string, formularioId: number, pagina?: number, limite?: number): Promise<{ reportes: any[], paginacion?: Paginador }> {
    try {
      const consulta = TblReporte.query()
        .where('tbr_vigilado_id', documento)
        .where('tbr_formulario_id', formularioId)
        .orderBy('tbr_anio_activo', 'desc');

      // Si no se proporcionan parámetros de paginación, retornar todos los registros
      if (!pagina || !limite) {
        const todosLosReportes = await consulta;

        const reportes = todosLosReportes.map(reporte => ({
          id: reporte.id,
          vigiladoId: reporte.vigiladoId,
          estadoId: reporte.estadoId,
          formularioId: reporte.formularioId,
          vigencia: reporte.vigencia,
          creacion: reporte.creacion,
          actualizacion: reporte.actualizacion
        }));

        return { reportes };
      }

      // Si se proporcionan parámetros de paginación, usar paginación
      const reportesPaginados = await consulta.paginate(pagina, limite);

      const reportes = reportesPaginados.all().map(reporte => ({
        id: reporte.id,
        vigiladoId: reporte.vigiladoId,
        estadoId: reporte.estadoId,
        formularioId: reporte.formularioId,
        vigencia: reporte.vigencia,
        creacion: reporte.creacion,
        actualizacion: reporte.actualizacion
      }));

      const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportesPaginados);

      return { reportes, paginacion };
    } catch (error) {
      console.log(error);
      throw new Error('Error al consultar reportes por formulario');
    }
  }

  async crearReportesSiNoExisten(documento: string, formularioId: number): Promise<void> {
    try {
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
