import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioDatosTransito } from "App/Dominio/Datos/Servicios/ServicioDatosTransito";
import { RepositorioDatosTransitoDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioDatosTransitoDB";
import Env from '@ioc:Adonis/Core/Env';

export default class ControladorTransito {
    private servicio: ServicioDatosTransito
    constructor() {
        this.servicio = new ServicioDatosTransito(new RepositorioDatosTransitoDB());
    }


    public async obtener ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = request.input('vigencia')
        const Transito = await this.servicio.obtener(documento, vigencia)
        return Transito
      }

    public async guardar ({request, response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const { vigencia } = request.all()
        try {

          const Transito = await this.servicio.guardar(request.all(), documento, vigencia)

          return Transito
        } catch (error) {
         throw error;
        }
       }

       public async enviar ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = request.input('vigencia')
        const Transito = await this.servicio.enviar(documento, vigencia)
        return Transito
      }

}
