import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class TblMaestraGrupoNiifReportes extends BaseModel {
  public static table = 'tbl_maestra_grupo_niif_reportes';

  @column({ columnName: 'gnr_id', isPrimary: true })
  public id: number;

  @column({ columnName: 'gnr_nombre' })
  public nombre: string;

  @column({ columnName: 'gnr_estado' })
  public estado: boolean;
}
