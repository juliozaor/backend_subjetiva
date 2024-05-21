import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoIdentificacion } from 'App/Dominio/Datos/Entidades/DatoIdentificacion';
import { DateTime } from 'luxon';

export default class TblDatosIdentificaciones extends BaseModel {
  public static table = 'tbl_datos_identificaciones';
  @column({ isPrimary: true, columnName: 'did_id' })  public id?: number
  @column({ columnName: 'did_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'did_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'did_valor' }) public valor: string;
  @column({ columnName: 'did_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'did_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'did_ruta' }) public ruta: string;
  @column({ columnName: 'did_anio_activo' }) public vigencia: number;      

  @column.dateTime({ autoCreate: true, columnName: 'did_creacion' })  public creacion: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'did_actualizacion' })  public actualizacion: DateTime

  public establecerDatoDb(dato: DatoIdentificacion) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public estableceDatoConId(dato: DatoIdentificacion) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): DatoIdentificacion {
    const dato = new DatoIdentificacion()
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
