import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { DateTime } from 'luxon';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';
import { ServicioEstadosVerificado } from 'App/Dominio/Datos/Servicios/ServicioEstadosVerificado';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import { TblSedesOperativas } from 'App/Infraestructura/Datos/Entidad/SedesOperativas';
import { TblPatios } from 'App/Infraestructura/Datos/Entidad/Patios';
import { TblEmpresas } from 'App/Infraestructura/Datos/Entidad/Empresas';
export class RepositorioRespuestasDB implements RepositorioRespuesta {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioEstadoVerificado = new ServicioEstadosVerificado()

  async guardar(datos: string, idReporte: number, documento: string): Promise<any> {
    const { respuestas, sedes, guardarPatios, eliminarPatios, guardarEmpresas, eliminarEmpresas } = JSON.parse(datos);
    const { usuarioCreacion, loginVigilado, idEncuesta, estadoVerificacionId } = await TblReporte.findByOrFail('id', idReporte)
    let estado = 1003
    if (estadoVerificacionId === 7 || estadoVerificacionId === 1005) {
      estado = 1005
    }
    this.servicioEstado.Log(loginVigilado, estado, idEncuesta, idReporte)
    this.servicioAuditoria.Auditar({
      accion: "Guardar Respuesta SUBJETIVO",
      modulo: "Información general SUBJETIVO",
      usuario: usuarioCreacion ?? '',
      vigilado: loginVigilado ?? '',
      descripcion: 'Primer guardado de la encuesta',
      encuestaId: idEncuesta,
      tipoLog: 4
    })

    /* if(sedes.length >= 1){
      await TblSedesOperativas.query().where('seo_usuario_id', documento).delete();
   } */
   await TblSedesOperativas.query().where('seo_usuario_id', documento).delete();

    for await (const sede of sedes) {
      sede.usuarioId = documento;
      const sedesOperativas = new TblSedesOperativas();
       sedesOperativas.estableceSedeConId(sede);
       sedesOperativas.save();
    }
    

    await TblPatios.query().whereIn('pat_id', eliminarPatios).delete();

    for await (const patio of guardarPatios) {
      if(patio.id){
        const isPatio = await TblPatios.findOrFail(patio.id);
        isPatio.establecePatioConId(patio)
        isPatio.save()
        
      }else{
        patio.usuarioId = patio.usuario_id       
        
        const newPatio = new TblPatios()
        newPatio.establecePatio(patio)
        newPatio.save()

      }
    }

    await TblEmpresas.query().whereIn('emp_nit', eliminarEmpresas).delete();

    for await (const empresa of guardarEmpresas) {
      const datosEmpresa= {
        nit: empresa.nit,
        razonSocial: empresa.razon_social,
        tipoServicio: empresa.tipo_servicio,
        originalTipoServicio: empresa.original_tipo_servicio,
        documentoTipoServicio: empresa.documento_tipo_servicio,
        rutaTipoServicio: empresa.ruta_tipo_servicio,
        capacidadTransportadoraA: empresa.capacidad_transportadora_a,
        capacidadTransportadoraB: empresa.capacidad_transportadora_b,
        capacidadTransportadoraC: empresa.capacidad_transportadora_c,
        originalTransportadora: empresa.original_transportadora,
        rutaTransportadora: empresa.ruta_transportadora,
        documentoTransportadora: empresa.documento_transportadora,
        estado: empresa.estado,
        usuarioId: empresa.usuario_id,
        departamento: empresa.departamento,
        municipio: empresa.municipio,
      }
   
      
          
        const isEmpresa = await TblEmpresas.findBy('emp_nit',empresa.nit);
        
        if (isEmpresa) {
          const affectedRows = await TblEmpresas.query()
          .where('emp_nit', empresa.nit)
          .update(datosEmpresa);
          
     } else {
     const a = await TblEmpresas.create(datosEmpresa);   
     /*  const newEmpresa = new TblEmpresas()
      newEmpresa.estableceEmpresa(datosEmpresa)
      newEmpresa.save()
       */
     }

    /*   if(isEmpresa){

        isEmpresa.estableceEmpresaConId(datosEmpresa)
        isEmpresa.save()
        
      }else{        
      console.log("Entro 4");

        const newEmpresa = new TblEmpresas()
        newEmpresa.estableceEmpresa(datosEmpresa)
        newEmpresa.save()

      } */
    }


    for await (const respuesta of respuestas) {
      //validar si existe
      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      let data: Respuesta = {
        idPregunta: respuesta.preguntaId,
        valor: respuesta.valor,
        usuarioActualizacion: documento,
        idReporte: idReporte,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        observacion: respuesta.observacion ?? ''
      }

      if (respuesta.documento) {
        data.documento = respuesta.documento
      }
      if (respuesta.nombreArchivo) {
        data.nombredocOriginal = respuesta.nombreArchivo
      }
      if (respuesta.ruta) {
        data.ruta = respuesta.ruta
      }
      /* if (respuesta.observacion) {
        data.observacion = respuesta.observacion
      }
 */

      if (existeRespuesta) {
        existeRespuesta.estableceRespuestaConId(data)
        const resp = await existeRespuesta.save();
        this.servicioAuditoria.Auditar({
          accion: "Actualizar Respuesta SUBJETIVO",
          modulo: "Informacion General SUBJETIVO",
          jsonAnterior: JSON.stringify(existeRespuesta.$attributes),
          jsonNuevo: JSON.stringify(resp.$attributes),
          usuario: usuarioCreacion ?? '',
          vigilado: loginVigilado ?? '',
          descripcion: 'Actualización de respuesta',
          encuestaId: idEncuesta
        })
      } else {

        const respuestaDB = new TblRespuestas();
        respuestaDB.establecerRespuestaDb(data)
        await respuestaDB.save();
      }

      //Elimnar de la tabla temporal el archivo almacenado     

      if (respuesta.documento) {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': respuesta.preguntaId, 'art_usuario_id': loginVigilado, 'art_nombre_archivo': respuesta.documento }).first()

        await temporal?.delete()
      }

      //});
    }

    return {
      mensaje: "Encuesta guardada correctamente"
    }


  }

  async verificar(datos: string, payload: PayloadJWT): Promise<any> {
    const { idReporte, respuestas } = JSON.parse(datos)

    this.servicioEstadoVerificado.Log(idReporte, 2, payload.documento)

    respuestas.forEach(async respuesta => {

      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()
      existeRespuesta?.estableceVerificacion(respuesta)
      existeRespuesta?.save()
    });

  }

  async finalizar(params: any): Promise<any> {
    const { idEncuesta, idReporte, idUsuario, idVigilado } = params
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion', (sqlCla) => {
        sqlCla.preload('pregunta', (sqlPre) => {
          sqlPre.preload('respuesta', sqlResp => {
            sqlResp.where('id_reporte', idReporte)
          })
          sqlPre.where('id_encuesta', idEncuesta)
        }).whereHas('pregunta', sqlE => {
          sqlE.where('id_encuesta', idEncuesta);
        }).orderBy('id_clasificacion', 'asc')
      })
    }).where('identificacion', idVigilado).first()


    let aprobado = true;
    let cumple = true;
    const faltantes = new Array();
    const pasos = usuario?.clasificacionUsuario[0].clasificacion
    pasos?.forEach(paso => {
      paso.pregunta.forEach(preguntaPaso => {
        const respuesta = preguntaPaso.respuesta[0];

        if (respuesta) {
          // console.log(respuesta.cumple , respuesta.corresponde);
          if (!respuesta.cumple || respuesta.cumple == 0 || !respuesta.corresponde || respuesta.corresponde == 0) {
            faltantes.push(respuesta.idPregunta)
            aprobado = false
          }


          if (respuesta.cumple && respuesta.cumple == 2 && (!respuesta.observacionCumple || respuesta.observacionCumple == '')) {
            faltantes.push(respuesta.idPregunta)
            aprobado = false
          }

          if (respuesta.corresponde && respuesta.corresponde == 2 && (!respuesta.observacionCorresponde || respuesta.observacionCorresponde == '')) {
            faltantes.push(respuesta.idPregunta)
            aprobado = false
          }

          if (respuesta.corresponde == 2 || respuesta.cumple == 2) {
            cumple = false;
          }

        }

      });

    });

    //guardar log de intento si falla 

    if (aprobado) {
      let estado = 7;
      if (cumple) {
        estado = 6;
      }
      this.servicioEstadoVerificado.Log(idReporte, estado, idUsuario)
    }



    return { aprobado, faltantes }

  }


}
