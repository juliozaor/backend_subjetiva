/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosTransito } from 'App/Dominio/Repositorios/RepositorioDatosTransito'
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class ServicioDatosTransito{
  constructor (private repositorio: RepositorioDatosTransito) { }

  async guardar (datos:string, payload:PayloadJWT, vigencia:number): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, documento, vigencia);
  }

}
