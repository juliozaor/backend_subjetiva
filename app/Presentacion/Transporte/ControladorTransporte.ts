import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioDatosTransportes } from "App/Dominio/Datos/Servicios/ServicioDatosTransportes";
import { RepositorioDatosTransporteDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioDatosTransporteDB";
import Env from '@ioc:Adonis/Core/Env';

export default class ControladorTransporte {
    private servicio: ServicioDatosTransportes
    constructor() {
        this.servicio = new ServicioDatosTransportes(new RepositorioDatosTransporteDB());
    }


    public async obtener ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = request.input('vigencia')
        const Transporte = await this.servicio.obtener(documento, vigencia)
        return Transporte
      }

    public async guardar ({request, response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const { vigencia } = request.all()
        try {

          const Transporte = await this.servicio.guardar(request.all(), documento, vigencia)

          return Transporte
        } catch (error) {
         throw error;
        }
       }

       public async enviar ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = request.input('vigencia')
        const Transporte = await this.servicio.enviar(documento, vigencia)
        return Transporte
      }

}
