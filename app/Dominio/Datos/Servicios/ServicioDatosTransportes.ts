/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDatosTransporte } from 'App/Dominio/Repositorios/RepositorioDatosTransporte'
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';

export class ServicioDatosTransportes{
  constructor (private repositorio: RepositorioDatosTransporte) { }

  async guardar (datos:any, documento:string, vigencia:number): Promise<any> {
    return this.repositorio.guardar(datos, documento, vigencia);
  }

}
