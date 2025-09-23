import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioDatosPortuarias } from "App/Dominio/Datos/Servicios/ServicioDatosPortuarias";
import { RepositorioDatosPortuariasDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioDatosPortuariasDB";
import Env from '@ioc:Adonis/Core/Env';

export default class ControladorPortuaria {
    private servicio: ServicioDatosPortuarias

    constructor() {
        this.servicio = new ServicioDatosPortuarias(new RepositorioDatosPortuariasDB());
    }


    public async obtener ({request,response}:HttpContextContract ){
        let { documento } = await request.obtenerPayloadJWT()
        const { nit } = request.all()
        let editar = true
        if(nit && nit != documento){
          editar = false
          documento = nit
        }
        const vigencia = request.input('vigencia')
        const portuaria = await this.servicio.obtener(documento, vigencia, editar)
        return portuaria
      }

    public async guardar ({request, response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const { vigencia } = request.all()
        try {

          const portuaria = await this.servicio.guardar(request.all(), documento, vigencia)

          return portuaria
        } catch (error) {
         throw error;
        }
       }

       public async enviar ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const  vigencia  = request.input('vigencia')
        const portuaria = await this.servicio.enviar(documento, vigencia)
        return portuaria
      }

}
