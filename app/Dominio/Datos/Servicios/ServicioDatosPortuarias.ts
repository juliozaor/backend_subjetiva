/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosPortuaria } from 'App/Dominio/Repositorios/RepositorioDatosPortuaria'
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class ServicioDatosPortuarias{
  constructor (private repositorio: RepositorioDatosPortuaria) { }

  async guardar (datos:string, payload:PayloadJWT, vigencia:number): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, documento, vigencia);
  }

}
