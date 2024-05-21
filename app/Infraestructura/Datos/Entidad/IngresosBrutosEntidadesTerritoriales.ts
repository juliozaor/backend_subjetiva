
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosIngresos from './DatosIngresos';
export default class TblIngresosBrutosEntidadesTerritoriales extends BaseModel {
  public static table = 'tbl_ingresos_brutos_entidades_territoriales';
  
  @column({ isPrimary: true, columnName: 'ibe_id' })  public id: number
  @column({ columnName: 'ibe_nombre' }) public nombre: string;

  @hasMany (() => TblDatosIngresos, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosIngresos>


}
