
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosPortuarias from './DatosPortuarias';
export default class TblSociedadesPortuarias extends BaseModel {
  public static table = 'tbl_sociedades_portuarias';
  
  @column({ isPrimary: true, columnName: 'tsp_id' })  public id: number
  @column({ columnName: 'tsp_nombre' }) public nombre: string;

  @hasMany (() => TblDatosPortuarias, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosPortuarias>


}
