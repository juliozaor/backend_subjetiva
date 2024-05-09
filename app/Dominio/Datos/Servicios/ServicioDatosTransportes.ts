/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosTransporte } from 'App/Dominio/Repositorios/RepositorioDatosTransporte'
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class ServicioDatosTransportes{
  constructor (private repositorio: RepositorioDatosTransporte) { }

  async guardar (datos:string, payload:PayloadJWT, vigencia:number): Promise<any> {
    const {documento} = payload;
    return this.repositorio.guardar(datos, documento, vigencia);
  }

}
