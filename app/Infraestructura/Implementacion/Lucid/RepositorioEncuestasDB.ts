
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta';
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
//import NoAprobado from 'App/Exceptions/NoAprobado';
import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { DateTime } from 'luxon';
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { ServicioAcciones } from 'App/Dominio/Datos/Servicios/ServicioAcciones';
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail'
import { EmailnotificacionCorreo } from 'App/Dominio/Email/Emails/EmailNotificacionCorreo';
import Env from '@ioc:Adonis/Core/Env';
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis';
import Preguntas from 'App/Infraestructura/Datos/Entidad/Pregunta';
import { TblSedesOperativas } from 'App/Infraestructura/Datos/Entidad/SedesOperativas';
import { TblEmpresas } from 'App/Infraestructura/Datos/Entidad/Empresas';
export class RepositorioEncuestasDB implements RepositorioEncuesta {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioAcciones = new ServicioAcciones();
  private enviadorEmail: EnviadorEmail
  async obtenerReportadas(params: any): Promise<{ reportadas: Reportadas[], paginacion: Paginador }> {
    const { idUsuario, idEncuesta, pagina, limite, idVigilado, idRol, termino } = params;

    const anioVigencia = await TblAnioVigencias.query().where('anv_estado', true).orderBy('anv_id', 'desc').select('anv_anio').first()


    const reportadas: Reportadas[] = []
    const consulta = TblReporte.query().preload('usuario', sqlUsuario => {
      sqlUsuario.preload('clasificacionUsuario')

    });

    if (idEncuesta) {
      consulta.preload('encuesta', sqlE => {
        sqlE.where('id', idEncuesta);
      }).whereHas('encuesta', sqlE => {
        sqlE.where('id', idEncuesta);
      })
    } else {
      consulta.preload('encuesta', sqlE => {
      })
    }

    if (idRol === '003' || idRol === '007') {
      consulta.where('login_vigilado', idVigilado);
    }
    consulta.preload('estadoVerificado')
    consulta.preload('estadoVigilado')

    if (idEncuesta == 2 || idEncuesta == 3) {
     consulta.where('anio_vigencia', anioVigencia?.anio!)
    }
    if (termino) {
      consulta.andWhere(subquery => {
        subquery.where('nit_rues', 'ilike', `%${params.termino}%`)
        subquery.orWhere('razon_social_rues', 'ilike', `%${params.termino}%`)
        if (Number.isInteger(parseInt(params.termino))) {
          subquery.orWhere('id_reporte', `${params.termino}`)
        }
      })
    }


    let reportadasBD = await consulta.orderBy('fecha_enviost', 'desc').paginate(pagina, limite)

    if (reportadasBD.length <= 0 && (idRol === '003' || idRol === '007')) {


      const usuario = await TblUsuarios.query().where('identificacion', idUsuario).first()


      const reporte = new TblReporte()
      reporte.estableceReporteConId({
        idEncuesta: idEncuesta,
        envioSt: '0',
        loginVigilado: idVigilado,
        razonSocialRues: usuario?.nombre!,
        nitRues: idVigilado,
        usuarioCreacion: idUsuario,
        estadoVerificacionId: 1002,
        anioVigencia: anioVigencia?.anio ?? undefined
      })

      await reporte.save();
      reportadasBD = await consulta.orderBy('fecha_enviost', 'desc').paginate(pagina, limite)

      this.servicioEstado.Log(idUsuario, 1002, idEncuesta)

      this.servicioAuditoria.Auditar({
        accion: "Listar Informacion General SUBJETIVO",
        modulo: "Ingormación General SUBJETIVO",
        usuario: idUsuario,
        vigilado: idVigilado,
        descripcion: 'Entra por primera vez a la encuesta',
        encuestaId: idEncuesta,
        tipoLog: 3
      })
    }


    reportadasBD.map(reportada => {
      let estado = 'FORMULARIO EN BORRADOR';
      estado = reportada.estadoVerificado?.nombre ?? estado;
      estado = reportada.estadoVigilado?.nombre ?? estado;
      reportadas.push({
        idEncuestaDiligenciada: reportada.encuesta?.id,
        clasificacion: reportada.usuario.clasificacionUsuario[0]?.nombre ?? 'Sin Clasificar',
        idVigilado: reportada.loginVigilado,
        numeroReporte: reportada.id!,
        encuesta: reportada.encuesta?.nombre,
        descripcion: reportada.encuesta?.descripcion,
        fechaInicio: reportada.encuesta?.fechaInicio,
        fechaFinal: reportada.encuesta?.fechaFin,
        fechaEnvioST: reportada.fechaEnviost!,
        razonSocial: reportada.razonSocialRues,
        nit: reportada.nitRues,
        email: reportada.usuario.correo,
        usuarioCreacion: reportada.usuarioCreacion,
        asignado: reportada.asignado,
        ultimoUsuarioAsignado: reportada.ultimoUsuarioAsignado,
        estado,
        vigencia: reportada.anioVigencia ?? undefined
      });
    })




    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(reportadasBD)
    return { reportadas, paginacion }
  }

  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado, idReporte, idRol } = params;
    let tipoAccion = (idUsuario === idVigilado) ? 2 : 1;
    let clasificacionesArr: any = [];
    let estado = '';
    const reporte = await TblReporte.query().preload('estadoVerificado').preload('estadoVigilado').where('id_reporte', idReporte).first()
    estado = reporte?.estadoVerificado?.nombre ?? estado;
    estado = reporte?.estadoVigilado?.nombre ?? estado;
    let clasificacion = '';

    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion')
      sql.whereHas('clasificacion', sqlClass => {
        sqlClass.where('estado', 1)
      })
      sql.preload('tiposPregunta')
      sql.preload('respuesta', sqlResp => {
        sqlResp.where('id_reporte', idReporte)
      })
      sql.preload('subTiposdatos', sqlSubTipoDato => {
        sqlSubTipoDato.preload('tipoDato')
      })
      sql.where('estado', 1)
      sql.orderBy('orden', 'asc');
    }).where({ 'id_encuesta': idEncuesta }).first();
    const encuestaSql = await consulta


    //BUscar la clasificacion del usuario
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion')
      sqlClasC.has('clasificacion')
    }).preload('sedesOperativas').preload('patios').preload('empresas').where('identificacion', idVigilado).first()
 
    const nombreClasificaion = usuario?.clasificacionUsuario[0]?.nombre;
    const descripcionClasificacion = usuario?.clasificacionUsuario[0]?.descripcion;
    const pasos = usuario?.clasificacionUsuario[0]?.clasificacion

    const fechaActual = DateTime.now();
    const rolDefecto = (fechaActual < encuestaSql?.fechaFin!) ? idRol : '000'
    const { encuestaEditable } = await this.servicioAcciones.obtenerAccion(reporte?.estadoVerificacionId ?? 0, rolDefecto);

    const claficiacionesSql = await TbClasificacion.query().orderBy('id_clasificacion', 'asc');
    let consecutivo: number = 1;
    claficiacionesSql.forEach(clasificacionSql => {

      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;
      //validar si el paso es obligatorio      
      // const obligatorio = pasos?.find(paso => paso.id === clasificacionSql.id) ? true : false;
      encuestaSql?.pregunta.forEach(pregunta => {

        if (clasificacionSql.id === pregunta.clasificacion.id) {
          preguntasArr.push({
            idPregunta: pregunta.id,
            numeroPregunta: consecutivo,
            pregunta: pregunta.pregunta,
            obligatoria: pregunta.obligatoria, //obligatorio,// 
            respuesta: pregunta.respuesta[0]?.valor ?? '',
            documento: pregunta.respuesta[0]?.documento ?? '',
            nombreOriginal: pregunta.respuesta[0]?.nombredocOriginal ?? '',
            ruta: pregunta.respuesta[0]?.ruta ?? '',
            adjuntable: pregunta.adjuntable,
            adjuntableObligatorio: pregunta.adjuntableObligatorio,// pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            //tamanio: pregunta.tamanio,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validacionesPregunta: pregunta.tiposPregunta.validaciones,
            tieneObservacion: pregunta.tieneObservacion,
            maxObservacion: pregunta.maxObservacion,
            observacion: pregunta.respuesta[0]?.observacion ?? '',
            /*   cumple: pregunta.respuesta[0]?.cumple ?? '',
              observacionCumple: pregunta.respuesta[0]?.observacionCumple ?? '',
              corresponde: pregunta.respuesta[0]?.corresponde ?? '',
              observacionCorresponde: pregunta.respuesta[0]?.observacionCorresponde ?? '', */
            tipo: pregunta.tipo,
            habilitaObservacion: pregunta.tiposPregunta.datoClave,
            tipoEvidencia: pregunta.subTiposdatos.tipoDato.nombre,
            validacionesEvidencia: {
              tipoDato: pregunta.tipoEvidencia,
              cantDecimal: pregunta.subTiposdatos.decimales ?? 0,
              tamanio: pregunta.tamanio,
              extension: pregunta.subTiposdatos.extension ?? ''
            },
            padre: pregunta.padre,
            respuestaPadre: pregunta.respuestaPadre,
          });
          consecutivo++;
        }

      });
      if (preguntasArr.length >= 1) {
        clasificacionesArr.push(
          {
            clasificacion,
            preguntas: preguntasArr
          }

        );
      }


    });

    const encuesta = {
      tipoAccion,
      estadoActual: estado,
      nombreEncuesta: encuestaSql?.nombre,
      encuestaEditable,
      idVigilado,
      clasificaion: nombreClasificaion,
      descripcionClasificacion,
      // observacion: encuestaSql?.observacion,
      patios: usuario?.patios,
      sedes: usuario?.sedesOperativas,
      empresas: usuario?.empresas,
      clasificaciones: clasificacionesArr,

    }

    return encuesta
  }

  async enviarSt(params: any): Promise<any> {
    const { idReporte, idVigilado, idUsuario, confirmar = false } = params
    const usuario = await TblUsuarios.query().where('identificacion', idUsuario).first()

    let aprobado = true;
    let tieneEmpresa = true;
    let sedes = true;
    const faltantes = new Array();
    //  const pasos = usuario?.clasificacionUsuario[0]?.clasificacion
    const respuestas = await TblRespuestas.query().where('id_reporte', idReporte).orderBy('id_pregunta', 'asc')
    const reportes = await TblReporte.find(idReporte)

    const preguntas = await Preguntas.query().preload('tiposPregunta').where('estado', 1);
    // pasos?.forEach(paso => {
    preguntas.forEach(pregunta => {
      let repuestaExiste = true
      let archivoExiste = true
      const respuesta = respuestas.find(r => r.idPregunta === pregunta.id)
      const datoClave = pregunta.tiposPregunta.datoClave;
      if (pregunta.padre) {

        //  const preguntaPadre = preguntas.find(p => p.id == pregunta.padre);
        const respuestaPadre = respuestas.find(r => r.idPregunta === pregunta.padre)

        if (pregunta.obligatoria) {
          const arrRespuesta = Object.values(pregunta.respuestaPadre!);
          if (arrRespuesta.length !== 0) {
            arrRespuesta.forEach(dato => {
              if (respuestaPadre?.valor === dato) {
                repuestaExiste = this.validarRespuesta(respuesta, pregunta, datoClave);

              }

            });
          }

        }


      } else {
        repuestaExiste = this.validarRespuesta(respuesta, pregunta, datoClave);
      }


      if (!repuestaExiste) {
        aprobado = false
        faltantes.push({
          preguntaId: pregunta.id,
          // archivoObligatorio: pregunta.adjuntableObligatorio
        })

      }


    });



    // });

  
    if (confirmar) aprobado = true;

     //verificar empresas
  const empresas = await TblEmpresas.query().where('emp_usuario_id', idUsuario).first();  
  
  if(!empresas){
    aprobado = false;
    tieneEmpresa = false;
  }

    //Verificar sedes
    const sedesOperativas = await TblSedesOperativas.query().where('seo_usuario_id', idUsuario).first();

    if (!sedesOperativas) {
      aprobado = false;
      sedes = false;
    }


    if (aprobado) {
      this.servicioEstado.Log(idUsuario, 1004, reportes?.idEncuesta, undefined, confirmar)
      const reporte = await TblReporte.findOrFail(idReporte)
      const estado = (reporte.estadoVerificacionId === 7 || reporte.estadoVerificacionId === 1005) ? 4 : 1004
      reporte.fechaEnviost = DateTime.fromJSDate(new Date())
      reporte.envioSt = '1'
      reporte.estadoVerificacionId = estado
      reporte.save();


      this.servicioAuditoria.Auditar({
        accion: "Enviar a St info general SUBJETIVO",
        modulo: "Información General SUBJETIVO",
        usuario: idUsuario,
        jsonNuevo: JSON.stringify(respuestas),
        vigilado: idVigilado,
        descripcion: 'Se envia a ST',
        encuestaId: reportes?.idEncuesta,
        tipoLog: 5

      })



      try {
        this.enviadorEmail = new EnviadorEmailAdonis()
        await this.enviadorEmail.enviarTemplate({
          asunto: 'Envío a ST.',
          destinatarios: usuario?.correo!,
          de: Env.get('SMTP_USERNAME')
        }, new EmailnotificacionCorreo({
          nombre: usuario?.nombre!,
          mensaje: 'De la manera más cordial nos permitimos informarle que la información Plan Estratégico de Seguridad Vial fue enviado de manera correcta a la Superintendencia de Transporte.',
          logo: Env.get('LOGO'),
          nit: usuario?.identificacion!
        }))
      } catch (error) {
        console.log(error);
      }

    }

    return { aprobado, faltantes, sedes,tieneEmpresa }

  }

  validarDocumento = (r: Respuesta, p: Pregunta): boolean => {
    if (!r.documento || r.documento.length <= 0) {
      //throw new NoAprobado('Faltan archivos adjuntar')
      return false
    }
    return true
  }

  validarRespuesta = (respuesta: any, pregunta: any, datoClave: any): boolean => {

    let validacion = true
    if (pregunta.obligatoria) {

      if (!respuesta) {
        validacion = false
      }
      if (respuesta && respuesta.valor === '') {
        validacion = false
      }
      if ((respuesta && respuesta.valor !== '') && (pregunta.tieneObservacion && pregunta.tieneObservacion === true)) {
        //const datoClave = pregunta.tiposPregunta.datoClave!;

        const arr = Object.values(datoClave);
        if (arr.length !== 0) {
          arr.forEach(dato => {

            if (respuesta.valor === dato && (!respuesta.observacion || respuesta.observacion === '')) {


              validacion = false
            }

          });
        }
      }
    }
    return validacion
  }

}
