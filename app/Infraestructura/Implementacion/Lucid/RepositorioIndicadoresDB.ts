import { RepositorioIndicador } from 'App/Dominio/Repositorios/RepositorioIndicador';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { DateTime } from 'luxon';
import { TblFormulariosIndicadores } from 'App/Infraestructura/Datos/Entidad/FormularioIndicadores';
import { TblDetalleDatos } from 'App/Infraestructura/Datos/Entidad/DetalleDatos';
import { DetalleDatos } from 'App/Dominio/Datos/Entidades/DetalleDatos';
import { TblDetalleDatosEvidencias } from 'App/Infraestructura/Datos/Entidad/DetalleEvidencias';
import { DetalleEvidencia } from 'App/Dominio/Datos/Entidades/DetalleEvidencias';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { TblObjetivos } from 'App/Infraestructura/Datos/Entidad/Objetivos';
import { Objetivo } from 'App/Dominio/Datos/Entidades/objetivo';
import { TblDetallesAdicionales } from 'App/Infraestructura/Datos/Entidad/DetalleAdicionales';
import { DetalleAdicional } from 'App/Dominio/Datos/Entidades/DetalleAdicional';
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { ServicioAcciones } from 'App/Dominio/Datos/Servicios/ServicioAcciones';
import Env from '@ioc:Adonis/Core/Env';
import { TblEstadosReportes } from 'App/Infraestructura/Datos/Entidad/EstadosReportes';
import { TblVehiculosPatios } from 'App/Infraestructura/Datos/Entidad/vehiculosPatios';
import { TblVehiculosModalidades } from 'App/Infraestructura/Datos/Entidad/vehiculosModalidades';
import { TblVehiculosMeses } from 'App/Infraestructura/Datos/Entidad/VehiculoMes';
import { TblMeses } from 'App/Infraestructura/Datos/Entidad/Mes';

export class RepositorioIndicadoresDB implements RepositorioIndicador {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioAcciones = new ServicioAcciones();
  async visualizar(params: any): Promise<any> {
    const { idUsuario, idVigilado, idReporte, idMes, idRol } = params;
    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)
    const { planeacionEditable } = await this.servicioAcciones.obtenerAccion(reporte?.estadoVerificacionId ?? 0, idRol);

    const soloLectura = (idUsuario !== idVigilado || !planeacionEditable) ?? false;
    const consulta = TblFormulariosIndicadores.query()
    const vigencia = reporte.anioVigencia ?? undefined
    const usuario = await TblUsuarios.query().preload('objetivos', sqlObj => {
      sqlObj.where('obj_vigencia', vigencia!);
    }).where('identificacion', idVigilado).first(); // objetivos

    const objetivos = usuario?.objetivos;

    consulta.preload('subIndicadores', subIndicador => {
      if (reporte && reporte.anioVigencia == 2023) {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_visible', true)
          datos.orderBy('dai_orden', 'asc')
        })


      } else {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          });
          datos.orderBy('dai_orden', 'asc')
        })


      }
      subIndicador.preload('periodo')
      subIndicador.orderBy('sub_orden', 'asc')

    })

    //Evidencias
    consulta.preload('evidencias', sqlEvidencia => {

      if (reporte && reporte.anioVigencia == 2023) {
        sqlEvidencia.preload('datosEvidencias', sqlDatosE => {
          sqlDatosE.preload('detalleEvidencias', detalleV => {
            detalleV.where('dde_reporte_id', idReporte)
          })
          sqlDatosE.where('dae_visible', true)

        }).preload('subTipoDato', sqlSubTipoDato => {
          sqlSubTipoDato.preload('tipoDato')
        })

      } else {
        sqlEvidencia.preload('datosEvidencias', sqlDatosE => {
          sqlDatosE.preload('detalleEvidencias', detalleV => {
            detalleV.where('dde_reporte_id', idReporte)
          })
        }).preload('subTipoDato', sqlSubTipoDato => {
          sqlSubTipoDato.preload('tipoDato')
        })
      }
      sqlEvidencia.orderBy('evi_orden', 'asc')
    })


    const formulariosBD = await consulta.where('id', 5)

    // return formulariosBD

    formulariosBD.forEach(formulario => {
      const nombre = formulario.nombre
      // const mensaje = formulario.mensaje
      const subIndicador: any = [];
      const cabeceras: any = [];
      let contador = 0;
      formulario.subIndicadores.forEach(async subInd => {
        const preguntas: any = []
        contador += 1;
        /*  for await (const datos of  subInd.datosIndicadores) {
           
         } */
        subInd.datosIndicadores.forEach(datos => {
          if (contador == 1) {
            cabeceras.push(datos.nombre)
          }
          preguntas.push({
            datoId: datos.id,
            // pregunta: datos.nombre,

            respuesta: datos.detalleDatos[0]?.valor ?? '',
            /*   tipoDeEvidencia: "",
              documento: "",
              nombreOriginal: "",
              ruta: "",
              adjuntable: false,
              adjuntableObligatorio: false, */
            tipoPregunta: "NUMBER",
            // valoresPregunta: [],
            validaciones: {
              tipoDato: subInd.periodo.tipo,
              cantDecimal: subInd.periodo.decimal
            },
            /*   observacion: "",
              cumple: "",
              observacionCumple: "",
              corresponde: "",
              observacionCorresponde: "" */
          })
        });
        // }
        if (preguntas.length >= 1) {
          subIndicador.push({
            nombre: subInd.nombre,
            obligatoria: subInd.obligatorio,
            //  codigo: subInd.codigo,            
            meses: preguntas,
          })
        }
      });

      const evidencias: any = [];
      formulario.evidencias.forEach(evidencia => {
        evidencia.datosEvidencias.forEach(datoEvidencia => {
          evidencias.push({
            idEvidencia: datoEvidencia.id,
            nombre: evidencia.nombre,
            // tamanio: evidencia.tamanio,
            obligatoria: evidencia.obligatorio,
            tipoEvidencia: evidencia.subTipoDato.tipoDato.nombre,
            validacionesEvidencia: {
              tipoDato: evidencia.subTipoDato.nombre,
              cantDecimal: evidencia.subTipoDato.decimales ?? 0,
              tamanio: evidencia.tamanio,
              extension: evidencia.subTipoDato.extension ?? ''
            },
            respuesta: datoEvidencia.detalleEvidencias[0]?.valor ?? '',
            documento: datoEvidencia.detalleEvidencias[0]?.documento ?? '',
            nombreOriginal: datoEvidencia.detalleEvidencias[0]?.nombredocOriginal ?? '',
            ruta: datoEvidencia.detalleEvidencias[0]?.ruta ?? ''
          })
        });
      })

      formularios.push({
        nombre,
        evidencias,
        // mensaje,
        cabeceras,
        actividades: subIndicador,
        objetivos
      })

    });

    return {
      idVigilado,
      idReporte,
      idEncuesta: reporte.idEncuesta,
      vigencia,
      soloLectura,
      formularios
    }
  }


  async enviarSt(params: any): Promise<any> {
    const { idReporte, idVigilado, idUsuario } = params
    let aprobado = true;
    let objetivos = true;
    const faltantesActividades = new Array();
    const faltantesEvidencias = new Array();

    const reportes = await TblReporte.find(idReporte)

    const indicadores = await this.visualizar(params)

    indicadores.formularios.forEach(formulario => {
      if (formulario.actividades.length != 0) {
        formulario.actividades.forEach(actividad => {
          if (actividad.meses.length != 0) {
            actividad.meses.forEach(mes => {
              if (actividad.obligatoria) {
                if (!mes.respuesta || mes.respuesta === '') {

                  faltantesActividades.push(mes.datoId);
                  aprobado = false;
                }

              }
            });
          }
        });
      }
      if (formulario.evidencias.length != 0) {
        formulario.evidencias.forEach(evidencia => {
          if (evidencia.obligatoria) {
            if ((evidencia.tipoEvidencia === 'FILE' && evidencia.documento === '') || (evidencia.tipoEvidencia !== 'FILE' && evidencia.respuesta === '')) {
              faltantesEvidencias.push(evidencia.idEvidencia);
              aprobado = false;

            }

          }
        });

      }
    });
    //Verificar objetivos
    const objetivosUsuario = await TblObjetivos.query().where('obj_usuario_id', idUsuario).first();

    if (!objetivosUsuario) {
      aprobado = false;
      objetivos = false;
    }


    if (aprobado) {
      this.servicioEstado.Log(idUsuario, 1009, reportes?.idEncuesta)
      const reporte = await TblReporte.findOrFail(idReporte)
      reporte.fechaEnviost = DateTime.fromJSDate(new Date())
      reporte.envioSt = '1'
      reporte.estadoVerificacionId = 1009
      reporte.save();
    }

    //return indicadores
    return { aprobado, faltantesActividades, faltantesEvidencias, objetivos }

  }


  async guardar(datos: string, documento: string): Promise<any> {
    const { respuestas, reporteId, evidencias, objetivos } = JSON.parse(datos);

    const { anioVigencia, idEncuesta } = await TblReporte.findByOrFail('id', reporteId)

    this.servicioEstado.Log(documento, 1008, idEncuesta, reporteId)


    await TblObjetivos.query().where('obj_usuario_id', documento).delete();

    for await (const objetivo of objetivos) {
      const objetivoDB = {
        nombre: objetivo,
        usuarioId: documento,
        vigencia: anioVigencia ?? 2023
      }
      const obj = new TblObjetivos();
      obj.estableceObjetivoConId(objetivoDB);
      obj.save();
    }


    for await (const respuesta of respuestas) {

      const existeDatos = await TblDetalleDatos.query().where({ 'ddt_dato_indicador_id': respuesta.preguntaId, 'ddt_reporte_id': reporteId }).first()


      let data: DetalleDatos = {
        datoIndicadorId: respuesta.preguntaId,
        valor: respuesta.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: anioVigencia ?? 2023
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


      if (existeDatos) {
        existeDatos.estableceDetalleDatosConId(data)
        const resp = await existeDatos.save();

      } else {
        const respuestaDB = new TblDetalleDatos();
        respuestaDB.establecerDetalleDatosDb(data)
        respuestaDB.save();
      }


    }

    for await (const evidencia of evidencias) {

      const existeDatosE = await TblDetalleDatosEvidencias.query().where({ 'dde_dato_evidencia_id': evidencia.evidenciaId, 'dde_reporte_id': reporteId }).first()

      let data: DetalleEvidencia = {
        datoEvidenciaId: evidencia.evidenciaId,
        valor: evidencia.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: anioVigencia ?? 2023
      }

      if (evidencia.documento) {
        data.documento = evidencia.documento
      }
      if (evidencia.nombreArchivo) {
        data.nombredocOriginal = evidencia.nombreArchivo
      }
      if (evidencia.ruta) {
        data.ruta = evidencia.ruta
      }

      if (existeDatosE) {
        existeDatosE.estableceDetalleEvidenciaConId(data)
        const evid = await existeDatosE.save();


      } else {
        const evidenciaDB = new TblDetalleDatosEvidencias();
        evidenciaDB.establecerDetalleEvidenciaDb(data)
        evidenciaDB.save();
      }

      if (evidencia.documento) {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': evidencia.evidenciaId, 'art_usuario_id': documento, 'art_nombre_archivo': evidencia.documento }).first()

        await temporal?.delete()
      }


    }


    return {
      mensaje: "Formulario guardado correctamente"
    }


  }

  async ejecucion(params: any): Promise<any> {
    const { idUsuario, idVigilado, idReporte, historico, idMes, idRol } = params;
    const formularios: any = [];
    const reporte = await TblReporte.findOrFail(idReporte)
    const { ejecucionEditable } = await this.servicioAcciones.obtenerAccion(reporte?.estadoVerificacionId ?? 0, idRol);


    const soloLectura = (historico && historico == 'true' || idUsuario !== idVigilado || !ejecucionEditable) ?? false;
    //const anioVigencia = await TblAnioVigencias.query().where('anv_estado', true).orderBy('anv_id', 'desc').select('anv_anio').first()
    //  const reporte = await TblReporte.query().where({ 'id_encuesta': 2, 'login_vigilado': idVigilado, 'anio_vigencia': anioVigencia?.anio! }).first();
    /*  if (!reporte) {
       return {
         estado: false,
         codigo: 400,
         mensaje: "No se encontro una planeación para este usuario",
       }
     } */

     const {visual} = await TblMeses.findOrFail(idMes);


    //Buscar el estado por la nueva tabla
    const estadoreportes = await TblEstadosReportes.query()
      .where({ 'reporte': idReporte, 'vigencia': reporte.anioVigencia, 'mes': visual })
      .orderBy('created_at', 'desc')
      .first();

    if (!estadoreportes) {
      const newEstadoReporte = new TblEstadosReportes()
      newEstadoReporte.reporte = idReporte
      newEstadoReporte.vigencia = reporte.anioVigencia!
      newEstadoReporte.mes = visual
      newEstadoReporte.estado = 1002
      newEstadoReporte.save()
    }

    const consulta = TblFormulariosIndicadores.query()
    const vigencia = reporte?.anioVigencia ?? undefined
    consulta.preload('subIndicadores', subIndicador => {
      if (reporte && reporte.anioVigencia == 2023) {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_visible', true)
          datos.where('dai_meses', visual)
        }).whereHas('datosIndicadores', datos => {
          datos.where('dai_meses', visual)
        })


      } else {
        subIndicador.preload('datosIndicadores', datos => {
          datos.preload('detalleDatos', detalle => {
            detalle.where('ddt_reporte_id', idReporte)
          })
          datos.where('dai_meses', visual)
        }).whereHas('datosIndicadores', datos => {
          datos.where('dai_meses', visual)
        })


      }
      subIndicador.preload('periodo')
      subIndicador.preload('subTipoDato')
      subIndicador.orderBy('sub_orden', 'asc')
    })

    //Evidencias
    consulta.preload('adicionales', sqlAdicional => {

      if (reporte && reporte.anioVigencia == 2023) {
        sqlAdicional.preload('datosAdicionales', sqlDatosE => {
          sqlDatosE.preload('detalleAdicional', detalleV => {
            detalleV.where('dda_reporte_id', idReporte)
          })
          sqlDatosE.where('dad_visible', true)
          sqlDatosE.where('dad_meses', visual)

        }).whereHas('datosAdicionales', sqlDatosE => {
          sqlDatosE.where('dad_meses', visual)
        }).preload('subTipoDato', sqlSubTipoDato => {
          sqlSubTipoDato.preload('tipoDato')
        })

      } else {
        sqlAdicional.preload('datosAdicionales', sqlDatosE => {
          sqlDatosE.preload('detalleAdicional', detalleV => {
            detalleV.where('dda_reporte_id', idReporte)
          })
          sqlDatosE.where('dad_meses', visual)
        }).whereHas('datosAdicionales', sqlDatosE => {
          sqlDatosE.where('dad_meses', visual)
        }).preload('subTipoDato', sqlSubTipoDato => {
          sqlSubTipoDato.preload('tipoDato')
        })
      }
      sqlAdicional.preload('tipoPregunta');
      sqlAdicional.orderBy('adi_orden', 'asc');
    })


    const formulariosBD = await consulta.where('id', 5)
    formulariosBD.forEach(formulario => {
      const actividades: any = [];
      formulario.subIndicadores.forEach(subInd => {
        subInd.datosIndicadores.forEach(datos => {

          actividades.push({
            nombre: subInd.nombre,
            datoId: datos.id,
            // pregunta: datos.nombre,
            obligatoria: subInd.obligatorio,
            planeado: datos.detalleDatos[0]?.valor ?? '',
            respuesta: datos.detalleDatos[0]?.valorEjecutado ?? '',
            tipoDeEvidencia: 'FILE',
            validacionesEvidencia: {
              tipoDato: subInd.subTipoDato.nombre,
              cantDecimal: subInd.subTipoDato.decimales ?? 0,
              tamanio: subInd.tamanio,
              extension: subInd.subTipoDato.extension ?? ''
            },
            documento: datos.detalleDatos[0]?.documento ?? '',
            nombreOriginal: datos.detalleDatos[0]?.nombredocOriginal ?? '',
            ruta: datos.detalleDatos[0]?.ruta ?? '',
            adjuntable: subInd.adjuntable,
            adjuntableObligatorio: subInd.adjuntableObligatorio,
            tipoPregunta: "NUMBER",
            validacionesPregunta: {
              tipoDato: subInd.periodo.tipo,
              cantDecimal: subInd.periodo.decimal
            },
          })


        });
      });

      const evidencias: any = [];
      formulario.adicionales.forEach(adicional => {
        adicional.datosAdicionales.forEach(datoAdicional => {
          // console.log(datoAdicional.detalleAdicional);         
          evidencias.push({
            idAdicional: datoAdicional.id,
            pregunta: adicional.nombre,
            maxCaracteres: adicional.maxCaracteres,
            mensaje: adicional.tipoEvidencia,
            obligatoria: adicional.obligatorio,
            respuesta: datoAdicional.detalleAdicional[0]?.valor ?? '',
            documento: datoAdicional.detalleAdicional[0]?.documento ?? '',
            nombreOriginal: datoAdicional.detalleAdicional[0]?.nombredocOriginal ?? '',
            ruta: datoAdicional.detalleAdicional[0]?.ruta ?? '',
            adjuntable: adicional.adjuntable,
            adjuntableObligatorio: adicional.adjuntableObligatorio,
            tipoPregunta: adicional.tipoPregunta.nombre,
            valoresPregunta: adicional.tipoPregunta.opciones,
            validacionesPregunta: adicional.tipoPregunta.validaciones,
            tieneObservacion: adicional.tieneObservacion,
            maxObservacion: adicional.maxObservacion,
            observacion: datoAdicional.detalleAdicional[0]?.observacion ?? '',
            habilitaObservacion: adicional.tipoPregunta.datoClave,
            tipoEvidencia: adicional.subTipoDato.tipoDato.nombre,
            validacionesEvidencia: {
              tipoDato: adicional.subTipoDato.nombre,
              cantDecimal: adicional.subTipoDato.decimales ?? 0,
              tamanio: adicional.tamanio,
              extension: adicional.subTipoDato.extension ?? ''
            },
            tipo: adicional.tipo,

          })
        });
      })



      formularios.push({
        nombre: "Ejecución",
        // mensaje,
        adicionales: evidencias,
        actividades,
      })

    });


    return {
      idVigilado,
      idReporte,
      idEncuesta: 3,
      vigencia,
      soloLectura,
      mes: visual,
      formularios
    }
  }

  async patios(params: any): Promise<any> {
    const { idVigilado, idMes, vigencia } = params;
    // id : 1

    const {visual} = await TblMeses.findOrFail(idMes);

    const visible = await TblVehiculosMeses.query().where({ 'vem_mes': visual, 'vem_tipo': 1 }).first()

    const usuario = await TblUsuarios.query().preload('patios').where('identificacion', idVigilado).first()

    return {
      visible: visible?.estado ?? false,
      patios: usuario?.patios ?? [],
      plantilla: `/inidicador/plantillas/placas-patios.xlsx`,
      cargados: `/exportar/vehiculos-patios?idVigilado=${idVigilado}&vigencia=${vigencia}&idMes=${visual}`,
      mensaje: visible?.mensaje?? ''
    }

  }

  async empresas(params: any): Promise<any> {
    const { idVigilado, idMes, vigencia } = params;
    const {visual} = await TblMeses.findOrFail(idMes);
    const visible = await TblVehiculosMeses.query().where({ 'vem_mes': visual, 'vem_tipo': 2 }).first()
    const usuario = await TblUsuarios.query().preload('empresas').where('identificacion', idVigilado).first()

    return {
      visible: visible?.estado ?? false,
      empresas: usuario?.empresas ?? [],
      plantilla: `/inidicador/plantillas/placas-empresa.xlsx`,
      cargados: `/exportar/vehiculos-modalidades?idVigilado=${idVigilado}&vigencia=${vigencia}&idMes=${visual}`,
      mensaje: visible?.mensaje?? ''
    }

  }

  async guardarEjecucion(datos: string, documento: string): Promise<any> {
    const { respuestasActividades, reporteId, adicionales, mesId } = JSON.parse(datos);
    const {visual} = await TblMeses.findOrFail(mesId);

    const { anioVigencia, idEncuesta } = await TblReporte.findByOrFail('id', reporteId)
    this.servicioEstado.estadoReporte(reporteId, anioVigencia ?? 2023, visual, 1003, null)
    for await (const respuesta of respuestasActividades) {

      const existeDatos = await TblDetalleDatos.query().where({ 'ddt_dato_indicador_id': respuesta.preguntaId, 'ddt_reporte_id': reporteId }).first()


      let data: DetalleDatos = {
        datoIndicadorId: respuesta.preguntaId,
        valorEjecutado: respuesta.valor,
        reporteId: reporteId,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: anioVigencia ?? 2023,
        observacion: respuesta.observacion ?? '',

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


      if (existeDatos) {
        existeDatos.estableceDetalleDatosConId(data)
        const resp = await existeDatos.save();

      } else {
        const respuestaDB = new TblDetalleDatos();
        respuestaDB.establecerDetalleDatosDb(data)
        respuestaDB.save();
      }


    }

    for await (const adicional of adicionales) {

      const existeDatosE = await TblDetallesAdicionales.query().where({ 'dda_dato_adicional_id': adicional.adicionalId, 'dda_reporte_id': reporteId }).first()

      let data: DetalleAdicional = {
        datoAdicionalId: adicional.adicionalId,
        reporteId: reporteId,
        valor: adicional.valor,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        anioActivoId: anioVigencia ?? 2023,
        observacion: adicional.observacion ?? ''
      }

      if (adicional.documento) {
        data.documento = adicional.documento
      }
      if (adicional.nombreArchivo) {
        data.nombredocOriginal = adicional.nombreArchivo
      }
      if (adicional.ruta) {
        data.ruta = adicional.ruta
      }
      if (adicional.observacion) {
        data.observacion = adicional.observacion
      }


      if (existeDatosE) {
        existeDatosE.estableceDetalleAdicionalConId(data)
        const evid = await existeDatosE.save();


      } else {
        const evidenciaDB = new TblDetallesAdicionales();
        evidenciaDB.establecerDetalleAdicionalDb(data)
        evidenciaDB.save();
      }

      if (adicional.documento) {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': adicional.adicionalId, 'art_usuario_id': documento, 'art_nombre_archivo': adicional.documento }).first()

        await temporal?.delete()
      }


    }


    return {
      mensaje: "Formulario guardado correctamente"
    }


  }

  async enviarStEjecucion(params: any): Promise<any> {
    const { idReporte, idVigilado, idUsuario, idMes } = params
    let aprobado = true;
    let faltaArchivoPatios = false
    let faltaArchivoEmpresas = false
    const faltantesActividades = new Array();
    const faltantesAdicionales = new Array();

    const reportes = await TblReporte.find(idReporte)

    const indicadores = await this.ejecucion(params)


    indicadores.formularios.forEach(formulario => {
      if (formulario.actividades.length != 0) {
        formulario.actividades.forEach(actividad => {
          if (actividad.obligatoria) {
            if ((!actividad.respuesta || actividad.respuesta === '') ||
              (actividad.adjuntableObligatorio && actividad.documento === '')
              && actividad.respuesta !== '0') {
              faltantesActividades.push(actividad.datoId);
              aprobado = false;
            }

          }
        });
      }
      if (formulario.adicionales.length != 0) {
        formulario.adicionales.forEach(adicional => {


          if (adicional.obligatoria) {
            if ((!adicional.respuesta || adicional.respuesta === '')) {
              faltantesAdicionales.push(adicional.idAdicional);
              aprobado = false;
            }



            if (adicional.respuesta && adicional.respuesta !== '') {
              if (adicional.tieneObservacion && adicional.tieneObservacion == true) {
                const datoClave = adicional.habilitaObservacion!;
                const arr = Object.values(datoClave);
                if (arr.length !== 0) {
                  arr.forEach(dato => {

                    if (adicional.respuesta === dato && (!adicional.observacion || adicional.observacion === '')) {
                      faltantesAdicionales.push(adicional.idAdicional);
                      aprobado = false;
                    }

                  });
                }
              }

              if (adicional.tipoPregunta == 'SELECT' && adicional.respuesta == 'S') {
                if (adicional.adjuntable && adicional.adjuntableObligatorio && adicional.respuesta !== '0'
                  && adicional.documento === '') {
                  faltantesAdicionales.push(adicional.idAdicional);
                  aprobado = false;
                }
              }

            } //final si



          }
        });

      }
    });


    const patios = await TblVehiculosPatios.query().where({ 'veh_vigilado': idVigilado, 'veh_vigencia': indicadores.vigencia, 'veh_mes': idMes })
    if (patios.length <= 1) {
      faltaArchivoPatios = true;

    }

    const modalidades = await TblVehiculosModalidades.query().where({ 'vep_vigilado': idVigilado, 'vep_vigencia': indicadores.vigencia, 'vep_mes': idMes })
    if (modalidades.length <= 1) {
      faltaArchivoEmpresas = true;

    }


    if (aprobado) {
      const {visual} = await TblMeses.findOrFail(idMes);
      /*  this.servicioEstado.Log(idUsuario, 1007, reportes?.idEncuesta) */
      this.servicioEstado.estadoReporte(idReporte, indicadores.vigencia, visual, 1004, DateTime.fromJSDate(new Date()))
      /*   const reporte = await TblReporte.findOrFail(idReporte)
        reporte.fechaEnviostEjecucion = DateTime.fromJSDate(new Date())
        reporte.envioStEjecucion = '1'
        reporte.estadoVerificacionId = 1007
        reporte.save(); */
    }

    //return indicadores
    return { aprobado, faltantesActividades, faltantesAdicionales, faltaArchivoPatios, faltaArchivoEmpresas }

  }

}