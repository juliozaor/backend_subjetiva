import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Reporte/ControladorReporte'

Route.group(() => {
  Route.get('/:formularioId', controlador+'.listarPorFormulario')
}).prefix('/api/v1/reportes').middleware('autenticacionJwt')
