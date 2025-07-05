import { RepositorioReporteSimple } from 'App/Dominio/Repositorios/RepositorioReporteSimple'
import { Paginador } from 'App/Dominio/Paginador'

export class ServicioReporte {
  constructor (private repositorio: RepositorioReporteSimple) { }

  async listarPorFormulario(documento: string, formularioId: number, pagina?: number, limite?: number): Promise<{ reportes: any[], paginacion?: Paginador }> {
    await this.repositorio.crearReportesSiNoExisten(documento, formularioId);
    return this.repositorio.listarPorFormulario(documento, formularioId, pagina, limite);
  }
}
