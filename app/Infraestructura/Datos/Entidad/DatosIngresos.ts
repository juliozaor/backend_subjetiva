import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoIngreso } from 'App/Dominio/Datos/Entidades/DatoIngreso';
import { DateTime } from 'luxon';

export default class TblDatosIngresos extends BaseModel {
  public static table = 'tbl_datos_ingresos';
  @column({ isPrimary: true, columnName: 'din_id' })  public id?: number
  @column({ columnName: 'din_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'din_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'din_valor' }) public valor: string;
  @column({ columnName: 'din_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'din_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'din_ruta' }) public ruta: string;
  @column({ columnName: 'din_anio_activo' }) public vigencia: number;      
  @column({ columnName: 'din_anio' }) public anio: number;      

  @column.dateTime({ autoCreate: true, columnName: 'din_creacion' })  public creacion: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'din_actualizacion' })  public actualizacion: DateTime

  public establecerDatoDb(dato: DatoIngreso) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.vigencia = dato.vigencia
    this.anio = dato.anio
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
  }

  public estableceDatoConId(dato: DatoIngreso) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.vigencia = dato.vigencia
    this.anio = dato.anio
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
  }

  public obtenerDato(): DatoIngreso {
    const dato = new DatoIngreso()
    dato.id = this.id
    dato.preguntaId = this.preguntaId
    dato.vigiladoId = this.vigiladoId
    dato.valor = this.valor
    dato.vigencia = this.vigencia
    dato.anio = this.anio
    dato.nombreAlmacenado = this.nombreAlmacenado
    dato.nombreOriginalArchivo = this.nombreOriginalArchivo
    dato.ruta = this.ruta
    return dato
  }



}
