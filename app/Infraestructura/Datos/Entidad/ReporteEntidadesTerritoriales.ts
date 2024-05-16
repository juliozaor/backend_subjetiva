
import { DateTime } from 'luxon';
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import TblDatosReportes from './DatosReportes';
export default class TblReporteEntidadesTerritoriales extends BaseModel {
  public static table = 'tbl_reporte_entidades_territoriales';
  
  @column({ isPrimary: true, columnName: 'ret_id' })  public id: number
  @column({ columnName: 'ret_nombre' }) public nombre: string;

  @hasMany (() => TblDatosReportes, {
    localKey: 'id',
    foreignKey: 'preguntaId',
  })
  public datos: HasMany<typeof TblDatosReportes>


}
