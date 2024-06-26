import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Autenticacion/ControladorAutenticacion'

Route.group(() => {
  Route.post('/inicio-sesion', controlador+'.inicioSesion')
  Route.post('/cambiar-clave', controlador+'.cambiarClave')
  Route.get('/verificar-subjetivo', controlador+'.validar')
}).prefix('/api/v1/autenticacion')
