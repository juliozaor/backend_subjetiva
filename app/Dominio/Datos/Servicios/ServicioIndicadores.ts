
import { Paginador } from "App/Dominio/Paginador";
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";
import { RepositorioIndicador } from "App/Dominio/Repositorios/RepositorioIndicador";

export class ServicioIndicadores {
  constructor (private repositorio: RepositorioIndicador) { }

  async visualizar(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.visualizar(params);
  }

  async enviarSt(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    return this.repositorio.enviarSt(params);
  }

  async guardar(datos: string, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, documento);
  }

  async ejecucion(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.ejecucion(params);
  }

  async patios(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.patios(params);
  }

  async empresas(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.empresas(params);
  }

  async guardarEjecucion(datos: string, payload:PayloadJWT): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardarEjecucion(datos, documento);
  }

  async enviarStEjecucion(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    return this.repositorio.enviarStEjecucion(params);
  }

}
