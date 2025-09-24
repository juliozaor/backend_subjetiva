import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoTransporte } from 'App/Dominio/Datos/Entidades/DatoTransporte';
import { EstadosServicioTercerizado } from 'App/Dominio/Datos/Entidades/EstadosServicioTercerizado';
import { DateTime } from 'luxon';

export default class TblEstadosServiciosTercerizados extends BaseModel {
  public static table = 'tbl_estados_servicios_tercerizados';
  @column({ isPrimary: true, columnName: 'tst_id' })
  public id?: number

  @column({ columnName: 'tst_razon_social' }) public razonSocial: string;
  @column({ columnName: 'tst_tipo_nit' }) public tipoNit: number | null;
  @column({ columnName: 'tst_nit' }) public nit: number | null;
  @column({ columnName: 'tst_digito_verificacion' }) public digitoVerificacion: number | null;
  @column({ columnName: 'tst_tipo_oganizacion' }) public tipoOrganizacion: number | null;
  @column({ columnName: 'tst_apoya_terceros' }) public apoyaTerceros: number | null;
  @column({ columnName: 'tst_proceso_adjudicacion' }) public procesoAdjudicacion: number | null;

  @column({ columnName: 'tst_gruas' }) public gruas: boolean;
  @column({ columnName: 'tst_patios' }) public patios: boolean;
  @column({ columnName: 'tst_tramites_transito' }) public tramitesTransito: boolean;
  @column({ columnName: 'tst_deteccion_infracciones' }) public deteccionInfracciones: boolean;
  @column({ columnName: 'tst_procesos_contravencionales' }) public procesosContravencionales: boolean;
  @column({ columnName: 'tst_procesos_cobro_coactivo' }) public procesoCobroCoactivo: boolean;
  @column({ columnName: 'tst_procesos_cobro_persuasivo' }) public procesoCobroPersuasivo: boolean;
  @column({ columnName: 'tst_recaudo_multas' }) public recaudoMultas: boolean;
  @column({ columnName: 'tst_otros' }) public otros: boolean;

  @column({ columnName: 'tst_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'tst_anio_activo' }) public vigencia: number;

  @column.dateTime({ autoCreate: true, columnName: 'tst_creacion' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'tst_actualizacion' })
  public actualizacion: DateTime




  public establecerDatoDb(dato: EstadosServicioTercerizado) {
    this.id = dato.id
    this.razonSocial = dato.razonSocial
    this.tipoNit = dato.tipoNit
    this.nit = dato.nit
    this.digitoVerificacion = dato.digitoVerificacion
    this.tipoOrganizacion = dato.tipoOrganizacion
    this.apoyaTerceros = dato.apoyaTerceros
    this.procesoAdjudicacion = dato.procesoAdjudicacion
    this.gruas = dato.gruas
    this.patios = dato.patios
    this.tramitesTransito = dato.tramitesTransito
    this.deteccionInfracciones = dato.deteccionInfracciones
    this.procesosContravencionales = dato.procesosContravencionales
    this.procesoCobroCoactivo = dato.procesoCobroCoactivo
    this.procesoCobroPersuasivo = dato.procesoCobroPersuasivo
    this.recaudoMultas = dato.recaudoMultas
    this.otros = dato.otros
    this.vigencia = dato.vigencia
  }

  public estableceDatoConId(dato: EstadosServicioTercerizado) {
    this.razonSocial = dato.razonSocial
    this.tipoNit = dato.tipoNit
    this.nit = dato.nit
    this.digitoVerificacion = dato.digitoVerificacion
    this.tipoOrganizacion = dato.tipoOrganizacion
    this.apoyaTerceros = dato.apoyaTerceros
    this.procesoAdjudicacion = dato.procesoAdjudicacion
    this.gruas = dato.gruas
    this.patios = dato.patios
    this.tramitesTransito = dato.tramitesTransito
    this.deteccionInfracciones = dato.deteccionInfracciones
    this.procesosContravencionales = dato.procesosContravencionales
    this.procesoCobroCoactivo = dato.procesoCobroCoactivo
    this.procesoCobroPersuasivo = dato.procesoCobroPersuasivo
    this.recaudoMultas = dato.recaudoMultas
    this.otros = dato.otros
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): EstadosServicioTercerizado {
    const dato = new EstadosServicioTercerizado()
    dato.id = this.id
    dato.razonSocial = this.razonSocial
    dato.tipoNit = this.tipoNit
    dato.nit = this.nit
    dato.digitoVerificacion = this.digitoVerificacion
    dato.tipoOrganizacion = this.tipoOrganizacion
    dato.apoyaTerceros = this.apoyaTerceros
    dato.procesoAdjudicacion = this.procesoAdjudicacion
    dato.gruas = this.gruas
    dato.patios = this.patios
    dato.tramitesTransito = this.tramitesTransito
    dato.deteccionInfracciones = this.deteccionInfracciones
    dato.procesosContravencionales = this.procesosContravencionales
    dato.procesoCobroCoactivo = this.procesoCobroCoactivo
    dato.procesoCobroPersuasivo = this.procesoCobroPersuasivo
    dato.recaudoMultas = this.recaudoMultas
    dato.otros = this.otros
    dato.vigencia = this.vigencia
    return dato
  }



}
