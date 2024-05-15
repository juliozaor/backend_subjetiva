import { RepositorioDatosTransito } from "App/Dominio/Repositorios/RepositorioDatosTransito";
import Errores from "App/Exceptions/Errores";
import TblDatosTransitos from "App/Infraestructura/Datos/Entidad/DatosTransitos";
import { ValidarTransito } from "../../Util/ValidarTransito";
import { Pregunta } from "../dto/pregunta";
import TblOrganismosTransitos from "App/Infraestructura/Datos/Entidad/OrganismosTransito";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
import TblEstadosServiciosTercerizados from "App/Infraestructura/Datos/Entidad/EstadosServiciosTercerizados";
import TblServiciosTerverizados from "App/Infraestructura/Datos/Entidad/ServiciosTercerizados";
import Database from "@ioc:Adonis/Lucid/Database";
import { EstadosServicioTercerizado } from "App/Dominio/Datos/Entidades/EstadosServicioTercerizado";
export class RepositorioDatosTransitoDB implements RepositorioDatosTransito {
  private estados = new ServicioEstados()
  private validarTransito = new ValidarTransito();
  async obtener(documento: string, vigencia: number): Promise<any> {
    const editable = await this.estados.consultarEnviado(documento,vigencia,7)

    const identificacionOrganismoDB = await TblEstadosServiciosTercerizados.query()
    .where("vigencia", vigencia)
    .andWhere("vigiladoId", documento)
    .first();

    const identificacionOrganismo: EstadosServicioTercerizado = identificacionOrganismoDB?.obtenerDato() ?? {
      razonSocial: '',
      tipoNit: null,
      nit: null,
      digitoVerificacion: null,
      tipoOrganizacion: null,
      apoyaTerceros: null,
      procesoAdjudicacion: null,
      gruas: false,
      patios: false,
      tramitesTransito: false,
      deteccionInfracciones: false,
      procesosContravencionales: false,
      procesoCobroCoactivo: false,
      procesoCobroPersuasivo: false,
      recaudoMultas: false,
      otros: false, 
      vigiladoId: documento,
      vigencia
    };

    const preguntas = new Array()

    const serviciosTercerizados = await TblServiciosTerverizados.query().orderBy('id', 'asc')
    const organismosTransito = await TblOrganismosTransitos.query().orderBy('id', 'asc')
   // return serviciosTercerizados
    const preguntaDB = await TblDatosTransitos.query().where({ vigiladoId:documento, vigencia: vigencia })


    for await (const servicio of serviciosTercerizados) {
      preguntas[servicio.mostrar] = new Array()
      console.log(servicio.mostrar);
      
      for await (const organismo of organismosTransito) {
        const pregunta = preguntaDB.find(p => p.servicioId == servicio.id && p.preguntaId == organismo.id)    
        
        

        preguntas[servicio.mostrar].push({
          preguntaId: organismo.id,
          nombre: organismo.nombre,
          valor: pregunta?.valor??'',
          nombreAlmacenado: pregunta?.nombreAlmacenado??'',
          nombreOriginalArchivo: pregunta?.nombreOriginalArchivo??'',
          ruta: pregunta?.ruta??'',
          servicioId: servicio.id,
        })


      }
    }

    return {identificacionOrganismo, preguntas, editable}

  }

  async guardar(datos: any, documento: string, vigencia: number): Promise<any> {
    const { preguntas, identificacionOrganismo } = datos;
    let preguntasDB = new Array();
    if (!preguntas) {
      throw new Errores(
        `Se presento un problema al guardar el formulario1`,
        400
      );
    }
    for await (const pregunta of preguntas) {
      preguntasDB.push({
        ...pregunta,
        vigiladoId: documento,
        vigencia: vigencia,
      });
    }

    try {

      const condicionesBusqueda = {
        vigiladoId: documento,
        vigencia: vigencia
      };

      await TblEstadosServiciosTercerizados.updateOrCreate(condicionesBusqueda, identificacionOrganismo);
      
    } catch (error) {
      console.log(error);
      
    }


    
    try {
      await TblDatosTransitos.updateOrCreateMany(
        ["preguntaId", "vigiladoId", "vigencia", "servicioId"],
        preguntasDB
      );
      
    } catch (error) {
      throw new Errores(
        `Se presento un problema al guardar el formulario, ${error}`,
        400
      );
    }
    
    this.estados.Log(documento,1003,vigencia,9)
    return true;

  }

  async enviar(documento: string, vigencia: number): Promise<any> {
    const preguntas: any = await this.obtener(documento, vigencia);
    const faltantes = await this.validarTransito.validar(preguntas);
    let aprobado = true

    
    if (faltantes.length >= 0) {
      aprobado = false
    }
    if (aprobado) {
      this.estados.Log(documento,1004,vigencia,9)      
    }
   
    return {
      aprobado,
      faltantes,
    };
  }
}
