/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { TblCiudades } from 'App/Infraestructura/Datos/Entidad/Ciudades';
import { TblDepartamentos } from 'App/Infraestructura/Datos/Entidad/Departamentos';
import { TblMaestraDomicilios } from 'App/Infraestructura/Datos/Entidad/MDomicilios';
import { TblMaestraEquipos } from 'App/Infraestructura/Datos/Entidad/MEquipos';
import { TblMaestraFinancieros } from 'App/Infraestructura/Datos/Entidad/MFinancieros';
import { TblMaestraFinancierosN } from 'App/Infraestructura/Datos/Entidad/MFinancierosN';
import { TblMaestraFusiones } from 'App/Infraestructura/Datos/Entidad/MFusiones';
import { TblMaestraInversiones } from 'App/Infraestructura/Datos/Entidad/MInversiones';
import { TblMaestraNits } from 'App/Infraestructura/Datos/Entidad/MNits';
import { TblMaestraOrganizaciones } from 'App/Infraestructura/Datos/Entidad/MOrganizaciones';
import { TblMaestraPeriodos } from 'App/Infraestructura/Datos/Entidad/MPeriodos';
import { TblMaestraPorcentajes } from 'App/Infraestructura/Datos/Entidad/MPorcentajes';
import { TblMaestraSN } from 'App/Infraestructura/Datos/Entidad/MSN';
import { TblMaestraSNN } from 'App/Infraestructura/Datos/Entidad/MSNN';
import { TblMaestraSociedades } from 'App/Infraestructura/Datos/Entidad/MSociedades';
import { TblMeses } from 'App/Infraestructura/Datos/Entidad/Mes';
import { TblServiciosModalidades } from 'App/Infraestructura/Datos/Entidad/ServicioModalidad';
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

  

}
