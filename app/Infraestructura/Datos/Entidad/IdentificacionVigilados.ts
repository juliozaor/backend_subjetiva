
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosIdentificaciones from './DatosIdentificaciones';
export default class TblIdentificacionVigilados extends BaseModel {
  public static table = 'tbl_identificacion_vigilados';
  
  @column({ isPrimary: true, columnName: 'idv_id' })  public id: number
  @column({ columnName: 'idv_nombre' }) public nombre: string;

  @hasMany (() => TblDatosIdentificaciones, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosIdentificaciones>


}
