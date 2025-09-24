/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosPortuaria } from 'App/Dominio/Repositorios/RepositorioDatosPortuaria'
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class ServicioDatosPortuarias{
  constructor (private repositorio: RepositorioDatosPortuaria) { }

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
