/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TblMaestraCategorias from 'App/Infraestructura/Datos/Entidad/MCategorias';
import TblMaestraCategoriasNs from 'App/Infraestructura/Datos/Entidad/MCategoriasNs';
import TblMaestraCodigos from 'App/Infraestructura/Datos/Entidad/MCodigos';
import TblMaestraDelegaturas from 'App/Infraestructura/Datos/Entidad/MDelegaturas';
import TblMaestraDictamenes from 'App/Infraestructura/Datos/Entidad/MDigtamenes';
import { TblMaestraDomicilios } from 'App/Infraestructura/Datos/Entidad/MDomicilios';
import TblMaestraEnfasisDictamenes from 'App/Infraestructura/Datos/Entidad/MEnfasisDigtamenes';
import { TblMaestraEquipos } from 'App/Infraestructura/Datos/Entidad/MEquipos';
import { TblMaestraFinancieros } from 'App/Infraestructura/Datos/Entidad/MFinancieros';
import { TblMaestraFinancierosN } from 'App/Infraestructura/Datos/Entidad/MFinancierosN';
import { TblMaestraFusiones } from 'App/Infraestructura/Datos/Entidad/MFusiones';
import TblMaestraGrupoNiifReportes from 'App/Infraestructura/Datos/Entidad/MGrupoNiifReportes';
import TblMaestraHipotesisMarchas from 'App/Infraestructura/Datos/Entidad/MHipotesisMarchas';
import { TblMaestraInversiones } from 'App/Infraestructura/Datos/Entidad/MInversiones';
import TblMaestraMonedaPresentaciones from 'App/Infraestructura/Datos/Entidad/MMonedaPresentaciones';
import TblMaestraNaturalezas from 'App/Infraestructura/Datos/Entidad/MNaturalezas';
import TblMaestraNaturalezasDs from 'App/Infraestructura/Datos/Entidad/MNaturalezasD';
import { TblMaestraNits } from 'App/Infraestructura/Datos/Entidad/MNits';
import TblMaestraObligatoriedades from 'App/Infraestructura/Datos/Entidad/MObligatoriedades';
import TblMaestraOpinionDictamenes from 'App/Infraestructura/Datos/Entidad/MOpinionDigtamenes';
import { TblMaestraOrganizaciones } from 'App/Infraestructura/Datos/Entidad/MOrganizaciones';
import { TblMaestraPeriodos } from 'App/Infraestructura/Datos/Entidad/MPeriodos';
import { TblMaestraPorcentajes } from 'App/Infraestructura/Datos/Entidad/MPorcentajes';
import { TblMaestraSN } from 'App/Infraestructura/Datos/Entidad/MSN';
import { TblMaestraSNN } from 'App/Infraestructura/Datos/Entidad/MSNN';
import TblMaestraSalvedadDictamenes from 'App/Infraestructura/Datos/Entidad/MSalvedadDigtamenes';
import TblMaestraSituacionesJuridicas from 'App/Infraestructura/Datos/Entidad/MSituacionesJuridicas';
import { TblMaestraSociedades } from 'App/Infraestructura/Datos/Entidad/MSociedades';
import TblMaestraSubordinadas from 'App/Infraestructura/Datos/Entidad/MSubordinadas';
import  TblMaestraTipoDocumentos  from 'App/Infraestructura/Datos/Entidad/MTipoDocumentos';
import { TblMaestraTipoDocumentosNs } from 'App/Infraestructura/Datos/Entidad/MTipoDocumentosNs';
import { TblMaestraTipoEntidades } from 'App/Infraestructura/Datos/Entidad/MTipoEntidades';
import TblMaestraTipoEntidadesNs from 'App/Infraestructura/Datos/Entidad/MTipoEntidadesNs';
import { TblMaestraTipoEntidadesPublicas } from 'App/Infraestructura/Datos/Entidad/MTipoEntidadesPublicas';
import TblMaestraTipoOrganizaciones from 'App/Infraestructura/Datos/Entidad/MTipoOrganizaciones';
import TblMaestraTipoReportes from 'App/Infraestructura/Datos/Entidad/MTipoReportes';
import TblMaestraTipoSocietarios from 'App/Infraestructura/Datos/Entidad/MTipoSocietarios';
import TblMaestraTipoVigilados from 'App/Infraestructura/Datos/Entidad/MTipoVigilados';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';

export default class ControladorReporte {
  //private service: ServicioIndicadores
  constructor() {
    /* this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    ) */
  }



  public async Domicilios({ request, response }: HttpContextContract) {
    const domicilios = await TblMaestraDomicilios.query().orderBy('id', 'asc');
    response.status(200).send({ domicilios })
  }

  public async Financieros({ request, response }: HttpContextContract) {
    const financieros = await TblMaestraFinancieros.query().orderBy('id', 'asc');
    response.status(200).send({ financieros })
  }

  public async FinancierosN({ request, response }: HttpContextContract) {
    const financierosN = await TblMaestraFinancierosN.query().orderBy('id', 'asc');
    response.status(200).send({ financierosN })
  }

  public async Fusiones({ request, response }: HttpContextContract) {
    const fusiones = await TblMaestraFusiones.query().orderBy('id', 'asc');
    response.status(200).send({ fusiones })
  }

  public async Inversiones({ request, response }: HttpContextContract) {
    const inversiones = await TblMaestraInversiones.query().orderBy('id', 'asc');
    response.status(200).send({ inversiones })
  }

  public async Nits({ request, response }: HttpContextContract) {
    const nits = await TblMaestraNits.query().orderBy('id', 'asc');
    response.status(200).send({ nits })
  }

  public async Organizaciones({ request, response }: HttpContextContract) {
    const organizaciones = await TblMaestraOrganizaciones.query().orderBy('id', 'asc');
    response.status(200).send({ organizaciones })
  }

  public async Periodos({ request, response }: HttpContextContract) {
    const periodos = await TblMaestraPeriodos.query().orderBy('id', 'asc');
    response.status(200).send({ periodos })
  }

  public async Porcentajes({ request, response }: HttpContextContract) {
    const porcentajes = await TblMaestraPorcentajes.query().orderBy('id', 'asc');
    response.status(200).send({ porcentajes })
  }

  public async SiNo({ request, response }: HttpContextContract) {
    const siNo = await TblMaestraSN.query().orderBy('id', 'asc');
    response.status(200).send({ siNo })
  }

  public async SiNoNoaplica({ request, response }: HttpContextContract) {
    const siNoNoaplica = await TblMaestraSNN.query().orderBy('id', 'asc');
    response.status(200).send({ siNoNoaplica })
  }

  public async Sociedades({ request, response }: HttpContextContract) {
    const sociedades = await TblMaestraSociedades.query().orderBy('id', 'asc');
    response.status(200).send({ sociedades })
  }

  public async Equipos({ request, response }: HttpContextContract) {
    const equipos = await TblMaestraEquipos.query().orderBy('id', 'asc');
    response.status(200).send({ equipos })
  }




  /* ********************************** */

  public async tipo_documentos({ response }: HttpContextContract) {
    const tipoDocumentos = await TblMaestraTipoDocumentos.query().orderBy('id', 'asc');
    response.status(200).send({ tipoDocumentos });
  }

  public async tipo_entidades_publicas({ response }: HttpContextContract) {
    const tipoEntidadesPublicas = await TblMaestraTipoEntidadesPublicas.query().orderBy('id', 'asc');
    response.status(200).send({ tipoEntidadesPublicas });
  }

  public async tipo_entidades({ response }: HttpContextContract) {
    const tipoEntidades = await TblMaestraTipoEntidades.query().orderBy('id', 'asc');
    response.status(200).send({ tipoEntidades });
  }

  public async tipo_documentos_ns({ response }: HttpContextContract) {
    const tipoDocumentosNs = await TblMaestraTipoDocumentosNs.query().orderBy('id', 'asc');
    response.status(200).send({ tipoDocumentosNs });
  }

  public async categorias({ response }: HttpContextContract) {
    const categorias = await TblMaestraCategorias.query().orderBy('id', 'asc');
    response.status(200).send({ categorias });
  }

  public async categorias_ns({ response }: HttpContextContract) {
    const categoriasNs = await TblMaestraCategoriasNs.query().orderBy('id', 'asc');
    response.status(200).send({ categoriasNs });
  }

  public async dictamenes({ response }: HttpContextContract) {
    const dictamenes = await TblMaestraDictamenes.query().orderBy('id', 'asc');
    response.status(200).send({ dictamenes });
  }

  public async opinion_dictamenes({ response }: HttpContextContract) {
    const opinionDictamenes = await TblMaestraOpinionDictamenes.query().orderBy('id', 'asc');
    response.status(200).send({ opinionDictamenes });
  }

  public async salvedad_dictamenes({ response }: HttpContextContract) {
    const salvedadDictamenes = await TblMaestraSalvedadDictamenes.query().orderBy('id', 'asc');
    response.status(200).send({ salvedadDictamenes });
  }

  public async enfasis_dictamenes({ response }: HttpContextContract) {
    const enfasisDictamenes = await TblMaestraEnfasisDictamenes.query().orderBy('id', 'asc');
    response.status(200).send({ enfasisDictamenes });
  }

  public async hipotesis_marchas({ response }: HttpContextContract) {
    const hipotesisMarchas = await TblMaestraHipotesisMarchas.query().orderBy('id', 'asc');
    response.status(200).send({ hipotesisMarchas });
  }

  public async obligatoriedades({ response }: HttpContextContract) {
    const obligatoriedades = await TblMaestraObligatoriedades.query().orderBy('id', 'asc');
    response.status(200).send({ obligatoriedades });
  }

  public async tipo_reportes({ response }: HttpContextContract) {
    const tipoReportes = await TblMaestraTipoReportes.query().orderBy('id', 'asc');
    response.status(200).send({ tipoReportes });
  }

  public async tipo_entidades_ns({ response }: HttpContextContract) {
    const tipoEntidadesNs = await TblMaestraTipoEntidadesNs.query().orderBy('id', 'asc');
    response.status(200).send({ tipoEntidadesNs });
  }

  public async subordinadas({ response }: HttpContextContract) {
    const subordinadas = await TblMaestraSubordinadas.query().orderBy('id', 'asc');
    response.status(200).send({ subordinadas });
  }

  public async moneda_presentaciones({ response }: HttpContextContract) {
    const monedaPresentaciones = await TblMaestraMonedaPresentaciones.query().orderBy('id', 'asc');
    response.status(200).send({ monedaPresentaciones });
  }

  public async naturalezas({ response }: HttpContextContract) {
    const naturalezas = await TblMaestraNaturalezas.query().orderBy('id', 'asc');
    response.status(200).send({ naturalezas });
  }

  public async tipo_societarios({ response }: HttpContextContract) {
    const tipoSocietarios = await TblMaestraTipoSocietarios.query().orderBy('id', 'asc');
    response.status(200).send({ tipoSocietarios });
  }

  public async tipo_organizaciones({ response }: HttpContextContract) {
    const tipoOrganizaciones = await TblMaestraTipoOrganizaciones.query().orderBy('id', 'asc');
    response.status(200).send({ tipoOrganizaciones });
  }

  public async situaciones_juridicas({ response }: HttpContextContract) {
    const situacionesJuridicas = await TblMaestraSituacionesJuridicas.query().orderBy('id', 'asc');
    response.status(200).send({ situacionesJuridicas });
  }

  public async grupo_niif_reportes({ response }: HttpContextContract) {
    const grupoNiifReportes = await TblMaestraGrupoNiifReportes.query().orderBy('id', 'asc');
    response.status(200).send({ grupoNiifReportes });
  }

  public async tipo_vigilados({ response }: HttpContextContract) {
    const tipoVigilados = await TblMaestraTipoVigilados.query().orderBy('id', 'asc');
    response.status(200).send({ tipoVigilados });
  }

  public async delegaturas({ response }: HttpContextContract) {
    const delegaturas = await TblMaestraDelegaturas.query().orderBy('id', 'asc');
    response.status(200).send({ delegaturas });
  }
  public async naturalezasD({ response }: HttpContextContract) {
    const naturalezasD = await TblMaestraNaturalezasDs.query().orderBy('id', 'asc');
    response.status(200).send({ naturalezasD });
  }
  public async codigosCiiu({ response }: HttpContextContract) {
    const codigosCiiu = await TblMaestraCodigos.query().orderBy('id', 'asc');
    response.status(200).send({ codigosCiiu });
  }
}
