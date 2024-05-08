import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAutenticacionJWT } from 'App/Dominio/Datos/Servicios/ServicioJWT'
import { Roles } from 'App/Dominio/Roles'
import JwtInvalidoException from 'App/Exceptions/JwtInvalidoException'
import { Respuesta } from 'App/Presentacion/Compartido/Respuesta'

export default class AutenticarAdministrador {
  public async handle (contexto: HttpContextContract, next: () => Promise<void>) {
    const payload = await contexto.request.obtenerPayloadJWT()
    if(payload.idRol !== Roles.Administrador){
        const respuesta = new Respuesta({ mensaje: 'No tiene permisos para acceder a esta api', estado: 401 })
        return contexto.response.status(respuesta.estado).send(respuesta)
    }
    await next()
  }
}
