import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Exportacion/ControladorExportacion'

Route.group(() => {
  Route.get('xlsx', accion_path + '.exportToXLSX')
  Route.get('encuesta', accion_path + '.encuestaToXLSX')
  Route.get('vehiculos-patios', accion_path + '.vehiculosPatios')
  Route.get('vehiculos-modalidades', accion_path + '.vehiculosModalidades')
}).prefix('api/v1/exportar')//.middleware('autenticacionJwt')
