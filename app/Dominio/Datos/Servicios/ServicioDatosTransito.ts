/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosTransito } from 'App/Dominio/Repositorios/RepositorioDatosTransito'
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class ServicioDatosTransito{
  constructor (private repositorio: RepositorioDatosTransito) { }

  async obtener (documento:string, vigencia:number): Promise<any> {
    return this.repositorio.obtener(documento, vigencia);
  }


  async guardar (datos:any, documento:string, vigencia:number): Promise<any> {
    return this.repositorio.guardar(datos, documento, vigencia);
  }

  async enviar (documento:string, vigencia:number): Promise<any> {
    return this.repositorio.enviar(documento, vigencia);
  }

}
