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
  Route.get('/equipos', accion_path + '.Equipos')

  Route.get('/tipo_documentos', accion_path + '.tipo_documentos');
  Route.get('/tipo_entidades_publicas', accion_path + '.tipo_entidades_publicas');
  Route.get('/tipo_entidades', accion_path + '.tipo_entidades');
  Route.get('/tipo_documentos_ns', accion_path + '.tipo_documentos_ns');
  Route.get('/categorias', accion_path + '.categorias');
  Route.get('/categorias_ns', accion_path + '.categorias_ns');
  Route.get('/dictamenes', accion_path + '.dictamenes');
  Route.get('/opinion_dictamenes', accion_path + '.opinion_dictamenes');
  Route.get('/salvedad_dictamenes', accion_path + '.salvedad_dictamenes');
  Route.get('/enfasis_dictamenes', accion_path + '.enfasis_dictamenes');
  Route.get('/hipotesis_marchas', accion_path + '.hipotesis_marchas');
  Route.get('/obligatoriedades', accion_path + '.obligatoriedades');
  Route.get('/tipo_reportes', accion_path + '.tipo_reportes');
  Route.get('/tipo_entidades_ns', accion_path + '.tipo_entidades_ns');
  Route.get('/subordinadas', accion_path + '.subordinadas');
  Route.get('/moneda_presentaciones', accion_path + '.moneda_presentaciones');
  Route.get('/naturalezas', accion_path + '.naturalezas');
  Route.get('/tipo_societarios', accion_path + '.tipo_societarios');
  Route.get('/tipo_organizaciones', accion_path + '.tipo_organizaciones');
  Route.get('/situaciones_juridicas', accion_path + '.situaciones_juridicas');
  Route.get('/grupo_niif_reportes', accion_path + '.grupo_niif_reportes');
  Route.get('/tipo_vigilados', accion_path + '.tipo_vigilados');
  Route.get('/delegaturas', accion_path + '.delegaturas');
  Route.get('/naturalezasD', accion_path + '.naturalezasD');
  Route.get('/codigosCiiu', accion_path + '.codigosCiiu');

  Route.get('/vigilados', accion_path + '.vigilados');



}).prefix('api/v1/maestras').middleware('autenticacionJwt')

