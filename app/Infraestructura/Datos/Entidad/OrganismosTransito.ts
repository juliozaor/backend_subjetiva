
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosTransitos from './DatosTransitos';
export default class TblOrganismosTransitos extends BaseModel {
  public static table = 'tbl_organismos_transitos';
  @column({ isPrimary: true, columnName: 'tot_id' })
  public id: number

  @column({ columnName: 'tot_nombre' }) public nombre: string;

  @hasMany (() => TblDatosTransitos, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosTransitos>

}
