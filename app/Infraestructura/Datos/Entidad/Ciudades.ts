import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { TblDepartamentos } from './Departamentos';
export class TblCiudades extends BaseModel {

  @column({ columnName: 'id' }) public id?: number;
  @column({ columnName: 'name' }) public name: string;
  @column({ columnName: 'description' }) public description: string;
  @column({ columnName: 'departmentId' }) public departmentId: number;
  @column({ columnName: 'status' }) public status: boolean;


  @belongsTo(() => TblDepartamentos, {
    localKey: 'id',
    foreignKey: 'departmentId',
  })
  public departamento: BelongsTo<typeof TblDepartamentos>

}
