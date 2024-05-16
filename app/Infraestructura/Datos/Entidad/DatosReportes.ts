import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoReporte } from 'App/Dominio/Datos/Entidades/DatoReporte';
import { DateTime } from 'luxon';

export default class TblDatosReportes extends BaseModel {
  public static table = 'tbl_datos_reportes';
  @column({ isPrimary: true, columnName: 'dre_id' })  public id?: number
  @column({ columnName: 'dre_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'dre_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'dre_valor' }) public valor: string;
  @column({ columnName: 'dre_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'dre_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'dre_ruta' }) public ruta: string;
  @column({ columnName: 'dre_anio_activo' }) public vigencia: number;      

  @column.dateTime({ autoCreate: true, columnName: 'dre_creacion' })  public creacion: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'dre_actualizacion' })  public actualizacion: DateTime

  public establecerDatoDb(dato: DatoReporte) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public estableceDatoConId(dato: DatoReporte) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): DatoReporte {
    const dato = new DatoReporte()
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
