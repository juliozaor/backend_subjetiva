import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DatoPortuaria } from 'App/Dominio/Datos/Entidades/DatoPortuaria';
import { DateTime } from 'luxon';

export default class TblDatosPortuarias extends BaseModel {
  public static table = 'tbl_datos_portuarias';
  @column({ isPrimary: true, columnName: 'fdp_id' })
  public id?: number

  @column({ columnName: 'fdp_pregunta_id' }) public preguntaId: number;
  @column({ columnName: 'fdp_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'fdp_valor' }) public valor: string;
  @column({ columnName: 'fdp_documento' }) public nombreAlmacenado: string;
  @column({ columnName: 'fdp_nombre_original' }) public nombreOriginalArchivo: string;
  @column({ columnName: 'fdp_ruta' }) public ruta: string;
  @column({ columnName: 'fdp_anio_activo' }) public vigencia: number;      

  @column.dateTime({ autoCreate: true, columnName: 'fdp_creacion' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fdp_actualizacion' })
  public actualizacion: DateTime


  public establecerDatoDb(dato: DatoPortuaria) {
    this.id = dato.id
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public estableceDatoConId(dato: DatoPortuaria) {
    this.preguntaId = dato.preguntaId
    this.vigiladoId = dato.vigiladoId
    this.valor = dato.valor
    this.nombreAlmacenado = dato.nombreAlmacenado
    this.nombreOriginalArchivo = dato.nombreOriginalArchivo
    this.ruta = dato.ruta
    this.vigencia = dato.vigencia
  }

  public obtenerDato(): DatoPortuaria {
    const dato = new DatoPortuaria()
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
