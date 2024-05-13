
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosTransporte from './DatosTransportes';
export default class TblEmpresasTransportes extends BaseModel {
  public static table = 'tbl_empresas_transportes';
  @column({ isPrimary: true, columnName: 'tet_id' })
  public id: number

  @column({ columnName: 'tet_nombre' }) public nombre: string;

  @hasMany (() => TblDatosTransporte, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosTransporte>

}
