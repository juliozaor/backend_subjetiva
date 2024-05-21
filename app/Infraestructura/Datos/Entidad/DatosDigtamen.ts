import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoDig } from 'App/Dominio/Datos/Entidades/DatoDig';
import { DateTime } from 'luxon';

export default class TblDatosDigtamen extends BaseModel {
  public static table = 'tbl_datos_digtamen';
  @column({ isPrimary: true, columnName: 'ddg_id' })  public id?: number
  @column({ columnName: 'ddg_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'ddg_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'ddg_valor' }) public valor: string;
  @column({ columnName: 'ddg_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'ddg_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'ddg_ruta' }) public ruta: string;
  @column({ columnName: 'ddg_anio' }) public anio: number;      
  @column({ columnName: 'ddg_anio_activo' }) public vigencia: number;      

  @column.dateTime({ autoCreate: true, columnName: 'ddg_creacion' })  public creacion: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'ddg_actualizacion' })  public actualizacion: DateTime

  public establecerDatoDb(dato: DatoDig) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
    this.anio = dato.anio
  }

  public estableceDatoConId(dato: DatoDig) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.anio = dato.anio
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): DatoDig {
    const dato = new DatoDig()
    dato.id = this.id
    dato.preguntaId = this.preguntaId
    dato.vigiladoId = this.vigiladoId
    dato.valor = this.valor
    dato.nombreAlmacenado = this.nombreAlmacenado
    dato.nombreOriginalArchivo = this.nombreOriginalArchivo
    dato.ruta = this.ruta
    dato.vigencia = this.vigencia
    dato.anio = this.anio
    return dato
  }



}
