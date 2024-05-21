import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioDatosAerodromos } from "App/Dominio/Datos/Servicios/ServicioDatosAerodromos";
import { RepositorioDatosAerodromosDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioDatosAerodromosDB";
import Env from '@ioc:Adonis/Core/Env';

export default class ControladorAerodromo {
    private servicio: ServicioDatosAerodromos
    private vigencia = Env.get('VIGENCIA')

    constructor() {
        this.servicio = new ServicioDatosAerodromos(new RepositorioDatosAerodromosDB());
    }

 
    public async obtener ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = this.vigencia
        const aerodromo = await this.servicio.obtener(documento, vigencia)
        return aerodromo
      }

    public async guardar ({request, response}:HttpContextContract ){    
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = this.vigencia
        try {        
         
          const aerodromo = await this.servicio.guardar(request.all(), documento, vigencia)
     
          return aerodromo
        } catch (error) {         
         throw error;         
        }
       }

       public async enviar ({request,response}:HttpContextContract ){
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = this.vigencia
        const aerodromo = await this.servicio.enviar(documento, vigencia)
        return aerodromo
      }

}