import { BaseModel, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import TblEstadoVigilado from './EstadoVigilado';

export class TblReporte extends BaseModel {
  public static table = 'tbl_reportes';

  @column({ isPrimary: true, columnName: 'tbr_id' })
  public id?: number

  @column({ columnName: 'tbr_vigilado_id' }) public vigiladoId: string;
  @column({ columnName: 'tbr_estado_id' }) public estadoId: number;
  @column({ columnName: 'tbr_formulario_id' }) public formularioId: number;
  @column({ columnName: 'tbr_anio_activo' }) public vigencia: number;

  @column.dateTime({ autoCreate: true, columnName: 'tbr_creacion' })
  public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'tbr_actualizacion' })
  public actualizacion: DateTime


  @hasOne(() => TblEstadoVigilado, {
    localKey: 'estadoId',
    foreignKey: 'id',
  })
  public estados: HasOne<typeof TblEstadoVigilado>;

}



