import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Transporte/ControladorTransporte'

Route.group(() => {
  Route.get('', controlador+'.obtener')
  Route.post('', controlador+'.guardar')
  Route.get('enviar', controlador+'.enviar')
}).prefix('/api/v1/transportes').middleware('autenticacionJwt')
