import { DateTime } from 'luxon'
export class DetalleAdicional {
  id?: number; 
  datoAdicionalId: number; 
  estado?: boolean; 
  anioActivoId: number; 
  reporteId?: number; 
  fechaActualizacion: DateTime;
  documento?: string;
  ruta?: string;
  valor?:string;
  nombredocOriginal?: string;
  observacion?: string;
}
