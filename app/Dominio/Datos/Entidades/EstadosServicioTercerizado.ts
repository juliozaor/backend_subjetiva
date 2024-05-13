export class EstadosServicioTercerizado {
  id?: number;
  gruas: boolean;
  patios: boolean;
  tramitesTransito: boolean;
  deteccionInfracciones: boolean;
  procesosContravencionales: boolean;
  procesoCobroCoactivo: boolean;
  procesoCobroPersuasivo: boolean;
  recaudoMultas: boolean;
  otros: boolean;    
  vigiladoId: string;
  vigencia: number; 
}
