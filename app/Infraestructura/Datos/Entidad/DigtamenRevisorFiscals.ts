
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosDigtamen from './DatosDigtamen';
export default class TblDigtamenRevisorFiscals extends BaseModel {
  public static table = 'tbl_digtamen_revisor_fiscals';
  
  @column({ isPrimary: true, columnName: 'drf_id' })  public id: number
  @column({ columnName: 'drf_nombre' }) public nombre: string;

  @hasMany (() => TblDatosDigtamen, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosDigtamen>


}
