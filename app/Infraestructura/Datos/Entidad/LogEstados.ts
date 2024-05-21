import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblLogEstados extends BaseModel {
  public static table = 'tbl_log_estados';
  
  @column({ isPrimary: true, columnName: 'tle_id' })
  public id?: number

  @column({ columnName: 'tle_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'tle_estado_id' }) public estadoId: number;
  @column({ columnName: 'tle_formulario_id' }) public formularioId: number;
  @column({ columnName: 'tle_anio_activo' }) public vigencia: number;

  @column.dateTime({ autoCreate: true, columnName: 'tle_creacion' })
  public creacion: DateTime


 /*  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'dtt_actualizacion' })
  public actualizacion: DateTime
 */

 
}


