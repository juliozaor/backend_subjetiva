import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Maestras/ControladorMaestras'

Route.group(() => {
  Route.get('/domicilios', accion_path + '.Domicilios')
  Route.get('/financieros', accion_path + '.Financieros')
  Route.get('/financierosN', accion_path + '.FinancierosN')
  Route.get('/fusiones', accion_path + '.Fusiones')
  Route.get('/inversiones', accion_path + '.Inversiones')
  Route.get('/nits', accion_path + '.Nits')
  Route.get('/organizaciones', accion_path + '.Organizaciones')
  Route.get('/periodos', accion_path + '.Periodos')
  Route.get('/porcentajes', accion_path + '.Porcentajes')
  Route.get('/sino', accion_path + '.SiNo')
  Route.get('/sinoaplica', accion_path + '.SiNoNoaplica')
  Route.get('/sociedades', accion_path + '.Sociedades')
  Route.get('/equipos', accion_path + '.Sociedades')
}).prefix('api/v1/maestras').middleware('autenticacionJwt')

