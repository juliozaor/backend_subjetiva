import { RepositorioOtrosMunicipios } from "App/Dominio/Repositorios/RepositorioOtrosMunicipios";

export class ServicioOtrosMunicipios {
  constructor (private repositorio: RepositorioOtrosMunicipios) { }

  async obtener(idUsuario: string): Promise<any> {
    return this.repositorio.obtener(idUsuario);
  }

  async crear( idUsuario: string, datos: string): Promise<any> {
    return this.repositorio.crear(idUsuario, datos );
  }

}
