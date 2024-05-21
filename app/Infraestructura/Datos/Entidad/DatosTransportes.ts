import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoTransporte } from 'App/Dominio/Datos/Entidades/DatoTransporte';
import { DateTime } from 'luxon';

export default class TblDatosTransporte extends BaseModel {
  public static table = 'tbl_datos_transportes';
  @column({ isPrimary: true, columnName: 'fdt_id' })
  public id?: number

  @column({ columnName: 'fdt_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'fdt_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'fdt_valor' }) public valor: string;
  @column({ columnName: 'fdt_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'fdt_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'fdt_ruta' }) public ruta: string;
  @column({ columnName: 'fdt_anio_activo' }) public vigencia: number;      


  @column.dateTime({ autoCreate: true, columnName: 'fdt_creacion' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fdt_actualizacion' })
  public actualizacion: DateTime


  public establecerDatoDb(dato: DatoTransporte) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public estableceDatoConId(dato: DatoTransporte) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): DatoTransporte {
    const dato = new DatoTransporte()
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
