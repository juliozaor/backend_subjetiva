import { Paginador } from "../Paginador";

export interface RepositorioReporteSimple {
  listarPorFormulario(documento: string, formularioId: number, pagina?: number, limite?: number): Promise<{ reportes: any[], paginacion?: Paginador }>
  crearReportesSiNoExisten(documento: string, formularioId: number): Promise<void>
}
