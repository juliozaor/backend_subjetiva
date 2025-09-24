/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosAerodromo } from 'App/Dominio/Repositorios/RepositorioDatosAerodromo'

export class ServicioDatosAerodromos{
  constructor (private repositorio: RepositorioDatosAerodromo) { }

  async obtener (documento:string, vigencia:number, editar:boolean): Promise<any> {
    return this.repositorio.obtener(documento, vigencia, editar);
  }


  async guardar (datos:any, documento:string, vigencia:number): Promise<any> {
    return this.repositorio.guardar(datos, documento, vigencia);
  }

  async enviar (documento:string, vigencia:number): Promise<any> {
    return this.repositorio.enviar(documento, vigencia);
  }

}
