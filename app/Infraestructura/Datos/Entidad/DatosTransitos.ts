import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoTransito } from 'App/Dominio/Datos/Entidades/DatoTransito';
import { DateTime } from 'luxon';

export default class TblDatosTransitos extends BaseModel {
  public static table = 'tbl_datos_transitos';
  @column({ isPrimary: true, columnName: 'aud_id' })
  public id?: number

  @column({ columnName: 'dtt_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'dtt_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'dtt_valor' }) public valor: string;
  @column({ columnName: 'dtt_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'dtt_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'dtt_ruta' }) public ruta: string;
  @column({ columnName: 'dtt_anio_activo' }) public vigencia: number;      

  @column.dateTime({ autoCreate: true, columnName: 'dtt_creacion' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'dtt_actualizacion' })
  public actualizacion: DateTime


  public establecerDatoDb(dato: DatoTransito) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public estableceDatoConId(dato: DatoTransito) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): DatoTransito {
    const dato = new DatoTransito()
    dato.id = this.id
    dato.preguntaId = this.preguntaId
    dato.vigiladoId = this.vigiladoId
    dato.valor = this.valor
    dato.nombreAlmacenado = this.nombreAlmacenado
    dato.nombreOriginalArchivo = this.nombreOriginalArchivo
    dato.ruta = this.ruta
    dato.vigencia = this.vigencia
    return dato
  }



}
