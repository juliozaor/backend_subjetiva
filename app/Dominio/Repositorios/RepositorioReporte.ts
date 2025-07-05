import { EstadosVerificado } from "../Datos/Entidades/EstadosVerificado";
import { Reportadas } from "../Dto/Encuestas/Reportadas";
import { Paginador } from "../Paginador";

export interface RepositorioReporte {
  listarPorFormulario(documento: string, formularioId: number, pagina?: number, limite?: number): Promise<{ reportes: any[], paginacion: Paginador }>
  crearReportesSiNoExisten(documento: string, formularioId: number): Promise<void>
}
