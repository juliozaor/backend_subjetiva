
import { ReportaMunicipios } from '../Datos/Entidades/ReportaMunicipios';
export interface RepositorioOtrosMunicipios {
  obtener(idUsuario: string): Promise<any>
  crear(idUsuario: string, param: any): Promise<any>
}
