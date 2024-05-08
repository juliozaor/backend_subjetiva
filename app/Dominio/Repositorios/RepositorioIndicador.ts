import { Reportadas } from "../Dto/Encuestas/Reportadas"
import { Paginador } from "../Paginador"

export interface RepositorioIndicador {
  visualizar(param: any): Promise<any>
  enviarSt(param: any): Promise<any>
  guardar(datos: string, documento:string): Promise<any>  
  ejecucion(param: any): Promise<any>
  guardarEjecucion(datos: string, documento:string): Promise<any>  
  enviarStEjecucion(param: any): Promise<any>
  patios(param: any): Promise<any>
  empresas(param: any): Promise<any>
}
