import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioDatosPortuarias } from "App/Dominio/Datos/Servicios/ServicioDatosPortuarias";
import { RepositorioDatosPortuariasDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioDatosPortuariasDB";

export default class ControladorPortuaria {
    private servicio: ServicioDatosPortuarias

    constructor() {
        this.servicio = new ServicioDatosPortuarias(new RepositorioDatosPortuariasDB());
    }

 
    public async obtener ({request,response}:HttpContextContract ){
        const { formularioId } = request.all()
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = 2024
        const portuaria = await this.servicio.obtener(documento, vigencia)
        return portuaria
      }

    public async guardar ({request, response}:HttpContextContract ){    
        const { documento } = await request.obtenerPayloadJWT()
        const vigencia = 2024
        try {        
         
          const portuaria = await this.servicio.guardar(request.all(), documento, vigencia)
     
          return portuaria
        } catch (error) {         
         throw error;         
        }
       }
}